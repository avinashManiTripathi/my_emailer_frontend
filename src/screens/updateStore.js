import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddStore, FindStoreByIdAction } from "../Actions/storeAction";

const UpdateStore = (props) => {
  const [storeName, setStoreName] = useState();
  const [storeAddress, setStoreAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pinCode, setPinCode] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  const [validationError, setValidationError] = useState();

  const findStore = useSelector((state) => state.findStoreByIdReducer);
  const { loading, stores } = findStore;

  console.log("loading == " + JSON.stringify(stores));

  console.log("stores" + stores._id);

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

  useEffect(() => {
    dispatch(FindStoreByIdAction(props.match.params.id));
  }, [dispatch]);

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
              value={stores.store_a}
              className="input_field_outline"
              onChange={(e) => setStoreName(e.target.value)}
            />
            <input
              placeholder="Store Address"
              name="storeaddress"
              value={stores.store_address}
              className="input_field_outline"
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <input
              placeholder="City"
              name="city"
              value={stores.city}
              className="input_field_outline"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              name="state"
              value={stores.state}
              className="input_field_outline"
              onChange={(e) => setState(e.target.value)}
            />
            <input
              placeholder="Pin Code"
              name="pincode"
              value={stores.pin_code}
              className="input_field_outline"
              onChange={(e) => setPinCode(e.target.value)}
            />
            <input
              placeholder="Email Address"
              name="email"
              value={stores.email_address}
              className="input_field_outline"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              placeholder="Mobile Number (Registered on WhatsApp)"
              name="mobile"
              value={stores.mobile_number}
              className="input_field_outline"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button type="submit" className="outline-bgwhite-button">
              Confirm
            </button>
          </form>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default UpdateStore;
