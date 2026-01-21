import { useEffect, useState } from "react";
import { fetchTrends } from "./services/api";
import TrendCard from "./components/TrendCard";
import "./App.css";

function App() {
  const [trends, setTrends] = useState([]); //created a use state variable that will hold data
  const [searchTerm, setSearchTerm] = useState(""); //will track user input

  useEffect(() => {
    //this will run once the site opens and will call api to "fetch" trends from backend
    const getData = async () => {
      const data = await fetchTrends();
      setTrends(data); //here is where the useState or empty array will hold our trends
    };
    getData();
  }, []);

  //This function will check both title and source for a match

  const filteredTrends = trends.filter((item) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const sourceMatch = item.source
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return titleMatch || sourceMatch;
  });

  return (
    <>
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "sans-serif",
        }}
      >
        {/*This will display to user how many articles were found exactly */}
        <h1>Trend Arbitrage Dashboard</h1>

        {/* Search input field */}
        <section aria-label="Search Trends" style={{ marginBottom: "20px" }}>
          <input
            type="search"
            aria-label="Search articles by title or source"
            placeholder="Search by title or source (e.g. 'Reddit)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 20px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              fontSize: "18px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </section>

        {/*Trend List with Aria-Live to announce changes to blind users */}
        <section
          aria-live="polite"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        />

        <p>
          Showing {filteredTrends.length} of {trends.length} across Reddit,
          HackerNews, and Google News, GitHub, and Stack Overflow
        </p>
        <br></br>

        {/*Here we are looping through our list and where a TrendCard will be created for each item */}
        {trends.length > 0 ? (
          filteredTrends.length > 0 ? (
            filteredTrends.map((item, index) => (
              <TrendCard key={index} trend={item} />
            ))
          ) : (
            <p>No results found for "{searchTerm}"</p>
          )
        ) : (
          <p>Loading trends from MongoDB....</p>
        )}
      </main>
    </>
  );
}

export default App;
