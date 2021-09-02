import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DeleteStoreByIdAction, findAllStores } from "../Actions/storeAction";
import Loader from "../components/Loader";

function Stores(props) {
  const FindStores = useSelector((state) => state.findStoreReducer);
  const { loading, error, data } = FindStores;

  const dispatch = useDispatch();

  const redirectToStepOne = () => {
    props.history.push("/step1");
  };

  const redirectToAddStore = () => {
    props.history.push("/form");
  };

  const handleStoreDelete = (id) => {
    dispatch(DeleteStoreByIdAction(id));
  };

  useEffect(() => {
    dispatch(findAllStores());
  }, [dispatch]);

  let count = 1;
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div className="container">
          {data
            ? data.map((store) => {
                return (
                  <div className="stores">
                    <form className="stores_form">Store {count++}</form>
                    <div className="stores_data">
                      <p>{store.store_name}</p>
                      <p></p>
                      <p>{store.city}</p>
                      <p>{store.pin_code}</p>
                      <p>{store.email_address}</p>
                      <p>{store.mobile_number}</p>
                    </div>
                    <div
                      className="d-flex float-right"
                      style={{ position: "absolute", right: 10, bottom: 10 }}
                    >
                      <button
                        className="btn m-1"
                        style={{ background: "rgb(221, 221, 221)" }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn m-1 "
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
                className="outline-bgwhite-button"
                onClick={redirectToAddStore}
              >
                Add Store
              </button>

              <button onClick={redirectToStepOne} className="danger_sm_button">
                START NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stores;
