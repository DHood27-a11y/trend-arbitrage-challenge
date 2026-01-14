//This is just the template for how each trend will be displayed on the app: Title, Source, and link that will open article

const TrendCard = ({ trend }) => {
  return (
    <>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "8px",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3>{trend.title}</h3>
        <p>
          Source <strong>{trend.source}</strong> | Score: {trend.score}
        </p>
        <a href={trend.url} target="_blank">
          {" "}
          Read article
        </a>
      </div>
    </>
  );
};

export default TrendCard;
