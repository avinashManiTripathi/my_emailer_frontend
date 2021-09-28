import React from "react";
import { useHistory } from "react-router-dom";

const Landing = (props) => {
  const history = useHistory();

  const redirectToSteps = () => {
    history.push("/steps");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 content">
            <div className=" mt-5 float-left  ">
              <div className="rayfont_container_left mt-5 ">
                <span className="rayfont_1"> YOU'RE</span>
                <span className="rayfont_2">ON</span>
                <span className="rayfont_3">AIR</span>{" "}
              </div>
              <div className="rayfont_container_left ml-5 reduceTop">
                <p className="rayfont_p">CREATE YOUR OWN My-Emailer</p>
                <p className="rayfont_p rayfont_container_left">
                  IN JUST 3 EASY STEPS
                </p>
              </div>
            </div>
            <div className="getStart-button w-100 ">
              <button
                onClick={redirectToSteps}
                className="raylandingbtn float-left"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="col-md-6 landing-img  ">
            <img
              src="https://myemailer123.herokuapp.com/images/Laptop+Mobile.png"
              alt=""
              className="w-100 maintain-order"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
