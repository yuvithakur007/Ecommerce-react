// /src/pages/Products.js
import React, { useState } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("None");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  
  const handleFilterByCategory= (e) => {
    setCategory(e.target.value);
  }

  const handleSortBy = (e) => {
    setSort(e.target.value);
  }


  return (
    <div>
      <Header handleSearch={handleSearch} 
              handleFilterByCategory={handleFilterByCategory} 
              handleSortBy={handleSortBy}/>
      <ProductList search={search} 
                  category={category} 
                  sort={sort}/>
      <Footer/>
    </div>
  );
}

export default Products;
