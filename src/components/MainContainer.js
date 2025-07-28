import React, { useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([
    { id: 1, name: "Apple", price: 145.09, type: "Tech" },
    { id: 2, name: "Microsoft", price: 305.62, type: "Tech" },
    { id: 3, name: "Nike", price: 134.18, type: "Sportswear" },
    { id: 4, name: "Goldman Sachs", price: 327.85, type: "Finance" },
    { id: 5, name: "Amazon", price: 3342.53, type: "Tech" },
    { id: 6, name: "JP Morgan", price: 152.73, type: "Finance" },
  ]);

  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState("All");

  const handleBuyStock = (stock) => {
    if (!portfolio.some(s => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter(s => s.id !== stock.id));
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleFilter = (value) => {
    setFilterBy(value);
  };

  // Apply sorting
  let displayedStocks = [...stocks];
  if (sortBy === "Alphabetically") {
    displayedStocks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Price") {
    displayedStocks.sort((a, b) => a.price - b.price);
  }

  // Apply filtering
  if (filterBy !== "All") {
    displayedStocks = displayedStocks.filter(stock => stock.type === filterBy);
  }

  return (
    <div>
      <SearchBar onSort={handleSort} onFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} onStockClick={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;