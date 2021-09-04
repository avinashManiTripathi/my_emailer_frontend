import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SendStoreImageToEmail,
  SendStoreImageToWhatsApp,
} from "../Actions/storeAction";
import { findUserId } from "../Helper/auth-header";

const Share = (props) => {
  const dispatch = useDispatch();

  const whatsApppStatus = useSelector(
    (state) => state.sendImageToWhatsAppReducers
  );
  const emailStatus = useSelector((state) => state.sendImageToEmailReducers);

  const { WhatsAppSuccess } = whatsApppStatus;
  const { EmailSuccess } = emailStatus;

  console.log(`whatsApppStatus` + WhatsAppSuccess);
  console.log(`Emailloading` + EmailSuccess);

  const onClickSendEmail = () => {
    dispatch(SendStoreImageToEmail(findUserId()));
  };
  const onClickSendWhatsApp = () => {
    dispatch(SendStoreImageToWhatsApp(findUserId()));
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
        link.setAttribute("download", `file.jpeg`);
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
            {WhatsAppSuccess && (
              <div class="alert alert-success" role="alert">
                Please check your WhatsApp Message sent Successfully
              </div>
            )}
            {EmailSuccess && (
              <div class="alert alert-success" role="alert">
                Please check your EmailSuccess Message sent Successfully
              </div>
            )}
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
                      <img
                        src="https://myemailer123.herokuapp.com/images/WhatsApp.png"
                        alt="sddf"
                        style={{ width: "75px", marginLeft: "40px" }}
                      />
                      <button
                        onClick={onClickSendWhatsApp}
                        className="share_link"
                        style={{ fontSize: "18px", marginLeft: "40px" }}
                      >
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
                      <img
                        src="https://myemailer123.herokuapp.com/images/Email.png"
                        style={{ width: "75px", marginRight: "40px" }}
                        alt="zff"
                      />
                      <button
                        onClick={onClickSendEmail}
                        className="share_link"
                        style={{ fontSize: "18px", marginRight: "40px" }}
                      >
                        EMAIL
                      </button>
                    </div>
                  </div>
                  <div className="col-6 txtc">
                    <img
                      src="https://myemailer123.herokuapp.com/images/Download.png"
                      style={{ width: "75px" }}
                      alt="sg"
                    ></img>

                    <button
                      onClick={onClickDownload}
                      style={{ fontSize: "18px" }}
                      className="share_link"
                    >
                      DOWNLOAD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default Share;
