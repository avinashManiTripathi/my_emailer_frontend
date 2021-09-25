import React, { useState } from "react";
import { Link } from "react-router-dom";
import signInImage from "../images/SignIn.jpg";
import { useDispatch, useSelector } from "react-redux";

import { LoginAction, LoginSendOTPAction } from "../Actions/loginAction";
import { toast } from "react-toastify";

const SignIn = (props) => {
  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState();

  const [otp, setOTP] = useState();
  const otpStatus = useSelector((state) => state.loginSendOTPReducer);

  const { success, otpError } = otpStatus;
  const dispatch = useDispatch();
  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(LoginSendOTPAction(phone));
  };

  const hash = localStorage.getItem("hash");
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(LoginAction(phone, otp, hash, props.history));
  };

  return (
    <div className="container-fluid">
      <div>
        <span className="style_title_signin">My-Emailer</span>
      </div>
      <p className="paragraph">
        A unique marketing initiative <br /> exclusively for My-Emailer
        Authorised Dealers.
      </p>

      <div className="row mt-4">
        <div className="d-none d-md-block d-lg-block col-md-6  mt-4 ">
          <div className="landing-img  border-left">
            <img src={signInImage} alt="" className="w-80 maintain-order" />
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="form-container ">
            <h5 className="black_title">SIGN IN</h5>
            <p className="paragraph">Please enter your details to proceed</p>

            <form className="" onSubmit={handleSignIn}>
              <div id="recaptcha-container"></div>
              <div className=" input_group">
                <input
                  placeholder="Mobile Number"
                  type="text"
                  pattern="[0-9]{10}"
                  size="10"
                  minlength="10"
                  maxlength="10"
                  className="input_field_outline"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError &&
                  Object.keys(phoneError).map((key) => {
                    return <span className="error_msg">{phoneError[key]}</span>;
                  })}
              </div>
              <div className="sc-bTDOke input_group">
                <input
                  type="text"
                  placeholder="Click to receive OTP"
                  className="input_field_outline"
                  pattern="[0-9]{6}"
                  minlength="6"
                  maxlength="6"
                  onChange={(e) => setOTP(e.target.value)}
                  disabled={success ? false : false}
                />
                <div className="m-0">
                  <p className="paragraph">
                    <Link onClick={handleSendOTP} style={{ color: "red" }}>
                      Click here to Generate OTP
                    </Link>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                value="Verify"
                style={{ float: "left" }}
                className="danger_button"
              >
                Sign In
              </button>
              <div className=" input_group mt-0">
                <p className="paragraph">
                  Don't have an account ?{" "}
                  <Link to="/signUp" style={{ color: "red" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
