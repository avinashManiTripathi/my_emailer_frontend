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
  UPLOAD_TEMPLATE_FAIL,
  UPLOAD_TEMPLATE_REQUEST,
  UPLOAD_TEMPLATE_SUCCESS,
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
      toast.success("Store Added Successfully", { position: "top-center" });
      dispatch({
        type: STORE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      toast.warn(error.response && error.response.data.message, {
        position: "top-center",
      });
      dispatch({
        type: STORE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
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
      `http://localhost:5000/api/store/email`,
      { email },
      {
        headers: authHeader(),
      }
    );
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        pending: "Sending Email  ",
        success: " Success check your Email👌",
      },
      { position: "top-center" }
    );
    dispatch({
      type: SEND_IMAGETOEMAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        pending: "Sending Email  ",
        error: "fail",
      },
      { position: "top-center" }
    );
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
      `https://myemailer123.herokuapp.com/api/store/whatsapp`,
      { phone },
      {
        headers: authHeader(),
      }
    );
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        pending: "Sending message  ",
        success: " Success👌",
        error: "Failed 🤯",
      },
      { position: "top-center" }
    );

    dispatch({
      type: SEND_IMAGETOWHATSAPP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        error: "Failed 🤯",
      },
      { position: "top-center" }
    );

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
      toast.success("Deleted Successfully", { position: "top-center" });
      dispatch({
        type: DELETE_STORE_SUCCESS,
      });
    });
  } catch (error) {
    toast.warn("Failed Try again ", { position: "top-center" });
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
    toast.success("Updated Successfully", { position: "top-center" });
    dispatch({
      type: UPDATE_STOREBYID_SUCCESS,
      payload: data,
    });
    history.push("/stores");
  } catch (error) {
    toast.warn("Update Failed", { position: "top-center" });
    dispatch({
      type: UPDATE_STOREBYID_FAIL,
      payload: error,
    });
  }
};

export const UploadUserEmailTemplateAction =
  (dataUrl, history) => async (dispatch) => {
    dispatch({
      type: UPLOAD_TEMPLATE_REQUEST,
    });
    try {
      await Axios.post(
        `http://localhost:5000/api/upload`,
        { dataUrl },
        { headers: authHeader() }
      ).then((response) => {
        console.log("response", response.data);
        dispatch({
          type: UPLOAD_TEMPLATE_SUCCESS,
          payload: response.data,
        });
        history.push("/share");
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_TEMPLATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
