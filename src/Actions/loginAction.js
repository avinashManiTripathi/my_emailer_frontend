import Axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SEND_OTP_FAIL,
  USER_LOGIN_SEND_OTP_REQUEST,
  USER_LOGIN_SEND_OTP_SUCCESS,
  USER_LOGIN_SUCCESS,
} from "../Constants/LoginConstants";
import { toast } from "react-toastify";

toast.configure();
export const LoginAction = (phone, otp, hash, history) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  try {
    await Axios.post("https://myemailer123.herokuapp.com/api/signin", {
      phone,
      otp,
      hash,
    }).then((response) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response,
      });
      localStorage.setItem("user", JSON.stringify(response));
      history.push("/landing");
    });
  } catch (error) {
    toast.warn("Something Went Wrong Please Try Again", {
      position: "top-center",
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

export const LoginSendOTPAction = (phone) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_SEND_OTP_REQUEST,
  });
  try {
    const data = await Axios.post(
      "https://myemailer123.herokuapp.com/api/signin/send_otp",
      {
        phone,
      }
    ).then((response) => {
      localStorage.setItem("hash", response.data.hash);
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 3000)),
        {
          pending: "Sending OTP   ",
          success: " Success👌",
        },
        { position: "top-center" }
      );
    });
    dispatch({
      type: USER_LOGIN_SEND_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.warn(error.response.data.message, { position: "top-center" });
    dispatch({
      type: USER_LOGIN_SEND_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
