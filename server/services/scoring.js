//Resource used to "up" the scoring system: "https://www.freecodecamp.org/news/what-is-sentiment-analysis-a-complete-guide-to-for-beginners/", "https://stackoverflow.com/questions/57981753/how-to-develop-scoring-algorithms-using-functions", "youtube.com/watch?v=JAr-N89PXyY&start=1"

//this function is meant to calculate the rankiing of each trend in the array
export const calculateTrendScore = (item, allTrends = []) => {
  let baseScore = 100; //They will start with a base score of 100

  //--Credibility Boost---
  if (item.score) {
    //if the website already has a preset amounr of scores and likes that number is then just added to the total to reflect whats already on the site (Ex: Reddit)
    baseScore += item.score;
  }

  if (item.source === "Hacker News") {
    //I gave base plus an additional number just based on the the level of trust/credibility the site already has in my eyes, HN usually has a high quality/standard of tech news
    baseScore += 75;
  } else if (item.source === "Google") {
    //Google gets a "medium" boost because its pretty good about showing the general publics' searches
    baseScore += 50;
  } else if (item.source === "Reddit") {
    //Reddit is more of a community based site so it got a smaller boost than the others
    baseScore += 25;
  }

  //---The "Feeling" Check (Sentiment)
  const title = item.title.toLowerCase(); //this will look for specific words in the title to see if it qualifies as "exciting"

  if (
    //if its a new release/breakthrough it will get +50 points
    title.includes("launch") ||
    title.includes("new") ||
    title.includes("breakthrough")
  ) {
    baseScore += 50;
  }

  if (
    //if its unreliable/scam it will get -50 and sink to the bottom of the list
    title.includes("error") ||
    title.includes("broken") ||
    title.includes("warning") ||
    title.includes("scam")
  ) {
    totalPoints -= 50;
  }

  //---The "Viral" Check (Velocity)

  const isViral = allTrends.some((otherItem) => {
    return otherItem.source !== item.source && otherItem.title === item.title;
  });

  return baseScore; //the final number is used to sort the trends on the dashboard from highest to lowest
};
