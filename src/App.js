import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Pokemones from "./components/Pokemones";
import Profile from "./components/Profile";
import { auth } from "./firebase";

function App() {
  const [firebaseUser, setfirebaseUser] = React.useState(false);
  // Check if user exists
  React.useEffect(() => {
    const fetchUser = () => {
      // Check for user changes
      auth.onAuthStateChanged((user) => {
        console.group('Backend: AuthStateChanged')
        console.log('active user: ',user);
        console.groupEnd()
        if (user) {
          setfirebaseUser(user);
        } else {
          setfirebaseUser(null);
        }
      });
    };
    fetchUser();
  }, [])
  // Function to protect routes (Works like Hook)
  const PrivateRout = ({ component, path, ...rest }) => {
    // Check for existing current user in LocalStorage (active), the user is saved at localStorage once is login in loginUserAction()
    if (localStorage.getItem("user")) {
      const userStorage = JSON.parse(localStorage.getItem("user")); // STRING to JSON
      if (userStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to="/login" {...rest} />;
      }
    } else {
      // Error case: No found user
      return <Redirect to="/login" {...rest} />;
    }
  };
  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar />
        <Switch>
          <PrivateRout component={Pokemones} path="/" exact />
          <PrivateRout component={Profile} path="/profile" exact />

          <Route component={Login} path="/login" />
        </Switch>
      </div>
    </Router>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
