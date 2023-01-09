import React from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../actions/AuthAction";
import Logo from "../../img/logo.png";
import "./AdminAuth.css";

const AdminAuth = () => {
  const dispatch=useDispatch();
  const admin=useSelector((state)=>state.adminAuthReducer?.adminAuthData);
  const loading=useSelector((state)=>state.adminAuthReducer?.loading)
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(data))
  };
  return (
    <div className="Auth">
      <Toaster/>
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Amico - Admin</h1>
          <h6>Connect Eachother</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3> Log In</h3>

          <div>
            <input
              type="email"
              name="username"
              placeholder="Email Address"
              className="infoInput"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <div>
            <button
              className="button infoButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
