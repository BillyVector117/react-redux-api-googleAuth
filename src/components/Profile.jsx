import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Hooks
import { updateUserAction, changeUserPicAction } from "../redux/userDucks"; // Import only two actions from userDucks reducer
const Profile = () => {
  // Access to 'user & loading' properties of user reducer (state)
  const user = useSelector((store) => store.user.user);
  const loading = useSelector((store) => store.user.loading);

  const [userName, setUserName] = useState(user.displayName); // Set the 'username' (Provided by Google) as default
  const [activateForm, setActivateForm] = useState(false); // To activate/off form to edit
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const updateUser = () => {
    // If the input value is not trim, it means there are blank spaces, then is empty
    if (!userName.trim()) {
      console.log("Empty name");
    }
    dispatch(updateUserAction(userName)); // dispatch with new userName
    setActivateForm(false); // return the edit form to false
  };
  const selectFile = (image) => {
    console.log("Image uploaded: ", image.target.files[0]);
    const userImage = image.target.files[0];
    if (userImage === undefined) {
      console.log("No selected Image");
      return;
    }
    // Validate if selected image is .png /.jpg extension
    if (userImage.type === "image/png" || userImage.type === "image/jpg") {
      dispatch(changeUserPicAction(userImage)); // Execute reducer Action setting the new Image as param
      setError(false); // No errors
    } else {
      setError(true); // Exist an error
    }
  };
  return (
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img
            type="file"
            src={user.photoURL}
            className="img-fluid rounded rounded-circle"
            alt="userImage"
            width="100px"
            style={{
              borderColor: "blue",
              border: "2px solid black",
              height: "105px",
            }}
          />
          <h5 className="card-title">Name: {user.displayName}</h5>
          <p className="card-text">E-mail: {user.email}</p>
          {/* When clicked, the modifier prop. changes to True (show another form) */}
          <button
            className="btn btn-info"
            onClick={() => setActivateForm(true)}
            disabled={activateForm}
          >
            EDIT NAME
          </button>
        </div>
        {error && (
          <div className="aler alert-warning mt-3">Only .png/.jpg files</div>
        )}
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            style={{ display: "none" }}
            onChange={(e) => selectFile(e)} // (e) is the image
            disabled={loading} // Is disabled (true) while is uploading a new image
          />
          <label
            className={
              loading
                ? "btn btn-sm btn-warning mt-2 disabled"
                : "btn btn-sm btn-warning mt-2 "
            }
            htmlFor="inputGroupFile01"
          >
            Update image
          </label>
        </div>

        {/* If loading is true.. then show spinner (bootstrap) (Loading is true in the state of its reducer, before access to this module*/}
        {loading && (
          <div className="card-body">
            <div className="spinner-grow text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Second card-form (When 'setActivateForm' changes to True, this form appears) */}
        {activateForm && (
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    /* On each type, the name will change in 'userName'state */
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => updateUser()}
                      className="btn btn-success"
                      type="button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
