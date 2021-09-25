import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Photos } from "../components/Photos";
function Step1(props) {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState(false);

  const handleShow = (data, upload, blankImage) => {
    localStorage.setItem("step1", upload);
    localStorage.setItem("blankImage", blankImage);
    setImages(data);
    setShow(true);
  };

  const closePopUp = () => setShow(false);

  return (
    <div>
      {show ? (
        <div className="ReactModalPortal">
          <div
            className="ReactModal__Overlay ReactModal__Overlay--after-open"
            style={{
              position: "fixed",
              inset: "0px",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            }}
          >
            <div
              className="ReactModal__Content_ReactModal"
              tabindex="-1"
              role="dialog"
              aria-modal="true"
            >
              <text
                onClick={closePopUp}
                style={{
                  fontSize: "20px",
                  alignSelf: "flex-end",
                  fontFamily: "Lato-Regular",
                }}
              >
                Close X
              </text>
              <text className="step_red_button">STEP 1</text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={images}
                  style={{
                    width: "100%",
                    height: "100%",
                    marginTop: "27px",
                    boxShadow: "rgba(0, 0, 0, 0.75) 0px 3px 24px -5px",
                  }}
                  alt=""
                />
              </div>

              <Link to="/edit" className=" redirectLink">
                Select
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <text className="step_red_button">STEP 1</text>
          <h1>CHOOSE FROM OUR TEMPLATES</h1>
          <div>
            <div className="container imgRow ">
              {Photos.map((data) => {
                return (
                  <div
                    style={{
                      margin: "10px",
                      boxShadow: " rgba(0, 0, 0, 0.48) -18px 18px 41px -3px",
                    }}
                  >
                    <img
                      src={data.Image}
                      height="auto"
                      width="100%"
                      alt="step1"
                      className="step1_image"
                      onClick={() =>
                        handleShow(
                          data.Image,
                          data.uploadImage,
                          data.blankImage
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="red_outline_Button">CLICK TO OPEN</button>
        </div>
      )}
    </div>
  );
}
export default Step1;
