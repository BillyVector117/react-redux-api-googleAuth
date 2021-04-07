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
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store; 
}
