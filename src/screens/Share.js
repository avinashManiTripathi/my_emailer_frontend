import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SendStoreImageToEmail,
  SendStoreImageToWhatsApp,
} from "../Actions/storeAction";
import { findUserId } from "../Helper/auth-header";
import { toast } from "react-toastify";

toast.configure();
const Share = (props) => {
  const dispatch = useDispatch();

  useSelector((state) => state.sendImageToWhatsAppReducers);
  useSelector((state) => state.sendImageToEmailReducers);

  const [whatsappInput, setWhatsInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const onClickSendEmail = (e) => {
    e.preventDefault();
    if (
      emailInput != null &&
      emailInput.includes("@") &&
      emailInput.includes(".") &&
      emailInput.trim().length > 5
    ) {
      dispatch(SendStoreImageToEmail(emailInput));
    } else {
      toast.error("please enter valid email");
    }
  };

  const onClickSendWhatsApp = (e) => {
    e.preventDefault();
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (whatsappInput.match(phoneno) && whatsappInput.trim().length === 10) {
      dispatch(SendStoreImageToWhatsApp(whatsappInput));
    } else {
      toast.error("please enter valid number");
    }
  };
  const onClickDownload = () => {
    fetch(`https://myemailer123.herokuapp.com/images/${findUserId()}.jpeg`, {
      method: "GET",
      headers: {
        "Content-Type": "application/jpeg",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `MyStoreEmailer.jpeg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  return (
    <div>
      <div className="text-center">
        <text className="step_red_button">STEP 3</text>
      </div>
      <div className="container">
        <div
          className="row "
          style={{
            justifyContent: "center",
          }}
        >
          <div className="col-md-6 txtc">
            <h1>SHARE YOUR RAY-BAN E-MAILER</h1>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row jcc">
          <div className="col-md-6 txtc">
            <div>
              <img
                className="shareImg"
                alt="dsf"
                src={`https://myemailer123.herokuapp.com/images/${findUserId()}.jpeg`}
              ></img>
            </div>
          </div>

          <div className="col-md-6 txtc">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <h1>CONGRATULATIONS!</h1>
            <h1>YOUR E-MAILER IS READY</h1>
            <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
              SHARE VIA
            </h1>
            <div className="row jcc">
              <div className="col-md-6">
                <div className="row jcc aic">
                  <div className="col-6">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "30px",
                      }}
                    >
                      <button
                        data-toggle="modal"
                        data-target="#whatsapp_modal"
                        className="share_link"
                        style={{ fontSize: "18px", marginLeft: "40px" }}
                      >
                        <img
                          src="https://myemailer123.herokuapp.com/images/WhatsApp.png"
                          alt="sddf"
                          style={{ width: "75px" }}
                        />
                        WHATSAPP
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "30px",
                      }}
                    >
                      <button
                        data-toggle="modal"
                        data-target="#email_modal"
                        className="share_link"
                        style={{ fontSize: "18px", marginRight: "40px" }}
                      >
                        <img
                          src="https://myemailer123.herokuapp.com/images/Email.png"
                          style={{ width: "75px" }}
                          alt="zff"
                        />
                        EMAIL
                      </button>
                    </div>
                  </div>
                  <div className="col-6 txtc">
                    <button
                      onClick={onClickDownload}
                      style={{ fontSize: "18px" }}
                      className="share_link"
                    >
                      <img
                        src="https://myemailer123.herokuapp.com/images/Download.png"
                        style={{ width: "75px" }}
                        alt="sg"
                      />
                      DOWNLOAD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="whatsapp_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                WhatsApp
              </h5>
            </div>

            <form onSubmit={onClickSendWhatsApp}>
              <div class="modal-body">
                <div class="col-auto">
                  <label class="sr-only" for="inlineFormInputGroup">
                    Username
                  </label>
                  <div class="input-group mb-2">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setWhatsInput(e.target.value)}
                      placeholder="Enter WhatsApp Number"
                    />
                    <div class="input-group-prepend">
                      <div class="input-group-text">WhatsApp</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="email_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Email
              </h5>
            </div>
            <form onSubmit={onClickSendEmail}>
              <div class="modal-body">
                <div class="col-auto">
                  <div class="input-group mb-2">
                    <input
                      type="email"
                      class="form-control"
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter Valid Email Address"
                    />
                    <div class="input-group-prepend">
                      <div class="input-group-text">Email</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="spacer"></div>
    </div>
  );
};

export default Share;
