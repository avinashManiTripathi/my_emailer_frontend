import {
  DELETE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  FIND_STOREBYID_FAIL,
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

export const storeReducers = (state = {}, action) => {
  switch (action.type) {
    case STORE_REQUEST:
      return { loading: true };
    case STORE_SUCCESS:
      return { ...state, loading: false, store: action.payload };
    case STORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UpdateStoreReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STOREBYID_REQUEST:
      return { loading: true };
    case UPDATE_STOREBYID_SUCCESS:
      return { ...state, loading: false, store: action.payload };
    case UPDATE_STOREBYID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const FindAllStoreReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case FIND_STORE_REQUEST:
      return { loading: true };
    case FIND_STORE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FIND_STORE_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export const SendImageToEmailReducers = (state = {}, action) => {
  switch (action.type) {
    case SEND_IMAGETOEMAIL_REQUEST:
      return { EmailSuccess: false };
    case SEND_IMAGETOEMAIL_SUCCESS:
      return { EmailSuccess: true, data: action.payload };
    case SEND_IMAGETOEMAIL_FAIL:
      return { EmailSuccess: false, error: action.payload };
    default:
      return state;
  }
};

export const SendImageToWhatsAppReducers = (state = {}, action) => {
  switch (action.type) {
    case SEND_IMAGETOWHATSAPP_REQUEST:
      return { WhatsAppSuccess: false };
    case SEND_IMAGETOWHATSAPP_SUCCESS:
      return { WhatsAppSuccess: true, data: action.payload };
    case SEND_IMAGETOWHATSAPP_FAIL:
      return { WhatsAppSuccess: false, error: action.payload };
    default:
      return state;
  }
};

export const FindStoreByIdReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case FIND_STOREBYID_REQUEST:
      return state;
    case FIND_STOREBYID_SUCCESS:
      return { ...state, stores: action.payload };
    case FIND_STOREBYID_FAIL:
      return { error: action.error };
    default:
      return state;
  }
};

export const StoreDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STORE_REQUEST:
      return { deleted: false };
    case DELETE_STORE_SUCCESS:
      return { deleted: true };
    case DELETE_STORE_FAIL:
      return { deleted: false, error: action.payload };
    default:
      return state;
  }
};
