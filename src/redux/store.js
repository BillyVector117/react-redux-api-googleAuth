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
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // Doble '()' ya que en el 2do. se ejecuta el dispatch
  readActiveUserAction()(store.dispatch) // Iniciar la lectura de un usuario al cargar la aplicación
  return store;
}
