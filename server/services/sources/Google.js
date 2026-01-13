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
