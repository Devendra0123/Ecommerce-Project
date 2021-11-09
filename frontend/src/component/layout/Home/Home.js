import React, { useState, useEffect } from 'react'
import "./Home.css";
import Slider from "@mui/material/Slider";
import ProductCard from '../Product/ProductCard';
import {clearErrors, fetchProducts} from "../../../redux/Product/productSlice";
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from "react-alert";

function Home({match}) {
 
  const alert = useAlert();
  const dispatch = useDispatch();

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
      error  
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
      <div>
       
            <div className="home">

<div className="home_hero_image">
  <img src="./heroImage.jpg" alt="" />
  <div className="home_info">
     <h1>Devendra Online Shop</h1>
     <p>We deliver products all over Nepal, India and Europe.</p>
  </div>
</div>

<div className="home_filter">
  <div className="home_categories">
     {categories.map(category=>(
         <button 
         key={category}
         onClick={()=> setCategory(category)}>{category}</button>
     ))}
  </div>

  <div className="price_filter">
      <Slider
      value={price}
      onChange={priceHandler}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      min={0}
      max={5000}
    />
  </div>
</div>

<div className="home_products">
{products && products.map((product) => (
     <ProductCard key={product._id} product={product} />
 ))
 }
</div>

</div>
</div>
)
}

export default Home
