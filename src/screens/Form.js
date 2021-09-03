import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddStore } from "../Actions/storeAction";

const Form = (props) => {
  const [storeName, setStoreName] = useState();
  const [storeAddress, setStoreAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pinCode, setPinCode] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  const [validationError, setValidationError] = useState();

  const AddStores = useSelector((state) => state.addstore);
  const { loading, error } = AddStores;

  console.log(`loading == ${loading} error = ${error}`);

  const datas = localStorage.getItem("user");
  console.log("datat dfd" + datas);

  const redirectToStores = () => {
    props.history.push("/stores");
  };

  const dispatch = useDispatch();

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
      props.history.push("/stores");
    }
    props.history.push("/form");
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
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="container d-flex justify-content-center">
          <form className="col-md-5" onSubmit={handleStoreOnSubmit}>
            <h1>
              Please enter your details <br />
              All fields are mandatory.
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
            <button
              onClick={redirectToStores}
              className="outline-bgwhite-button"
            >
              See Stores
            </button>
          </form>

          <div></div>
        </div>
      )}
    </div>
  );
};

export default Form;
