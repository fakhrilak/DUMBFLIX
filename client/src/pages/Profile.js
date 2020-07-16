import React from "react";
import "./Profile.css";
import avatar from "../img/profile/avatar.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMoneyBillAlt,
  faTransgender,
  faPhone,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

const Profile = ({ auth: { user } }) => {

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-desc">
          <div className="profile-data">
            <h2>Profile Info</h2>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="profile-details">
              <span>Fullname</span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.fullName}
              </span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="profile-details">
              <span>Email</span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.email}
              </span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faMoneyBillAlt} />
            </div>
            <div className="profile-details">
              <span>Active</span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.subscribe ? "Active" : "Not Active Please Subscribe"}
              </span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faTransgender} />
            </div>
            <div className="profile-details">
              <span>Gender</span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.gender}
              </span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="profile-details">
              <span>Phone</span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.phone}
              </span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faLocationArrow} />
            </div>
            <div className="profile-details">
              <span>Address</span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.address}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-img">
          <img src={avatar} alt="avatar" className="profile-avatar" />
          <button className="profile-button">Change Photo Profile</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);