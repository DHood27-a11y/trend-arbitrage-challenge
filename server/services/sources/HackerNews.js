import axios from "axios";

export const getHackerTrends = async () => {
  try {
    const topIds = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const top5 = topIds.data.slice(0, 5);
    const detailPromises = top5.map((id) =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );

    const response = await Promise.all(detailPromises);

    return response
      .map((res) => ({
        title: res.data.title,
        url: res.data.url,
        source: "Hacker News",
      }))
      .filter((item) => item.url);
  } catch (error) {
    return [];
  }
};
