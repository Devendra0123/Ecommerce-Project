import React, {useState, useEffect} from "react";
import './App.css';
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/layout/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import LoginSignUp from "./component/User/LoginSignUp";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import UpdatePassword from "./component/User/UpdatePassword";
import ProductDetails from "./component/layout/Product/ProductDetails";
import Cart from "./component/Cart/Cart";
import axios from "axios";
import { store } from './redux/store';
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderDetails from "./component/order/OrderDetails";
import MyOrders from "./component/order/MyOrders";
import OrderSuccess from "./component/Cart/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { loadUser } from "./redux/User/userSlice";
import Payment from "./component/Cart/Payment";
import Product from "./component/layout/Product/Product";
import Dashboard from "./component/Admin/Dashboard";
import NewProduct from "./component/Admin/NewProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import ProductList from "./component/Admin/ProductList";
import ProductReviews from "./component/Admin/ProductReviews";
import UpdateProduct from "./component/Admin/UpdateProduct";
import UpdateUser from "./component/Admin/UpdateUser";
import UsersList from "./component/Admin/UserList";

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
      <Router>
        <Header />

        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

        <Switch>
         <Route exact path="/" component={Home} />

         <Route path="/products/:keyword" component={Product} />

         <Route exact path="/products" component={Product} />

         <Route exact path="/product/:id" component={ProductDetails} />

         <Route exact path="/cart" component={Cart} />

         <ProtectedRoute exact path="/shipping" component={Shipping} />

         <ProtectedRoute exact path="/success" component={OrderSuccess} />

         <ProtectedRoute exact path="/orders" component={MyOrders} />

         <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

         <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

         <Route exact path="/login" component={LoginSignUp} />

         <ProtectedRoute exact path="/account" component={Profile} />

         <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

         <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
         <Route exact path="/password/forgot" component={ForgotPassword} />

         <Route exact path="/password/reset/:token" component={ResetPassword} />

         
        <ProtectedRoute
          exact
          path="/admin/dashboard"
          isAdmin={true}
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
        </Switch>
        <Footer />
      </Router>
    
  );
}

export default App;
