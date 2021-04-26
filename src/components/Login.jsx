import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/userDucks"; // Action
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();
  // Access to 'loading & active' property of 'user' Reducer
  const loading = useSelector((store) => store.user.loading);
  const active = useSelector((store) => store.user.active);

  console.group("loading in button");
  console.log(loading); // By default is true, once an actions is finished switch to false
  console.groupEnd();
  console.group("active user");
  console.log(active); // Changes to true once user is signed-in
  console.groupEnd();

  React.useEffect(() => {
    console.group("useEffect: active user");
    console.log(active);
    console.groupEnd();
    // Push/redirect user to Home page only if an user exists
    if (active) {
      props.history.push("/");
    }
  }, [active]);
  return (
    <div className="mt-5 text-center">
      <h3>Sign in with Google Account</h3>
      <hr />
      <button
        onClick={() => dispatch(loginUserAction())}
        className="btn btn-primary btn-sm"
        disabled={loading} // True when clicked, false once finish the process
      >
        Sign-In
      </button>
    </div>
  );
};

export default withRouter(Login);
