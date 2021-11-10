import React,{useState} from 'react';
import "./Header.css";
import {Link,useHistory} from 'react-router-dom';
import Badge from '@mui/material/Badge';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import UserOptions from './UserOption';

function Header() {
const {isAuthenticated, user} = useSelector(state => state.userReducer);
 const history = useHistory();

  const [keyword, setKeyword] = useState("");

  const { cartItems } = useSelector((state) => state.cartReducer);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
    setKeyword("");
  };

    return (
        <div className="header">
           <Link className='header_logoLink' to='/'>
             <h1 className="logo-home-directory">DEVEN</h1>
             <h1 className="mbl-home-directory">D</h1>
           </Link>
           <form className="searchBox" onSubmit={searchSubmitHandler}>
             
              <input 
              type="text" 
              placeholder="Search a product ..."
              value = {keyword}
              onChange={(e) => setKeyword(e.target.value)} 
               />
              <input type="submit" value="Search" />
           </form>
           <div className={isAuthenticated ? `authorized_header`  : `header_left`}>
             <Link className='header_left_orders' to='/orders'>
               <h1>My Orders</h1>
             </Link>

             <Link className='header_left_cart' to='/cart'>
               <Badge badgeContent={cartItems ? cartItems.length : 0} color="success">
                <AddShoppingCartOutlinedIcon sx={{ color: red[50] }} />
               </Badge>
             </Link>

             <div className='header_left_signUp'>
             {
               isAuthenticated 
                ? <UserOptions user={user} /> 
                : <Link className='signInBtn' to='/login'>SignIn</Link>
             }    
             </div>
           </div>
        </div>
    )
}

export default Header
