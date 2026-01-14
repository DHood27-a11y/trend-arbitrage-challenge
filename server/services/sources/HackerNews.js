//reference used for this site: https://github.com/HackerNews/API
//reference for slice method: https://www.w3schools.com/jsref/jsref_slice_array.asp
//main endpoints used: /topstories.json (returns a list of the 500 of the most popular story ID's), /item/{id.json} (returns the specific details: title, url, and score for a single ID)

import axios from "axios";

export const getHackerTrends = async () => {
  try {
    const topIds = await axios.get(
      //this url will get huge list of numbers (IDs) for the top stories
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const top5 = topIds.data.slice(0, 5); //I only wanted to 5 at a time so we "sliced" info down to reflect those numbers

    //for each of the ids I made a new request to get the title and link and then created a promise or placeholder for them
    const detailPromises = top5.map((id) =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );
    const response = await Promise.all(detailPromises); //used all so they could all be ran at the same time

    return response
      .map((res) => ({
        //this function just takes the response we got and puts it into a neater format
        title: res.data.title,
        url: res.data.url,
        source: "Hacker News",
      }))
      .filter((item) => item.url); //if a post didnt have a website link, it was removed
  } catch (error) {
    //fail safe in case website doesnt load properly
    return [];
  }
};
