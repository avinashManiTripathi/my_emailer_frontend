import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { UpdateStoreByIdAction } from "../Actions/storeAction";
import authHeader from "../Helper/auth-header";

import { toast } from "react-toastify";

toast.configure();
const UpdateStore = (props) => {
  const [store, setStore] = useState({
    _id: "",
    store_name: "",
    store_address: "",
    city: "",
    state: "",
    pin_code: "",
    email_address: "",
    mobile_number: "",
  });

  const history = useHistory();
  let { id } = useParams();

  const dispatch = useDispatch();

  const {
    _id,
    store_name,
    store_address,
    city,
    state,
    pin_code,
    email_address,
    mobile_number,
  } = store;

  const onInputChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const loadStore = async () => {
    try {
      await Axios.get(`https://myemailer123.herokuapp.com/api/store/${id}`, {
        headers: authHeader(),
      }).then((response) => {
        setStore({
          _id: response.data._id,
          store_name: response.data.store_name,
          store_address: response.data.store_address,
          city: response.data.city,
          state: response.data.state,
          pin_code: response.data.pin_code,
          email_address: response.data.email_address,
          mobile_number: response.data.mobile_number,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreOnSubmit = async (e) => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      dispatch(UpdateStoreByIdAction(store, history));
    }
  };

  const formValidation = () => {
    let isValid = true;

    if (
      store.store_name == null ||
      store.mobile_number == null ||
      store.store_address == null ||
      store.email_address == null ||
      store.state == null ||
      store.city == null ||
      store.pin_code == null
    ) {
      toast("* Plese Enter All Fields ");
      isValid = false;
    }

    if (store.email_address != null && !store.email_address.includes("@")) {
      toast.error("Plese Enter Valid Email Address");
      isValid = false;
    }

    if (store.mobile_number != null && store.mobile_number.trim().length < 10) {
      toast.error("Please Enter Valid Phone");
      isValid = false;
    }

    if (store.mobile_number != null && store.mobile_number.trim().length > 10) {
      toast.error("Please Enter Valid Phone");
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    loadStore();
  }, []);

  return (
    <div>
      <div className="container d-flex justify-content-center">
        <form className="col-md-5" onSubmit={handleStoreOnSubmit}>
          <h1>
            Please enter your details <br />
            All fields are mandatory.
          </h1>

          <input
            placeholder="Store Name"
            name="store_name"
            value={store_name}
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />
          <input
            placeholder="Store Address"
            name="store_address"
            value={store_address}
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />
          <input
            placeholder="City"
            name="city"
            value={city}
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />
          <input
            placeholder="State"
            name="state"
            value={state}
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />
          <input
            placeholder="Pin Code"
            name="pin_code"
            pattern="[0-9]{6}"
            value={pin_code}
            size="6"
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />
          <input
            placeholder="Email Address"
            name="email_address"
            value={email_address}
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />
          <input
            placeholder="Mobile Number (Registered on WhatsApp)"
            name="mobile_number"
            value={mobile_number}
            pattern="[789][0-9]{9}"
            size="10"
            className="input_field_outline"
            onChange={(e) => onInputChange(e)}
          />

          <button type="submit" className="outline-bgwhite-button">
            Update
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default UpdateStore;
