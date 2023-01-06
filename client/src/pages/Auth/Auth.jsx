import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import { sendOtp } from "../../api/AuthRequest";
import { toast, Toaster } from "react-hot-toast";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const user=useSelector((state)=>state.authReducer.authData);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData,setUserData]=useState();
  const [disabled,setDesabled]=useState(false)
  const [otpField,setOtpField]=useState(false)
  const [otp,setOtp]=useState('')
  console.log(loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [value,setValue]=useState({otp:''})

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleOtp=(e)=>{
    setValue({...value,[e.target.name]: e.target.value})
  }

  const [confirmPass, setConfirmPass] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    const registerHandle=async()=>{
      const response=await sendOtp(data)
      console.log(response.data.response.otp)
      setOtp(response.data.response.otp);
      setDesabled(true)
      setUserData(data)
      setOtpField(true)
    }

    if (isSignUp) {
      data.password === data.confirmpass
        ? registerHandle()
        // dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  const handleFinish=async(value)=>{
    value.preventDefault();
    const checkOtp=value?.target[0]?.value;
    if(otp === checkOtp){
      dispatch(signUp(userData))
    }else{
      toast.error("Wrong OTP")
    }
  }

  return (
    <div className="Auth">
      <Toaster/>
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Amico</h1>
          <h6>Connect Eachother</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        {!otpField?<form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                disabled={disabled}
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                disabled={disabled}
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="email"
              name="username"
              placeholder="Email Address"
              disabled={disabled}
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
              disabled={disabled}
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm Password"
                disabled={disabled}
                className="infoInput"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account . Sign Up!"}
            </span>

            <button
              className="button infoButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading" : isSignUp ? "Signup" : "Log In"}
            </button>
          </div>
        </form>:(
          <form onSubmit={handleFinish} className="infoForm authForm">
            <h3>Verify Otp</h3>
            <div>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="infoInput"
              onChange={handleOtp}
              value={value.otp}
            />
          </div>
          <button className="button otp" type="submit">Verify</button>
          </form>
        )}


      </div>
    </div>
  );
};

export default Auth;
