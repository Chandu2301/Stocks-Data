import { useState } from "react";
import "./Stocks.css";
const Stocks = () => {
  const [searchInput, setSearchInput] = useState("");
  const [recordVisible, setRecordVisible] = useState(false);
  const [data, setData] = useState([]);
  const handleSearch = async () => {
    if (searchInput.trim().length === 0) return false;
    const data = await fetch(
      `https://jsonmock.hackerrank.com/api/stocks?date=${searchInput}`
    ).then((res) => res.json());
    console.log(data.data);
    setData(data.data);
    setRecordVisible(true);
    setSearchInput("");
  };
  return (
    <div>
      <h2 className="header">Stocks Data</h2>
      <input
        className="input-text"
        type="text"
        value={searchInput}
        onChange={(e) => {
          if (recordVisible) setRecordVisible(false);
          setSearchInput(e.target.value);
        }}
        data-testid="app-input"
        placeholder="d-mmmm-yyy"
      />
      <button
        className="search-btn"
        data-testid="app-submit"
        onClick={handleSearch}
      >
        Search
      </button>
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <ul className="list-container" data-testid="stock-data">
              <li>Open: {item.open}</li>
              <li>Close: {item.close}</li>
              <li>High: {item.high}</li>
              <li>Low: {item.low}</li>
            </ul>
          );
        })
      ) : recordVisible ? (
        <div data-testid="no-result">No Result</div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Stocks;
