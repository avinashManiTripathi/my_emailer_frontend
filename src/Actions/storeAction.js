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
      dispatch({
        type: STORE_SUCCESS,
        payload: data,
      });
    } catch (error) {
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

export const SendStoreImageToEmail = (id) => async (dispatch) => {
  dispatch({
    type: SEND_IMAGETOEMAIL_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `https://myemailer123.herokuapp.com/api/store/email/${id}`,
      {
        headers: authHeader(),
      }
    );

    dispatch({
      type: SEND_IMAGETOEMAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_IMAGETOEMAIL_FAIL,
      payload: error,
    });
  }
};

export const SendStoreImageToWhatsApp = (id) => async (dispatch) => {
  dispatch({
    type: SEND_IMAGETOWHATSAPP_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `https://myemailer123.herokuapp.com/api/store/whatsapp/${id}`,
      {
        headers: authHeader(),
      }
    );
    dispatch({
      type: SEND_IMAGETOWHATSAPP_SUCCESS,
      payload: data,
    });
  } catch (error) {
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
    const { data } = await Axios.get(
      `https://myemailer123.herokuapp.com/api/store/delete/${id}`,
      {
        headers: authHeader(),
      }
    ).then(
      dispatch({
        type: DELETE_STORE_SUCCESS,
        payload: data,
      })
    );
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload: error,
    });
  }
};

export const UpdateStoreByIdAction =
  ({
    id,
    store_name,
    store_address,
    city,
    state,
    pin_code,
    email_address,
    mobile_number,
  }) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_STOREBYID_REQUEST,
    });
    try {
      const { data } = Axios.post(
        `https://myemailer123.herokuapp.com/api/store/update/${id}`,
        {
          store_name,
          store_address,
          city,
          state,
          pin_code,
          email_address,
          mobile_number,
        }
      );

      dispatch({
        type: UPDATE_STOREBYID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_STOREBYID_FAIL,
        payload: error,
      });
    }
  };
