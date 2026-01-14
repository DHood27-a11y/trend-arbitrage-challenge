//REFERENCES FOR THIS SET UP: https://mongoosejs.com/docs/5.x/docs/api/connection.html, https://mongoosejs.com/docs/guide.html , https://mongoosejs.com/docs/api/model.html, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat

//I also used googled regarding the plain english translation of the following unknown terms: mongoose, dotenv, cors

//  ---Imports---

import express from "express"; //this is what will run web page
import mongoose from "mongoose"; //this is what will talk to the database
import "dotenv/config"; //this will load the environment variables from the .env file
import cors from "cors"; //this is a security measure that controls how websites request data from other domains
import Trend from "./models/Trend.js"; //according to the models documentation importing the trend model registers the schema with Mongoose which can then be used to create and read documents from underlying MongoDB database

import trendRoutes from "./routes/trends.js";

import { calculateTrendScore } from "./services/scoring.js";

//We are importing our 3 sources so the data from them can be loaded properly
import { getHackerTrends } from "./services/sources/hackernews.js";
import { getRedditTrends } from "./services/sources/reddit.js";
import { getGoogleTrends } from "./services/sources/Google.js";

// --Config--

const app = express();
const port = process.env.PORT || 3000; //this is a commonly used web address devs use for testing
const DB_URL = process.env.MONGO_URL;

// --App.use--

app.use(cors()); //allows requests from diff ports

app.use(express.json()); //allows the server to read JSON data sent in request

// --LINKING ROUTES--
app.use("/api/trends", trendRoutes);

// -- Function that gathers everything and saves it

const fetchAndSaveData = async () => {
  try {
    console.log("Collecting data.. "); //this will show when process is starting

    const allTrends = []; //will store all trends found in an empty array

    const reddit = await getRedditTrends(); //reddit site will be visited and then using await we will wait for it to pull the top posts
    allTrends.push(...reddit); //once posts are fond they will be added or "pushed to our new array"
    console.log(`Reddit trends found: ${reddit.length}`);

    const hacker = await getHackerTrends();

    allTrends.push(...hacker);
    console.log(`Hacker trends found: ${hacker.length}`);

    const google = await getGoogleTrends();
    allTrends.push(...google);
    console.log(`Google trends found: ${google.length}`);

    const updatedTrends = allTrends.map((item) => {
      const calculatedScore = calculateTrendScore(item); //once array is built we will map through each item one by one and run each item though scoring algorithm

      return {
        //here im just attaching the new score to the item so it can be used later on down the line
        ...item,
        score: calculatedScore,
      };
    });
    updatedTrends.sort((a, b) => b.score - a.score); //here the trends are being sorted through and re-sorted so that the highest scores are at the top

    await Trend.deleteMany({}); //the deleteMany method wull clear out old data in MongoDB so there are no duplicates

    const validData = updatedTrends.filter((item) => item.title && item.url); //this will check to make sure every item in the array has a title and a link before saving

    await Trend.insertMany(validData); //here the most up to date version of the array that has been properly sorted and filtered will be saved into MongoDB

    console.log(`Total articles saved to MongoDB: ${validData.length}`);
  } catch (error) {
    console.error("Failed to fetch articles", error); //this will make sure to give message if anything comes back wonky
  }
};

mongoose
  .connect(process.env.MONGO_URL) //this allows us to connect to the database string using the secret key given in MongoDB
  .then(() => {
    console.log("Connected to MongoDB successfully");

    fetchAndSaveData(); //once the database is up and running it will grab the latest set of data

    app.listen(port, () => {
      //the server has to be listening amd turned on so the frontend can request the data
      console.log(`Server running on http://localhost:${port}/api/trends`);
    });
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error)); //more error handling
