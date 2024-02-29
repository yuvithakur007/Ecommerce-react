import React from "react";
import ProductList from "../components/ProductList";
import SideBar from "../components/SideBar";

const Products = (props) => {
  console.log(props);
  return (
    <div className="product-sidebar">
      <div className="poductsSide">
        <ProductList
          search={props.search}
          category={props.category}
          sort={props.sort}
        />
      </div>
      <div className="productsSidebar">
        <SideBar
          handleSearch={props.handleSearch}
          handleSortBy={props.handleSortBy}
          handleFilterByCategory={props.handleFilterByCategory}
        />
      </div>{" "}
    </div>
  );
};

export default Products;
