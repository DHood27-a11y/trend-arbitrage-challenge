import mongoose from "mongoose";
//Because this is new material I researched and applied my syntax following the Object Document Mapper or ODM pattern from the official documentation on the Mongoose website (https://mongoosejs.com/docs/guide.html,https://mongoosejs.com/docs/validation.html )

const { Schema } = mongoose; //According to the website everything in Mongoose starts with a Schema, and that schema maps to a MongoDB collection and defines the shape of the docs within that collection.

const trendSchema = new Schema({
  //name of the post or article found
  title: {
    type: String,
    required: [true, "Trend title required"],
    trim: true, //removes whitespace
  },
  score: {
    type: Number, //Voting system: This will track the "Points" via HN and the "Score" via Lobsters and Tildes
    default: 0,
  },
  commentsCount: {
    type: Number, //This will track the amount of comments/social interactions
    default: 0,
  },
  rank: {
    type: Number, //this will track where the trend falls on the page
    default: 0,
  },
  source: {
    type: String,
    required: true,
    enum: {
      //this will restrict the results to only these 3 platforms
      values: ["Reddit", "Google", "Hacker News"],
      message: "{VALUE} is not one of the 3 associated platforms",
    },
  },
  url: {
    type: String,
    required: [true, "Url required for verification"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Trend = mongoose.model("Trend", trendSchema); //to use our schema definition we need to covert our trend into a model we can work with so we pass it into mongoose.model

export default Trend;
