import React, { useEffect, useState } from "react";
import { fetchTrends } from "./services/api";
import TrendCard from "./components/TrendCard";

function App() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrends();
      setTrends(data);
    };
    getData();
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "sans-serif",
        }}
      >
        <h1>Trend Arbitrage Dashboard</h1>
        <p>
          Top {trends.length} trending articles across Reddit, HackerNews, and
          Google News
        </p>
        <br></br>

        {trends.length > 0 ? (
          trends.map((item, index) => <TrendCard key={index} trend={item} />)
        ) : (
          <p>Loading trends from MongoDB....</p>
        )}
      </div>
    </>
  );
}

export default App;
