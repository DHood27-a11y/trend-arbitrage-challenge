//references used: https://expressjs.com/en/guide/routing.html

import express from "express";
import Trend from "../models/Trend.js";

const router = express.Router(); //this just represents the router for the app

//path is being defined and when browser hits '/api/trends' the code/function will run
router.get("/", async (req, res) => {
  try {
    const allTrends = await Trend.find(); //using .find method to find all current items stored in MongoDB

    res.json(allTrends); //this will send the trends back to browser in JSON format
  } catch (error) {
    res.status(500).json({ message: "Could not get trends" }); //if database is down will receive 500 error as well as message
  }
});

export default router;
