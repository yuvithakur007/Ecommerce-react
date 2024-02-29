import React from "react";
import "../styles/sidebar.css";

export default function SideBar({handleSearch, handleSortBy, handleFilterByCategory}) {
  const categories = [
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
  ];
  const sortingOptions = [
    "None",
    "Price: Low to High",
    "Price: High to Low",
    "Rating: Low to High",
    "Rating: High to Low",
  ];
  return (
    <div>
      <div className="sidebar">
        <div className="SideBar-display">
          
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}/>

          <select onChange={handleFilterByCategory}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select onChange={handleSortBy}>
            {sortingOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

        </div>
      </div>
    </div>
  );
}
