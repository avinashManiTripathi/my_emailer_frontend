import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, LoginSendOTPAction } from "../Actions/loginAction";

function SignIn(props) {
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const signin_status = useSelector((state) => state.loginReducer);
  const otpStatus = useSelector((state) => state.loginSendOTPReducer);
  const { loading } = signin_status;
  const { success, otpError } = otpStatus;
  const dispatch = useDispatch();
  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(LoginSendOTPAction(phone));
  };

  const redirectToSignUp = () => {
    props.history.push("/SignUp");
  };

  const hash = localStorage.getItem("hash");
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(LoginAction(phone, otp, hash, props.history));
  };

  return (
    <div>
      <div>
        <h2 className="wrapper">
          <div>
            <span className="red_title">Ray-Ban</span>
            <span className="style_title">My-Emailer</span>
          </div>
          <p className="paragraph">
            A unique marketing initiative <br /> exclusively for Ray-Ban
            Authorised Dealers.
          </p>

          <div className="enlJuL">
            <h5 className="black_title">SIGN IN</h5>
            <p className="paragraph">
              Please enter your mobile number. <br />
              An OTP will be sent to this mobile number for authentication.
            </p>

            <form className=" eSyZIh" onSubmit={handleSignIn}>
              <div id="recaptcha-container"></div>

              <div className="sc-bTDOke dXiuJH">
                <input
                  placeholder="Mobile Number"
                  type="text"
                  className="input_field"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {otpError && <span class="error_msg">{otpError} </span>}
              </div>
              <div className="sc-FRrlG cIjgB"></div>
              <div className="sc-bTDOke dXiuJH">
                <input
                  type="text"
                  placeholder="Click to receive OTP"
                  className="input_field_otp"
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={success ? false : true}
                />

                <button
                  value="Resend&nbsp;Otp"
                  onClick={handleSendOTP}
                  className="otp_button"
                >
                  Send OTP
                </button>
                {success && (
                  <div class="error_msg">OTP has Been Sent On Your Phone</div>
                )}
              </div>
              <div className="sc-hOPeYd button_row">
                <button type="submit" value="Verify" className="danger_button">
                  Sign In
                </button>
                <button onClick={redirectToSignUp} className="outline_danger">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </h2>
      </div>
    </div>
  );
}
export default SignIn;
