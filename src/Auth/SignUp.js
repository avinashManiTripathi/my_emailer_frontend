import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  SendOTPAction,
  VerifyAndRegistrationAction,
} from "../Actions/registrationAction";
const SignUp = (props) => {
  const [phone, setPhone] = useState();
  const [otac, setOTAC] = useState();
  const [cc, setCC] = useState();
  const [dc, setDC] = useState();
  const [otp, setOTP] = useState();
  const dispatch = useDispatch();
  const sendOTP = useSelector((state) => state.sendOTPReducers);

  const { success } = sendOTP;
  const [phoneError, setPhoneError] = useState();
  const [otacError, setOTACError] = useState();
  const [otpError, setOTPError] = useState();

  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(SendOTPAction(phone, cc, dc));
  };

  const handleOnSub = (e) => {
    const hash = localStorage.getItem("hash");
    e.preventDefault();
    const isValid = signUpFormValidation();
    if (isValid)
      dispatch(VerifyAndRegistrationAction(otac, cc, dc, phone, otp, hash));
  };

  const signUpFormValidation = () => {
    const phoneError = {};
    const otacError = {};

    const dcError = {};
    const otpError = {};

    let isValid = true;

    if (phone == null) {
      phoneError.phoneErrorEmpty = "*please enter phone number";
      isValid = false;
    }

    if (otac == null) {
      otacError.otacErrorEmpty = "*please enter one time access code";
      isValid = false;
    }

    if (dc == null && cc == null) {
      dcError.dcErrorEmpty = "*please enter distributor code or customer code";
      isValid = false;
    }
    if (otp == null) {
      otpError.otpErrorEmpty = "*Please Enter OTP";
      isValid = false;
    }

    if (phone != null && phone.trim().length < 10) {
      phoneError.phoneErrorLength = "*Please Enter Valid Phone ";
      isValid = false;
    }

    if (phone != null && phone.trim().length > 10) {
      phoneError.phoneErrorLength = "*Please Enter Valid Phone ";
      isValid = false;
    }

    setOTACError(otacError);
    setOTPError(otpError);
    setPhoneError(phoneError);

    return isValid;
  };

  return (
    <div>
      <div>
        <h2 className="wrapper">
          <div>
            <span className="style_title_sign ">My-Emailer</span>
          </div>
          <p className="paragraph mt-1">
            A unique marketing initiative <br /> exclusively for My-Emailer
            Authorised Dealers
          </p>
          <div className="form-container-signup">
            <h5 className="black_title mb-2">SIGN UP</h5>
            <p className="paragraph">
              Please enter your One Time Access Code &amp; <br />
              Luxottica Customer Code/Distributor Code.
            </p>
            <form className="sc-jUfyBS eSyZIh" onSubmit={handleOnSub}>
              <div id="recaptcha-container"></div>
              <div className=" input_group">
                <input
                  placeholder="One Time Access Code"
                  type="text"
                  className="input_field_outline"
                  onChange={(e) => setOTAC(e.target.value)}
                />
                {otacError &&
                  Object.keys(otacError).map((key) => {
                    return <span className="error_msg">{otacError[key]}</span>;
                  })}
              </div>
              <div className="row">
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Customer Code"
                    className="input_field_outline"
                    onChange={(e) => setCC(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <div className="sc-fXazdy UjHkE">OR</div>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Distributor Code"
                    className="input_field_outline"
                    onChange={(e) => setDC(e.target.value)}
                  />
                </div>
              </div>

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
              <div className="sc-FRrlG cIjgB"></div>
              <div className=" input_group">
                <input
                  type="text"
                  placeholder="One Time Password (OTP)"
                  className="input_field_outline"
                  pattern="[0-9]{6}"
                  minlength="6"
                  maxlength="6"
                  onChange={(e) => setOTP(e.target.value)}
                  disabled={success ? false : false}
                />
                {otpError &&
                  Object.keys(otpError).map((key) => {
                    return <span className="error_msg">{otpError[key]}</span>;
                  })}

                <Link onClick={handleSendOTP} className="generateOTP">
                  Click here to Generate OTP
                </Link>
              </div>

              <p className="paragraph">
                By clicking "Sign Up" <br /> you accept our{" "}
                <Link
                  to="/termandconditions"
                  style={{
                    display: "inline-block",
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  Terms &amp; Conditions
                </Link>
              </p>

              <button type="submit" value="Verify" className="danger_button">
                Sign Up
              </button>
              <p className="paragraph">
                Already have an account ?{" "}
                <Link to="/signin" style={{ color: "red" }}>
                  Sign In
                </Link>
              </p>
            </form>
          </div>
          <p className="sc-amiJK bvMJFo"></p>
        </h2>
      </div>
    </div>
  );
};
export default SignUp;
