/*For this one because I kept running into a  token/script blocking issue I just searched reddit api
 workaround until I found the following: https://www.reddit.com/r/redditdev/comments/6anc5z/what_on_earth_is_the_url_to_get_a_simple_json/    
 and this comment is what helped me choose my direction "I leveraged Reddit's unauthenticated JSON endpoints to retrieve trending data. 

 While Reddit's official documentation suggests that programmatic access requires OAuth2, I identified that the public .json listings remain accessible to well-identified agents. 

 By implementing a custom User-Agent header, I ensured the application adheres to Reddit's 'Responsible Builder' expectations while maintaining a lightweight, key-less architecture."
*/

//I also used https://www.reddit.com/r/reddit.com/wiki/api/ to get a better understanding of their api system and why I couldnt go the straight route

//When making sure that .json would work and show me an array here is the url used: https://www.reddit.com/r/technology.json

import axios from "axios";

//this function will grab trends from the url provided
export const getRedditTrends = async () => {
  try {
    const url = `https://www.reddit.com/r/technology+ArtificialIntelligence/hot.json?limit=5`; //.json is added to the end of the link so reddit will send the raw data

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "LiloTrendBot/1.0", //in this instance we use axios to go to the web address and wait for a response and set up a header so we can give our request a name and it not get flagged by Reddit
      },
    });

    const posts = response.data.data.children; //here we have to look at the response the web address provided and find the "children" list where the posts are

    return posts.map((post) => ({
      //this mapping function will take the list and put it in a more neat format for the database to read
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`, //for the url I joined the reddit domain link with the post's unique path
      source: "Reddit",
      score: post.data.score || 0,
      commentsCount: post.data.num_comments || 0,
    }));
  } catch (error) {
    console.error("Error retrieving data from Reddit", error);

    return []; //This return is just a fail safe of sorts that tells the next part of the code in case anything comes back as undefined
  }
};
