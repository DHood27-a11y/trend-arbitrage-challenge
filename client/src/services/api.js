import axios from "axios";

const API_URL = "https://trend-arbitrage-challenge-qi50.onrender.com"; //this is what the front end uses to request data from the backend

//this function is what the app will use to fetch and show the latest trends
export const fetchTrends = async () => {
  try {
    const response = await axios.get(API_URL); //sends GET request to server address and waits for a reply

    return response.data; //if the server is successful, we get back a list of trends
  } catch (error) {
    console.error("Error fetching data from backend", error); //if server is not successful, we get error handling message
    return [];
  }
};
