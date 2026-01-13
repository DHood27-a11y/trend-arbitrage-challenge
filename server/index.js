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

    const allTrends = [];

    const reddit = await getRedditTrends();
    allTrends.push(...reddit);
    console.log(`Reddit trends found: ${reddit.length}`);

    const hacker = await getHackerTrends();
    allTrends.push(...hacker);
    console.log(`Hacker trends found: ${hacker.length}`);

    const google = await getGoogleTrends();
    allTrends.push(...google);
    console.log(`Google trends found: ${google.length}`);

    const updatedTrends = allTrends.map((item) => {
      const calculatedScore = calculateTrendScore(item);

      return {
        ...item,
        score: calculatedScore,
      };
    });
    updatedTrends.sort((a, b) => b.score - a.score);

    await Trend.deleteMany({});

    const validData = updatedTrends.filter((item) => item.title && item.url);
    await Trend.insertMany(validData);

    console.log(`Total articles saved to MongoDB: ${validData.length}`);
  } catch (error) {
    console.error("Failed to fetch articles", error);
  }
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");

    fetchAndSaveData();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/api/trends`);
    });
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));
