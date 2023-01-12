import React, { useState } from "react";
import "./AdminAuth.css";
import Logo from "../../img/logo.png";
import { forgotOtp, forgotPassword, sendOtp } from "../../api/AuthRequest";
import { toast, Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Forgot = () => {
  const [data, setData] = useState({});
  const [otpField, setOtpField] = useState(false);
  const [value, setValue] = useState({otp:''});
  const [disabled,setDisabled]=useState(false)
  const [otp,setOtp]=useState('')
  const [passField,setPassField]=useState(false)
  const [password,setPassword]=useState('')
  const [formData,setFormData]=useState({});
  const [success,setSuccess]=useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOtp = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const emailSubmit =async (e) => {
    e.preventDefault();
    setDisabled(true)
    const response=await forgotOtp(data);
    setOtp(response.data.response.otp)
    console.log(response.data.response.otp,'Please Enter this Otp')
    setOtpField(true)
  };

  const otpSubmit=(value)=>{
    value.preventDefault()

    const checkOtp=value?.target[0]?.value;
        if(otp===checkOtp){
            setPassField(true)
        }else{
            toast.error('Wrong OTP')
        }

  }

  const changePassword=async(e)=>{
    e.preventDefault();
    const response={
      username:data.username,
      password:password
    }
      setFormData(response);
      const res = await forgotPassword(formData)
      toast.success(res.data)      
      console.log(res)
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
      {!passField ?(<div className="a-right">
        {!otpField ? (
          <form className="infoForm authForm" onSubmit={emailSubmit}>
            <h3>Forgot Password</h3>

            <div>
              <input
                type="email"
                name="username"
                placeholder="Email Address"
                className="infoInput"
                onChange={handleChange}
                value={data.username}
                disabled={disabled}
              />
            </div>

            <div>
              <button
                className="button infoButton"
                type="submit"
                disabled={disabled}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={otpSubmit} className="infoForm authForm">
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
            <button className="button otp" type="submit">
              Verify
            </button>
          </form>
        )}
      </div>):(
        <div className="a-right">
             <form onSubmit={changePassword} className="infoForm authForm">
            <h3>Enter New Password</h3>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter New Passoword"
                className="infoInput"
                onChange={handlePassword}
                value={password}
              />
            </div>
            <button className="button otp" type="submit">
              Verify
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Forgot;
