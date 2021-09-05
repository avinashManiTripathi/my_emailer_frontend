import Axios from "axios";
import {
  SEND_OTP_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from "../Constants/RegistrationConstants";

import { toast } from "react-toastify";
toast.configure();
export const SendOTPAction = (phone) => async (dispatch) => {
  dispatch({
    type: SEND_OTP_REQUEST,
  });
  try {
    await Axios.post("https://myemailer123.herokuapp.com/sendOTP", {
      phone,
    }).then((response) => {
      localStorage.setItem("hash", response.data.hash);
      dispatch({
        type: SEND_OTP_SUCCESS,
        payload: response.data,
      });
    });
    toast.success("OTP has been sent Please check");
  } catch (error) {
    toast.warn(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch({
      type: SEND_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
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
