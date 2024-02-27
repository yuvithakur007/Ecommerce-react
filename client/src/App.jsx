import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Products from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Header from './components/Header';

const App = () => {

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
    <>
    <Router>

    <Header handleSearch={handleSearch} 
    handleFilterByCategory={handleFilterByCategory} 
    handleSortBy={handleSortBy}/>

      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Products search={search} 
                  category={category} 
                  sort={sort}
                  handleSearch={handleSearch} 
                  handleSortBy = {handleSortBy} 
                  handleFilterByCategory = {handleFilterByCategory} 
                  />} 
                  />

        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>

    </Router>
    </>
  );
}

export default App;
