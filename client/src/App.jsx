import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Products from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Header from './components/Header';
import { DarkModeContext, reducer } from './context/DarkModeContext';

const App = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('None');

  const initialState = {
    darkMode:localStorage.getItem('darkMode') || false,
  };

  const [state, dispatch] = useReducer(reducer,initialState);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterByCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSortBy = (e) => {
    setSort(e.target.value);
  };

  return (
    <DarkModeContext.Provider value={{state, dispatch}}>
      <div className= { `main-container ${state.darkMode ? 'dark-mode' : 'light-mode'}`} >
      <Router>
        <Header
          handleSearch={handleSearch}
          handleFilterByCategory={handleFilterByCategory}
          handleSortBy={handleSortBy}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Products
                search={search}
                category={category}
                sort={sort}
                handleSearch={handleSearch}
                handleSortBy={handleSortBy}
                handleFilterByCategory={handleFilterByCategory}
              />
            }
          />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Router>
      </div>
    </DarkModeContext.Provider>
  );
};

export default App;
