import Axios from "axios";
import {
  DELETE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  FIND_STOREBYID_REQUEST,
  FIND_STOREBYID_SUCCESS,
  FIND_STORE_FAIL,
  FIND_STORE_REQUEST,
  FIND_STORE_SUCCESS,
  SEND_IMAGETOEMAIL_FAIL,
  SEND_IMAGETOEMAIL_REQUEST,
  SEND_IMAGETOEMAIL_SUCCESS,
  SEND_IMAGETOWHATSAPP_FAIL,
  SEND_IMAGETOWHATSAPP_REQUEST,
  SEND_IMAGETOWHATSAPP_SUCCESS,
  STORE_FAIL,
  STORE_REQUEST,
  STORE_SUCCESS,
  UPDATE_STOREBYID_FAIL,
  UPDATE_STOREBYID_REQUEST,
  UPDATE_STOREBYID_SUCCESS,
} from "../Constants/StoreConstants";
import authHeader from "../Helper/auth-header";
import { toast } from "react-toastify";

toast.configure();

export const AddStore =
  (
    store_name,
    store_address,
    city,
    state,
    pin_code,
    email_address,
    mobile_number
  ) =>
  async (dispatch) => {
    dispatch({
      type: STORE_REQUEST,
    });
    try {
      const { data } = await Axios.post(
        "https://myemailer123.herokuapp.com/api/add_store",
        {
          store_name,
          store_address,
          city,
          state,
          pin_code,
          email_address,
          mobile_number,
        },
        {
          headers: authHeader(),
        }
      );
      toast.success("Store Added Successfully");
      dispatch({
        type: STORE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      toast.warn("Failed Try Again");
      dispatch({
        type: STORE_FAIL,
        payload: error,
      });
    }
  };

export const FindStoreByIdAction = (id) => async (dispatch) => {
  dispatch({
    type: FIND_STOREBYID_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `https://myemailer123.herokuapp.com/api/store/${id}`,
      {
        headers: authHeader(),
      }
    );
    dispatch({
      type: FIND_STOREBYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_STOREBYID_SUCCESS,
      payload: error,
    });
  }
};

export const SendStoreImageToEmail = (email) => async (dispatch) => {
  dispatch({
    type: SEND_IMAGETOEMAIL_REQUEST,
  });
  try {
    const { data } = await Axios.post(
      `https://myemailer123.herokuapp.com/api/store/email`,
      { email },
      {
        headers: authHeader(),
      }
    );
    toast.success("Success Please Check Your Inbox");
    dispatch({
      type: SEND_IMAGETOEMAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.warn("failed");
    dispatch({
      type: SEND_IMAGETOEMAIL_FAIL,
      payload: error,
    });
  }
};

export const SendStoreImageToWhatsApp = (phone) => async (dispatch) => {
  dispatch({
    type: SEND_IMAGETOWHATSAPP_REQUEST,
  });
  try {
    const { data } = await Axios.post(
      `http://myemailer123.herokuapp.com/api/store/whatsapp`,
      { phone },
      {
        headers: authHeader(),
      }
    );
    toast.promise(new Promise((resolve) => setTimeout(resolve, 3000)), {
      pending: "Sending message  ",
      success: " Success👌",
      error: "Failed 🤯",
    });

    dispatch({
      type: SEND_IMAGETOWHATSAPP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 3000)), {
      error: "Failed 🤯",
    });

    dispatch({
      type: SEND_IMAGETOWHATSAPP_FAIL,
      payload: error,
    });
  }
};

export const findAllStores = () => async (dispatch) => {
  dispatch({
    type: FIND_STORE_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      "https://myemailer123.herokuapp.com/api/stores",
      {
        headers: authHeader(),
      }
    );
    dispatch({
      type: FIND_STORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_STORE_FAIL,
      payload: error,
    });
  }
};

export const DeleteStoreByIdAction = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_STORE_REQUEST,
  });
  try {
    await Axios.get(
      `https://myemailer123.herokuapp.com/api/store/delete/${id}`,
      {
        headers: authHeader(),
      }
    ).then((response) => {
      toast.success("Deleted Successfully");
      dispatch({
        type: DELETE_STORE_SUCCESS,
      });
    });
  } catch (error) {
    toast.warn("Failed Try again ");
    dispatch({
      type: DELETE_STORE_FAIL,
      payload: error,
    });
  }
};

export const UpdateStoreByIdAction = (store, history) => async (dispatch) => {
  dispatch({
    type: UPDATE_STOREBYID_REQUEST,
  });
  try {
    const { data } = await Axios.post(
      `https://myemailer123.herokuapp.com/api/store/update/${store._id}`,
      {
        store_name: store.store_name,
        store_address: store.store_address,
        city: store.city,
        state: store.state,
        pin_code: store.pin_code,
        email_address: store.email_address,
        mobile_number: store.mobile_number,
      },
      {
        headers: authHeader(),
      }
    );
    toast.success("Updated Successfully");
    dispatch({
      type: UPDATE_STOREBYID_SUCCESS,
      payload: data,
    });
    history.push("/stores");
  } catch (error) {
    toast.warn("Update Failed");
    dispatch({
      type: UPDATE_STOREBYID_FAIL,
      payload: error,
    });
  }
};
