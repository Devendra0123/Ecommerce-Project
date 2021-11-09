import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link style={{fontSize:"16px"}}  to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4 style={{fontSize:"16px"}} >Full Name</h4>
                <p style={{fontSize:"14px"}} >{user.name}</p>
              </div>
              <div>
                <h4 style={{fontSize:"16px"}} >Email</h4>
                <p style={{fontSize:"14px"}} >{user.email}</p>
              </div>
              <div>
                <h4 style={{fontSize:"16px"}} >Joined On</h4>
                <p style={{fontSize:"14px"}} >{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link style={{fontSize:"16px"}}  to="/orders">My Orders</Link>
                <Link style={{fontSize:"16px"}}  to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;