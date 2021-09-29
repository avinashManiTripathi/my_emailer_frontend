import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

function Navbar(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const location = useLocation();

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push("/signin");
  };

  return (
    <div>
      <div className="sc-cTJkRt lmGFyU">
        <img
          alt=""
          // src="https://myemailer123.herokuapp.com/images/RBB.png"
          className="sc-efHYUO cFSLxQ"
        />
        {user ? (
          <>
            <div
              type="button"
              class="link"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              My Account
            </div>
            <div class="dropdown-menu dropdown-menu-right">
              <Link class="dropdown-item" onClick={handleLogoutClick}>
                Logout
              </Link>
            </div>
          </>
        ) : location.pathname === "/SignUp" ||
          location.pathname === "/signUp" ||
          location.pathname === "/signup" ? (
          <Link to="/SignIn" className=" link">
            Sign In
          </Link>
        ) : (
          <Link to="/SignUp" className="link">
            Sign Up{" "}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
