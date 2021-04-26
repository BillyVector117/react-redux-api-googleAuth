<<<<<<< HEAD
// This module combines all Reducers (Ducks Files)
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Allows to use promises
import pokeReducer from "./pokeDucks";
import userReducer, {readActiveUserAction} from './userDucks'
// Combine all reducers files
const rootReducer = combineReducers({
  // Set a global name for each reducer file
  pokemones: pokeReducer,
  user: userReducer
  // Another reducer here...
});

// Redux DevTools Config (Extension)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function generateStore() {
  // Middleware config
  // Create store with all combined reducers and extension receive a middleware (thunks) to use promises
=======
// Here all Ducks modules are mixed to use in any component
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Allows to use Promises
// Call pokeDucks REDUCER (Add more Reducers if exist)
import pokeReducer from "./pokeDucks";

// Import all REDUCERS() of each Duck files
const rootReducer = combineReducers({
  // 'pokemones' is the name to access 'pokeReducer' Reducer method through Frontend, and can be access thorugh any component
  pokemones: pokeReducer, // pokeReducer contains the main state (data captures with axios), depending Switch-case
});

// Redux extension config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Generate and export Store module (contains all Reducers)
export default function generateStore() {
>>>>>>> 5649a24db8bc6b3e2cfc5d0e2ccad4dec3a57dd3
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
<<<<<<< HEAD
  // Doble '()' ya que en el 2do. se ejecuta el dispatch
  readActiveUserAction()(store.dispatch) // Iniciar la lectura de un usuario al cargar la aplicación
  return store;
=======
  return store; 
>>>>>>> 5649a24db8bc6b3e2cfc5d0e2ccad4dec3a57dd3
}
