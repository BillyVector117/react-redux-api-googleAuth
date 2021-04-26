import React from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom"; // Allows to redirect
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
import { logOutUserAction } from "../redux/userDucks"; // Action

const Navbar = (props) => {
  const active = useSelector((store) => store.user.active); // Access to 'active' user  propery, to know if exist a current user (boolean)
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutUserAction()); // logOutUserAction() action allows to kill the session
    props.history.push("/login"); 
  };
  return (
    <div className="navbar navbar-light bg-light border border-info">
      <Link className="navbar-brand" to="/">
        REDUX APP
      </Link>
      {active ? (
        <div className="d-flex">
          <NavLink className="btn btn-dark mr-2" to="/" exact>
            Home
          </NavLink>
          <NavLink className="btn btn-dark mr-2" to="/profile" exact>
            Profile
          </NavLink>
          <button onClick={() => logOut()} className="btn btn-dark mr-2">
            Log out
          </button>
        </div>
      ) : (
        <NavLink className="btn btn-dark mr-2" to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default withRouter(Navbar);
