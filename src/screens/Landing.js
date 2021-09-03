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
            <div className=" mt-5 float-left ">
              <div className="rayfont_container_left">
                <span className="rayfont_1"> YOU'RE</span>
                <span className="rayfont_2">ON</span>
                <span className="rayfont_3">AIR</span>{" "}
              </div>
              <div className="rayfont_container_left">
                <p className="rayfont_p">
                  CREATE YOUR OWN{" "}
                  <span className="rayfont_p_span"> RAY-BAN </span>
                  EMAILER
                </p>
                <p className="rayfont_p rayfont_container_left">
                  IN JUST 3 EASY STEPS
                </p>
              </div>
            </div>
            <div className="">
              <button
                onClick={redirectToSteps}
                className="raylandingbtn rayfont_container_left"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="col-md-6 landing-img mt-5 ">
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
