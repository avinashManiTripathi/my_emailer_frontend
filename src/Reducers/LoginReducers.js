import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SEND_OTP_FAIL,
  USER_LOGIN_SEND_OTP_REQUEST,
  USER_LOGIN_SEND_OTP_SUCCESS,
  USER_LOGIN_SUCCESS,
} from "../Constants/LoginConstants";

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false };
    case USER_LOGIN_FAIL:
      return { loading: true };
    default:
      return state;
  }
};
export const LoginSendOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SEND_OTP_REQUEST:
      return { success: false };
    case USER_LOGIN_SEND_OTP_SUCCESS:
      return { ...state, success: true };
    case USER_LOGIN_SEND_OTP_FAIL:
      return { success: false, otpError: action.payload };
    default:
      return state;
  }
};
