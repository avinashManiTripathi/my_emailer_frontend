import Axios from "axios";
import {
  SEND_OTP_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from "../Constants/RegistrationConstants";

export const SendOTPAction = (phone) => async (dispatch) => {
  dispatch({
    type: SEND_OTP_REQUEST,
  });
  try {
    const { data } = await Axios.post(
      "https://myemailer123.herokuapp.com/sendOTP",
      {
        phone,
      }
    ).then((response) => {
      localStorage.setItem("hash", response.data.hash);
    });
    dispatch({
      type: SEND_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_OTP_FAIL,
      payload: error,
    });
  }
};

export const VerifyAndRegistrationAction =
  (one_time_access_code, customer_code, distributer_code, phone, otp, hash) =>
  async (dispatch) => {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });
    try {
      const { data } = await Axios.post(
        "https://myemailer123.herokuapp.com/api/registration",
        {
          one_time_access_code,
          customer_code,
          distributer_code,
          phone,
          otp,
          hash,
        }
      );
      console.log("send verify" + localStorage.getItem("hash"));
      dispatch({
        type: USER_REGISTRATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTRATION_FAIL,
        payload: error,
      });
    }
  };
