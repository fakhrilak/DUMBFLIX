import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import person from "../../img/person.jpg";
import ProfileDropdown from "../Profile/ProfileDropdown";
import { connect } from "react-redux";


const Navbar = ({
  showModalLogin,
  showModalRegister,
  auth: {isAuthenticated,user}
}) => {
  
  const [isProfileDropdown, setProfileDropdown] = useState(false);

  const showProfileDropdown = () => {
    setProfileDropdown(!isProfileDropdown);
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/tv-series">TV Shows</Link>
      <Link to="/movies">Movies</Link>
      {!isAuthenticated && (
        <div className="button-login-register">
          <button className="btn-light" onClick={() => showModalRegister()}>
            Register
          </button>
          <button className="btn-red" onClick={() => showModalLogin()}>
            Login
          </button>
        </div>
      )}
      {user === null?(null):isAuthenticated && (
        <div className="profile">
          <div className="nameprofile">
          <div><p>{user.fullName}</p></div>        
          <div style={{paddingLeft:7}}><img src={person} alt="" onClick={() => showProfileDropdown()} /></div>
          </div>
        </div>
      )}
      {isProfileDropdown && (
        <ProfileDropdown showProfileDropdown={showProfileDropdown} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Navbar);
