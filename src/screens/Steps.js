import React from "react";
import { useHistory } from "react-router-dom";

const Steps = (props) => {
  const history = useHistory();

  const redirectToForm = () => {
    history.push("/stores");
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="txtc">
              <text className="step_red_button">Step 1</text>
              <h1>CHOOSE FROM OUR TEMPLATES</h1>
              <img
                src="https://myemailer123.herokuapp.com/images/Step-1.png"
                alt=""
                className="img-fluid "
              />
            </div>
          </div>
          <div className="col-md-4 txtc">
            <text className="step_red_button">step 2</text>
            <h1>UPLOAD YOUR DETAILS</h1>
            <img
              src="https://myemailer123.herokuapp.com/images/Step-2.png"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-4 txtc">
            <text className="step_red_button">step 3</text>
            <h1 className="black_style_text">SHARE WITH YOUR CUSTOMERS</h1>
            <img
              src="https://myemailer123.herokuapp.com/images/Step-3.png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col txtc">
            <button
              onClick={redirectToForm}
              className="sc-iklJeh hbusih lgtextbtn"
            >
              START NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
