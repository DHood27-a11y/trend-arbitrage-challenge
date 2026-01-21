import axios from "axios";

export const getGitHubTrends = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories?q=created:>2025-01-01&sort=stars&order=desc&per_page=5",
      {
        headers: {
          "User-Agent": "Trend-Arbitrage-App",
        },
      }
    );

    return response.data.items.slice(0, 5).map((item) => ({
      title: item.full_name,
      link: item.html_url,
      source: "GitHub",
      description: item.description,
    }));
  } catch (error) {
    console.error("Failed to fetch GitHub", error);
    return [];
  }
};
