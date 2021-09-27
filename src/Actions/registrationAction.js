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
export const SendOTPAction =
  (phone, customer_code, distributer_code) => async (dispatch) => {
    dispatch({
      type: SEND_OTP_REQUEST,
    });
    try {
      await Axios.post("http://localhost:5000/api/signup/send_otp", {
        phone,
        customer_code,
        distributer_code,
      }).then((response) => {
        localStorage.setItem("hash", response.data.hash);
        dispatch({
          type: SEND_OTP_SUCCESS,
          payload: response.data,
        });
      });
      toast.success("OTP has been sent Please check", {
        position: "top-center",
      });
    } catch (error) {
      toast.warn(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        { position: "top-center" }
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
      const data = await Axios.post(
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
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 3000)),
        {
          pending: "Sending    ",
          success: "Register Successfully",
        },
        { position: "top-center" }
      );

      console.log("data" + data);
      dispatch({
        type: USER_REGISTRATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      toast.warn(error.response.data.message, { position: "top-center" });

      dispatch({
        type: USER_REGISTRATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
