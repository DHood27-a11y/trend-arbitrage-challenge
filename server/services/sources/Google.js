//used the following references as a how to when it came to rss parsing: https://www.newscatcherapi.com/blog-posts/google-news-rss-search-parameters-the-missing-documentaiton#:~:text=Copy%2Dpaste%20https%3A%2F%2Fnews,ceid%3A%20country%3A%20language, https://www.webshare.io/academy-article/scrape-google-news

import Parser from "rss-parser";

const parser = new Parser();

export const getGoogleTrends = async () => {
  try {
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=technology&hl=en-US&gl=US&ceid=US:en"
    );

    return feed.items.slice(0, 5).map((item) => ({
      title: item.title,
      url: item.link,
      source: "Google",
      score: 0,
      commentsCount: 0,
    }));
  } catch (error) {
    console.error("Failed to fetch data from Google news", error);
    return [];
  }
};
