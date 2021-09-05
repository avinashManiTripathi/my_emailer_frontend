import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SendOTPAction,
  VerifyAndRegistrationAction,
} from "../Actions/registrationAction";
function SignUp(props) {
  const [phone, setPhone] = useState();
  const [otac, setOTAC] = useState();
  const [cc, setCC] = useState();
  const [dc, setDC] = useState();
  const [otp, setOTP] = useState();
  const dispatch = useDispatch();
  const sendOTP = useSelector((state) => state.sendOTPReducers);
  const userReg = useSelector((state) => state.verifyAndRegistrationReducer);
  const { success } = sendOTP;

  const [phoneError, setPhoneError] = useState();
  const [otacError, setOTACError] = useState();
  const [ccError, setCCError] = useState();
  const [dcError, setDCError] = useState();
  const [otpError, setOTPError] = useState();

  const redirectToSignIn = () => {
    props.history.push("/signin");
  };
  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(SendOTPAction(phone));
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
    const ccError = {};
    const dcError = {};
    const otpError = {};

    let isValid = true;

    if (phone == null) {
      phoneError.phoneErrorEmpty = "Please Enter Phone";
      isValid = false;
    }

    if (otac == null) {
      otacError.otacErrorEmpty = "Please Enter OTOC";
      isValid = false;
    }
    if (cc == null) {
      ccError.ccErrorEmpty = "Please Enter CC";
      isValid = false;
    }
    if (dc == null) {
      dcError.dcErrorEmpty = "Please Enter DC";
      isValid = false;
    }
    if (otp == null) {
      otpError.otpErrorEmpty = "Please Enter OTP";
      isValid = false;
    }

    if (phone != null && phone.trim().length < 10) {
      phoneError.phoneErrorLength = "Please Enter Valid Phone ";
    }

    if (phone != null && phone.trim().length > 10) {
      phoneError.phoneErrorLength = "Please Enter Valid Phone ";
    }

    setCCError(ccError);
    setOTACError(otacError);
    setOTPError(otpError);
    setPhoneError(phoneError);
    setDCError(dcError);

    return isValid;
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
          <div className="form-container">
            <h5 className="black_title">SIGN UP</h5>
            <p className="paragraph">
              Please enter your One Time Access Code &amp; <br />
              Luxottica Customer Code/Distributor Code.
            </p>
            <form className="sc-jUfyBS eSyZIh" onSubmit={handleOnSub}>
              <div id="recaptcha-container"></div>
              <div className="sc-bTDOke dXiuJH">
                <input
                  placeholder="One Time Access Code"
                  type="text"
                  className="input_field"
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
                    className="input_field"
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
                    className="input_field"
                    onChange={(e) => setDC(e.target.value)}
                  />
                </div>
              </div>
              <p className="paragraph mt-3">
                Your mobile number will be your user name for this platform.
                <br />
                An OTP will be sent to this mobile number for authentication.
              </p>
              <div className="sc-bTDOke dXiuJH">
                <input
                  placeholder="Mobile Number"
                  type="text"
                  pattern="[0-9]{10}"
                  size="10"
                  minlength="10"
                  maxlength="10"
                  className="input_field"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError &&
                  Object.keys(phoneError).map((key) => {
                    return <span className="error_msg">{phoneError[key]}</span>;
                  })}
              </div>
              <div className="sc-FRrlG cIjgB"></div>
              <div className="sc-bTDOke dXiuJH">
                <input
                  type="text"
                  placeholder="Click to receive OTP"
                  className="input_field_otp"
                  pattern="[0-9]{6}"
                  minlength="6"
                  maxlength="6"
                  onChange={(e) => setOTP(e.target.value)}
                  disabled={success ? false : false}
                />
                <button
                  value="Resend&nbsp;Otp"
                  onClick={handleSendOTP}
                  className="otp_button"
                >
                  Send OTP
                </button>
                {otpError &&
                  Object.keys(otpError).map((key) => {
                    return <span className="error_msg">{otpError[key]}</span>;
                  })}
              </div>
              <p className="paragraph">
                By clicking "Sign Up" <br /> you accept our
                <div
                  href="#"
                  style={{
                    color: "inherit",
                    display: "inline-block",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Terms &amp; Conditions
                </div>
              </p>
              <div className="sc-hOPeYd button_row">
                <button type="submit" value="Verify" className="danger_button">
                  Sign Up
                </button>
                <button onClick={redirectToSignIn} className="outline_danger">
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <p className="sc-amiJK bvMJFo"></p>
        </h2>
      </div>
    </div>
  );
}
export default SignUp;
