import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import {
  SEND_OTP_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from "../Constants/RegistrationConstants";

export const SendOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return { success: true };
    case SEND_OTP_SUCCESS:
      return { ...state, success: true };
    case SEND_OTP_FAIL:
      return { success: false };
    default:
      return state;
  }
};

export const VerifyAndRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { loading: true };
    case USER_REGISTRATION_SUCCESS:
      return { loading: false, data: action.paylaod };
    case USER_REGISTRATION_FAIL:
      return { loading: false, reg_error: action.paylaod };
    default:
      return state;
  }
};
