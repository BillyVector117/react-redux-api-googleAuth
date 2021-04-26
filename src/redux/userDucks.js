import { auth, firebase, db, storage } from "../firebase";
// Default data
const dataInit = {
  loading: false,
  active: false,
};
// Types (action.type)
const LOADING = "LOADING";
const USER_ERROR = "USER_ERROR";
const USER_SUCCESS = "USER_SUCCESS";
const LOG_OUT_SESSION = "LOG_OUT_SESSION";

// Reducer
export default function userReducer(state = dataInit, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }; // Only 'loading' changes
      break;
    case USER_ERROR:
      return { ...dataInit }; // Ya que estara en false
      break;
    case USER_SUCCESS:
      return { ...state, loading: false, active: true, user: action.payload }; // Save credential
      break;
    case LOG_OUT_SESSION:
      return { ...dataInit }; // All data props in false (No user, no session, no loading, no active)
      break;
    default:
      return { ...state }; // Retorna el state por default
  }
}
// Actions
// #1 Action - Login
export const loginUserAction = () => async (dispatch, getState) => {
  // 'loading' turns True, until this action finishes
  dispatch({
    type: LOADING,
  });
  try {
    // Google Authentication pop-up
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);
    // console.log(res) // Then we can access to uder credentials
    const user = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    // Try searching the user through E-mail
    const dbUser = await db.collection("users").doc(user.email).get();
    console.group("User found in fireStore: ");
    console.log(dbUser); // boolean
    console.groupEnd();
    // Validate if user exists in database then send to payload its info.
    if (dbUser.exist) {
      dispatch({
        type: USER_SUCCESS, 
        payload: dbUser.data(),
      });
      // Save uid & email in localStorage as 'user'
      localStorage.setItem(
        "user",
        JSON.stringify(dbUser.data()) // Save user data in localStorage
      );
    }
    // If do not exists the received E-mail (user) in database, create him:
     else {
      await db.collection("user").doc(user.email).set(user);
      dispatch({
        type: USER_SUCCESS,
        payload: user, 
      });
      // Save all user data in localStorage as 'user'
      localStorage.setItem(
        "user",
        JSON.stringify(user) // Parse and save 'user' Object in localStorage
      );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ERROR,
    });
  }
};

// Action #2 Read for current user Active (return the )
export const readActiveUserAction = () => (dispatch, getState) => {
  if (localStorage.getItem("user")) {
    dispatch({
      type: USER_SUCCESS,
      payload: JSON.parse(localStorage.getItem("user")), // Mount to state the saved user info.
    });
  }
};
export const logOutUserAction = () => (dispatch, getState) => {
  auth.signOut();
  localStorage.removeItem("user");
  dispatch({
    type: LOG_OUT_SESSION,
  });
};
// Action #3  Update username
export const updateUserAction = (updatedName) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });
  const { user } = getState().user; // Access to user data (stage of user) is filled once is signed-in
  console.log(user); // Shows state values (previously provided by Google)

  try {
    // Search the user with the email in current state then and update the name with the new typed
    await db
      .collection("user")
      .doc(user.email)
      .update({ displayName: updatedName });
    // Send the same data user but with updated name
    const updateUser = {
      ...user,
      displayName: updatedName,
    };
    // Send the updated data to payload
    dispatch({
      type: USER_SUCCESS,
      payload: updateUser,
    });
    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify(updateUser) // Parse and save updated 'user' Object in localStorage
    );
  } catch (error) {
    console.log(error);
  }
};
export const changeUserPicAction = (newImage) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });

  const { user } = getState().user; // Access to user data, (provided by Google but saved in user stage) is available once is signed-in
  // console.log(user) // Show all data from FireStore (provided by Google)
  try {
    // Make an image reference (like directory), then make a new folder named 'user-email', and
    // a file-name
    const imageRef = await storage
      .ref()
      .child(user.email)
      .child("profile-user");
    await imageRef.put(newImage); // Save the new Image (func. argument) in the imageRef path with .put
    const urlImage = await imageRef.getDownloadURL(); // The way to access to url image (to change in firestore)
    // Update photoURL field from firestore (image-url)
    await db.collection("user").doc(user.email).update({ photoURL: urlImage });
    const updateUser = {
      ...user,
      photoURL: urlImage,
    };
    dispatch({
      type: USER_SUCCESS,
      payload: updateUser,
    });
    // Update the localStorage
    localStorage.setItem(
      "user",
      JSON.stringify(updateUser)
    );
  } catch (error) {
    console.log(error);
  }
};
