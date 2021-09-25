import React, { useRef, useCallback, useEffect } from "react";
import { toJpeg } from "html-to-image";
import { useDispatch, useSelector } from "react-redux";
import {
  FindStoreByIdAction,
  UploadUserEmailTemplateAction,
} from "../Actions/storeAction";
import { useHistory } from "react-router-dom";
import addressImage from "../images/Address.png";

import emailImage from "../images/Email.png";

import phoneImage from "../images/Phone.png";
import { toast } from "react-toastify";

const Preview = () => {
  const dispatch = useDispatch();
  const storeId = localStorage.getItem("storeId");
  const ref = useRef(null);
  const Store = useSelector((state) => state.findStoreByIdReducer);
  useSelector((state) => state.uploadCreatedImageReducer);
  const { stores } = Store;
  const blankImage = localStorage.getItem("blankImage");
  const cropperImage = localStorage.getItem("cropperImage");

  const history = useHistory();
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        pending: "uploading your Template",
      },
      { position: "top-center", autoClose: 10000 }
    );

    toJpeg(ref.current, {
      cacheBust: true,
      imagePlaceholder: true,
      backgroundColor: "#ffffff",
    })
      .then(function (dataUrl) {
        dispatch(UploadUserEmailTemplateAction(dataUrl, history));
      })

      .catch((error) => {
        console.log(error);
      });
  }, [ref]);

  const handleOnReset = () => {
    localStorage.removeItem("cropperImage");
    localStorage.removeItem("storeId");
    history.push("/edit");
  };

  useEffect(() => {
    if (!storeId || !cropperImage) {
      history.push("/edit");
    }
    dispatch(FindStoreByIdAction(storeId));
  }, [dispatch]);

  return (
    <div>
      <div className="text-center">
        <text className="step_red_button">STEP 2</text>
      </div>
      <h1>CONFIRM YOUR DETAILS</h1>

      <div className="container">
        <div className="row jcc mt-3 ">
          <div className="col-md-8 ">
            <div
              ref={ref}
              className="img_container"
              style={{ position: "relative" }}
              id="capture"
            >
              <img className="w-100 blankImage" alt="dfsf" src={blankImage} />
              <div className="prev-cropper_img">
                <div className="main_cropperImage">
                  <img
                    className="cropperImage"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      top: "0",
                      marginTop: "auto",
                      marginBottom: "auto",
                      left: "50%",
                      transform: " translate(-50%, -50%)",
                    }}
                    alt=""
                    src={cropperImage}
                  />
                </div>
                <div
                  className="d-flex jcc bod"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div>
                    <img
                      src={addressImage}
                      alt=""
                      style={{
                        width: 15,
                        marginRight: 5,
                        marginBottom: 5,
                      }}
                    />
                    <small className="pretxt">
                      {stores.store_address} {stores.state}
                      {stores.city} {stores.pin_code} :
                    </small>
                  </div>
                  <div className="bod">
                    <img
                      src={emailImage}
                      alt=""
                      style={{
                        width: 24,
                        marginRight: 5,
                        marginBottom: 1,
                        marginLeft: 5,
                      }}
                    />
                    <text className="pretxt"> {stores.email_address} : </text>
                  </div>
                  <div className="bod">
                    <img
                      src={phoneImage}
                      alt=""
                      style={{
                        width: 16,
                        marginRight: 1,
                        marginBottom: 3,
                        marginLeft: 3,
                      }}
                    />
                    <text className="pretxt"> {stores.mobile_number}</text>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="spacer"></div>
        <div className="row jcc ">
          <div className="col-md-7">
            <div className="row jcc aic mb-3 ">
              <div className="col-6 txtr">
                <button onClick={handleOnReset} className="raybtnn">
                  Reset
                </button>
              </div>
              <div className="col-6 txtl">
                <button onClick={onButtonClick} className="raybtn">
                  confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
