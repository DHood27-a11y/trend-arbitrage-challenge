//this function is meant to calculate the rankiing of each trend in the array
export const calculateTrendScore = (item) => {
  let baseScore = 100; //They will start with a base score of 100

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

  return baseScore; //the final number is used to sort the trends on the dashboard from highest to lowest
};
