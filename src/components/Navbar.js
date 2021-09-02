import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <div className="sc-cTJkRt lmGFyU">
        <img
          alt=""
          src="https://myemailer123.herokuapp.com/images/RBB.png"
          className="sc-efHYUO cFSLxQ"
        />
        {user ? (
          <>
            <div className="sc-Arkif link">My Account</div>
          </>
        ) : location.pathname === "/SignUp" ||
          location.pathname === "/signUp" ||
          location.pathname === "/signup" ? (
          <Link to="/SignIn" className=" link">
            Login In
          </Link>
        ) : (
          <Link to="/SignUp" className="link">
            Register{" "}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
