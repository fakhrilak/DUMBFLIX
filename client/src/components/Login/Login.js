import React, { useState, useEffect, useRef } from "react";

import Modal from "../Modal/Modal";
import { handleLogin } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({
  showModalLogin,
  modalLogin,
  showModalRegister,
  handleLogin,
  auth: { error, loading },
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, showModalLogin);
  };
  console.log(error)
  return (
    <div>
      {modalLogin ? (
        <div onClick={() => showModalLogin()} className="back-drop" />
      ) : null}

      <Modal className="modal" show={modalLogin}>
        <h1 style={{ marginBottom: "40px" }}>LOGIN</h1>
        <p>{error}</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="custom-input"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="custom-input"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group" style={{ marginTop: "50px" }}>
            <button type="submit" className="button">
              Login
            </button>
          </div>
        </form>
        <p style={{ color: "#B1B1B1", fontSize: "18px",textAlign:'center' }}>
          Don't have an account ? Klik{" "}
            <span style={{ fontWeight: "900", cursor: "pointer" }} onClick={()=>showModalRegister()}>Here</span>
        </p>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { handleLogin })(Login);
