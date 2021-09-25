import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DeleteStoreByIdAction, findAllStores } from "../Actions/storeAction";
import Loader from "../components/Loader";
import { AddStore } from "../Actions/storeAction";
import { useHistory, Link } from "react-router-dom";

const Stores = (props) => {
  const FindStores = useSelector((state) => state.findStoreReducer);
  const deletedReducers = useSelector((state) => state.storeDeleteReducer);
  const { deleted } = deletedReducers;
  const { loading, error, data } = FindStores;
  let storeLength = data ? data.length > 0 : false;
  const [handleLength, setHandleLength] = useState(false);
  const history = useHistory();
  const [storeName, setStoreName] = useState();
  const [storeAddress, setStoreAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pinCode, setPinCode] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [validationError, setValidationError] = useState();

  const dispatch = useDispatch();
  const redirectToStepOne = () => {
    history.push("/step1");
  };

  const handleStoreDelete = (id) => {
    dispatch(DeleteStoreByIdAction(id));
    dispatch(findAllStores());
  };

  const handleStoreOnSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      dispatch(
        AddStore(
          storeName,
          storeAddress,
          city,
          state,
          pinCode,
          emailAddress,
          mobileNumber
        )
      );
      setHandleLength(false);
      dispatch(findAllStores());
    }
  };

  const formValidation = () => {
    const validationError = {};
    let isValid = true;

    if (
      storeName == null ||
      mobileNumber == null ||
      storeAddress == null ||
      emailAddress == null ||
      state == null ||
      city == null ||
      pinCode == null ||
      mobileNumber == null
    ) {
      validationError.validationEmpty = "* Plese Enter All Fields ";
      isValid = false;
    }

    if (emailAddress != null && !emailAddress.includes("@")) {
      validationError.emailAddressErrorEmpty =
        "Plese Enter Valid Email Address ";
      isValid = false;
    }
    if (mobileNumber != null && mobileNumber.trim().length < 10) {
      validationError.mobileNumberErrorlong = "* Please Enter Valid Phone ";
      isValid = false;
    }
    if (mobileNumber != null && mobileNumber.trim().length > 10) {
      validationError.mobileNumberErrorlong = "* Please Enter Valid Phone ";
      isValid = false;
    }
    setValidationError(validationError);
    return isValid;
  };

  useEffect(() => {
    dispatch(findAllStores());
  }, [dispatch]);

  let count = 1;
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div>
          {storeLength ? (
            <div className="container mb-5 ">
              {/* {deleted && (
                <div
                  className="col align-center flot-none alert alert-success mt-4"
                  role="alert"
                >
                  Store Deleted Successfully
                </div>
              )} */}
              {data
                ? data.map((store) => {
                    return (
                      <div className="stores">
                        <div className="row">
                          <div className="col-md-3  col-sm-12">
                            <form className="stores_form">Store {count++}</form>
                          </div>
                          <div className="col-md-9  col-sm-12">
                            <div className="stores_data">
                              <p>{store.store_name}</p>
                              <p></p>
                              <p>{store.city}</p>
                              <p>{store.pin_code}</p>
                              <p>{store.email_address}</p>
                              <p>{store.mobile_number}</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="d-flex float-right"
                          style={{
                            position: "absolute",
                            right: 10,
                            bottom: 10,
                          }}
                        >
                          <Link
                            to={`/update/store/${store._id}`}
                            className="m-1 store_action_button"
                            style={{ background: "rgb(221, 221, 221)" }}
                          >
                            Edit
                          </Link>
                          <button
                            className=" m-1  store_action_button"
                            onClick={() => handleStoreDelete(store._id)}
                            style={{ background: "rgb(221, 221, 221)" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                : null}
              <div className="eEJWPz">
                <div></div>
                <div style={{ textAlign: "center", width: "100%" }}>
                  <button
                    onClick={(e) => setHandleLength(true)}
                    className="outline-bgwhite-button"
                  >
                    Add Store
                  </button>
                  <button
                    onClick={redirectToStepOne}
                    className="danger_sm_button"
                  >
                    START NOW
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {!storeLength || handleLength ? (
        <div className="container d-flex justify-content-center">
          <form className="col-md-5" onSubmit={handleStoreOnSubmit}>
            <h1 className="mb-5">
              Please enter your details <br />
            </h1>

            {validationError &&
              Object.keys(validationError).map((key) => {
                return (
                  <span className="error_msg">{validationError[key]}</span>
                );
              })}

            <input
              placeholder="Store Name"
              name="storename"
              className="input_field_outline"
              onChange={(e) => setStoreName(e.target.value)}
            />

            <input
              placeholder="Store Address"
              name="storeaddress"
              className="input_field_outline"
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <input
              placeholder="City"
              name="city"
              className="input_field_outline"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              name="state"
              className="input_field_outline"
              onChange={(e) => setState(e.target.value)}
            />
            <input
              placeholder="Pin Code"
              name="pincode"
              className="input_field_outline"
              onChange={(e) => setPinCode(e.target.value)}
            />
            <input
              placeholder="Email Address"
              name="email"
              className="input_field_outline"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              placeholder="Mobile Number (Registered on WhatsApp)"
              name="mobile"
              className="input_field_outline"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button type="submit" className="outline-bgwhite-button">
              Confirm
            </button>
          </form>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};

export default Stores;
