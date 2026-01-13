export const calculateTrendScore = (item) => {
  let baseScore = 100;

  if (item.score) {
    baseScore += item.score;
  }

  if (item.source === "Hacker News") {
    baseScore += 75;
  } else if (item.baseScore === "Google") {
    baseScore += 50;
  } else if (item.source === "Reddit") {
    baseScore += 25;
  }

  return baseScore;
};
