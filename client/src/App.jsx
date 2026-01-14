import { useEffect, useState } from "react";
import { fetchTrends } from "./services/api";
import TrendCard from "./components/TrendCard";

function App() {
  const [trends, setTrends] = useState([]); //created a use state variable that will hold data

  useEffect(() => {
    //this will run once the site opens and will call api to "fetch" trends from backend
    const getData = async () => {
      const data = await fetchTrends();
      setTrends(data); //here is where the useState or empty array will hold our trends
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
        {/*This will display to user how many articles were found exactly */}
        <h1>Trend Arbitrage Dashboard</h1>
        <p>
          Top {trends.length} trending articles across Reddit, HackerNews, and
          Google News
        </p>
        <br></br>

        {/*Here we are looping through our list and where a TrendCard will be created for each item */}
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
