import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { LoginReducer, LoginSendOTPReducer } from "./Reducers/LoginReducers";
import {
  SendOTPReducer,
  VerifyAndRegistrationReducer,
} from "./Reducers/RegistrationReducers";
import {
  FindAllStoreReducers,
  FindStoreByIdReducer,
  SendImageToEmailReducers,
  SendImageToWhatsAppReducers,
  StoreDeleteReducer,
  storeReducers,
  UpdateStoreReducers,
} from "./Reducers/storeReducer";

const initialState = {};

const reducer = combineReducers({
  addstore: storeReducers,
  findStoreReducer: FindAllStoreReducers,
  sendOTPReducers: SendOTPReducer,
  verifyAndRegistrationReducer: VerifyAndRegistrationReducer,
  loginSendOTPReducer: LoginSendOTPReducer,
  loginReducer: LoginReducer,
  storeDeleteReducer: StoreDeleteReducer,
  findStoreByIdReducer: FindStoreByIdReducer,
  sendImageToEmailReducers: SendImageToEmailReducers,
  sendImageToWhatsAppReducers: SendImageToWhatsAppReducers,
  updateStoreReducers: UpdateStoreReducers,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
