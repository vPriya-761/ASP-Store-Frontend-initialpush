import React, { Fragment } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthPopUp = ({
  toggleDialog,
  showLogin,
  showSignUp,
  toggleLogin,
  toggleSignUp,
}) => {
  return (
    <Fragment>
      {showLogin === true && (
        <Login
          toggleDialog={toggleDialog}
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
        />
      )}
      {showSignUp === true && (
        <Signup
          toggleDialog={toggleDialog}
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
        />
      )}
    </Fragment>
  );
};

export default AuthPopUp;
