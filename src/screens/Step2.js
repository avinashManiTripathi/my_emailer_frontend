import Axios from "axios";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { toJpeg } from "html-to-image";
import authHeader from "../Helper/auth-header";
import { useDispatch, useSelector } from "react-redux";
import { FindStoreByIdAction } from "../Actions/storeAction";
import { auto } from "@popperjs/core";

function Step2(props) {
  const dispatch = useDispatch();
  const storeId = localStorage.getItem("storeId");
  const ref = useRef(null);
  const Store = useSelector((state) => state.findStoreByIdReducer);
  const { stores } = Store;
  const blankImage = localStorage.getItem("blankImage");
  const cropperImage = localStorage.getItem("cropperImage");
  const [uploadStatus, setUploadStatus] = useState(false);
  const onButtonClick = useCallback(() => {
    setUploadStatus(true);
    if (ref.current === null) {
      return;
    }
    toJpeg(ref.current, {
      cacheBust: true,
      imagePlaceholder: true,
      backgroundColor: "#ffffff",
    })
      .then(function (dataUrl) {
        Axios.post(
          "https://myemailer123.herokuapp.com/data",
          {
            dataUrl,
          },
          {
            headers: authHeader(),
          }
        )
          .then((response) => {
            console.log("response" + response);
            setUploadStatus(false);
            props.history.push("/share");
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.log("error" + error);
      });
  }, [ref]);

  useEffect(() => {
    dispatch(FindStoreByIdAction(storeId));
  }, [dispatch]);

  console.log("uploadStatus" + uploadStatus);

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
                      marginTop: auto,
                      marginBottom: auto,
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
                    marginLeft: auto,
                    marginRight: auto,
                  }}
                >
                  <div className="m-1 bod">
                    <img
                      src="https://myemailer.in/static/media/Address.85649ac7.png"
                      className="pretxt_icon"
                      alt=""
                    />
                    <small className="pretxt">
                      {stores.store_address} {stores.state}
                      {stores.city} {stores.pin_code}
                    </small>
                  </div>
                  <div className="m-1">
                    <img
                      src="https://myemailer.in/static/media/Email.bac40766.png"
                      className="pretxt_icon"
                      alt=""
                    />
                    <text className="pretxt">{stores.email_address}</text>
                  </div>
                  <div className="m-1">
                    <img
                      alt=""
                      src="https://myemailer.in/static/media/Phone.436f0e91.png"
                      className="pretxt_icon"
                    />
                    <text className="pretxt">{stores.mobile_number}</text>
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
            <div className="row jcc aic">
              <div className="col-6 txtr">
                <button className="raybtnn">Reset</button>
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
}

export default Step2;
