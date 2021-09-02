import React from "react";

function Landing(props) {
  const redirectToSteps = () => {
    props.history.push("/steps");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 content">
            <div className=" mt-5 " style={{ float: "left" }}>
              <div style={{ float: "left", alignItems: "start" }}>
                <span className="rayfont_1"> YOU'RE</span>
                <span className="rayfont_2">ON</span>
                <span className="rayfont_3">AIR</span>{" "}
              </div>
              <div style={{ float: "left" }}>
                <p className="rayfont_p">
                  CREATE YOUR OWN{" "}
                  <span className="rayfont_p_span"> RAY-BAN </span>
                  EMAILER
                </p>
                <p className="rayfont_p" style={{ float: "left" }}>
                  IN JUST 3 EASY STEPS
                </p>
              </div>
            </div>
            <div className="">
              <button
                onClick={redirectToSteps}
                className="raybtn raylandingbtn"
                style={{ float: "left" }}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="col-md-6 landing-img">
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
}

export default Landing;
