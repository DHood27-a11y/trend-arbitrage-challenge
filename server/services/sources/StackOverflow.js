import axios from "axios";

export const getStackOverflowTrends = async () => {
  try {
    const response = await axios.get(
      "https://api.stackexchange.com/2.3/questions?pagesize=10&order=desc&sort=hot&site=stackoverflow"
    );

    return response.data.items.slice(0, 5).map((item) => ({
      title: item.title,
      link: item.link,
      source: "Stack Overflow",
    }));
  } catch (error) {
    console.error("Failed to fetch Stack Overflow", error);
    return [];
  }
};
