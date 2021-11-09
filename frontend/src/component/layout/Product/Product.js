import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import MetaData from "../Metadata";
import ProductCard from '../Product/ProductCard';
import {clearErrors, fetchProducts} from "../../../redux/Product/productSlice";

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const currentPage = 1;
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  const ratings = 0;

  const categories = [
    "All",
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Fruits",
  "Camera",
  "SmartPhones",
];

  const {  
    products,
    loading,
    error,
  } = useSelector((state) => state.productsReducer);

  const keyword = match.params.keyword;


  const priceHandler = async(event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    const myForm = {
      keyword : keyword ? keyword : "",
      currentPage : currentPage,
      price : price,
      ratings : ratings,
      category : category,
    }
    dispatch(fetchProducts(myForm));
  }, [dispatch, keyword, currentPage, price,ratings, category, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
          {products && products.map((product) => (
    <ProductCard key={product._id} product={product} />
 ))}
          </div>

          <div className="filterBox">
          
          <Typography style={{textAlign:"center",borderRadius:"23px"}} >Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  style={{fontSize:"15px", fontWeight:"bold",letterSpacing:"1.3px"}}
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <Typography style={{textAlign:"center",borderRadius:"23px"}}>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={5000}
            />

          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;