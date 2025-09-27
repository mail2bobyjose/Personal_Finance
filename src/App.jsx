import { useState } from 'react'
import "./App.css";

const PortfolioTracker = () => {
  const stockData = [
    {
      stockCode: "AAPL",
      stockName: "Apple Inc.",
      boughtDate: "Jan 15, 2024",
      boughtPrice: 185.5,
      currentPrice: 196.01,
      profitLoss: 105.1,
      profitLossPercent: 5.67,
    },
    {
      stockCode: "GOOGL",
      stockName: "Alphabet Inc.",
      boughtDate: "Feb 20, 2024",
      boughtPrice: 142.8,
      currentPrice: 139.18,
      profitLoss: -18.1,
      profitLossPercent: -2.54,
    },
    {
      stockCode: "MSFT",
      stockName: "Microsoft Corporation",
      boughtDate: "Mar 10, 2024",
      boughtPrice: 420.15,
      currentPrice: 446.14,
      profitLoss: 207.92,
      profitLossPercent: 6.19,
    },
  ];

  const totalPortfolioValue = 6225.12;
  const overallProfitLoss = 294.92;
  const overallProfitLossPercent = 4.97;

  return (
    <div className="portfolio-container">
      <header className="header">
        <h1>My Share Portfolio</h1>
        <p>Monday, September 22, 2025</p>
      </header>

      <section className="portfolio-summary">
        <div className="portfolio-value">
          <h2>Total Portfolio Value</h2>
          <p>${totalPortfolioValue.toFixed(2)}</p>
        </div>
        <div className="profit-loss">
          <h2>Overall Profit/Loss</h2>
          <p
            className={overallProfitLoss >= 0 ? "positive" : "negative"}
          >
            ${overallProfitLoss.toFixed(2)} ({overallProfitLossPercent}%)
          </p>
        </div>
      </section>

      <section className="stock-holdings">
        <h2>Stock Holdings</h2>
        <table>
          <thead>
            <tr>
              <th>Stock Code</th>
              <th>Stock Name</th>
              <th>Bought Date</th>
              <th>Bought Price</th>
              <th>Current Price</th>
              <th>Profit/Loss</th>
              <th>Profit/Loss (%)</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.stockCode}</td>
                <td>{stock.stockName}</td>
                <td>{stock.boughtDate}</td>
                <td>${stock.boughtPrice.toFixed(2)}</td>
                <td>${stock.currentPrice.toFixed(2)}</td>
                <td
                  className={stock.profitLoss >= 0 ? "positive" : "negative"}
                >
                  ${stock.profitLoss.toFixed(2)}
                </td>
                <td
                  className={stock.profitLossPercent >= 0 ? "positive" : "negative"}
                >
                  {stock.profitLossPercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="footer">
        <p>© 2025 Portfolio Tracker</p>
        <div className="secure">Secure</div>
      </footer>
    </div>
  );
};

export default PortfolioTracker;
