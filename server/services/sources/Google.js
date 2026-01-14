//used the following references as a how to when it came to rss parsing: https://www.newscatcherapi.com/blog-posts/google-news-rss-search-parameters-the-missing-documentaiton#:~:text=Copy%2Dpaste%20https%3A%2F%2Fnews,ceid%3A%20country%3A%20language, https://www.webshare.io/academy-article/scrape-google-news, https://www.youtube.com/watch?v=UhM-mEY7Pyk, https://www.npmjs.com/package/rss-parser

import Parser from "rss-parser"; //this tools helps us read the RSS Feed from Google

const parser = new Parser();

//this function sends a request to Google News for the latest tech stories and use the RSS link because its supposed to be "cleaner and faster" than a normal website
export const getGoogleTrends = async () => {
  try {
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=technology&hl=en-US&gl=US&ceid=US:en"
    );

    //We want to take the top 5 news items and format them to match the other sources
    return feed.items.slice(0, 5).map((item) => ({
      title: item.title, //headline
      url: item.link, //link to actual site
      source: "Google", //source
      score: 0, //score and comments are set to 0 since this site doesnt give like/comment counts, but because of the algorithm created it will still get a slight boost
      commentsCount: 0,
    }));
  } catch (error) {
    console.error("Failed to fetch data from Google news", error);
    return [];
  }
};
