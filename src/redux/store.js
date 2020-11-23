import { createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// En este archivo se mezclan todos los modulos de ducks para poderlos usar en los componentes


// Llamada al REDUCER de pokeDucks (o de todos los archivos que usen la métodologia ducks)
import pokeReducer from './pokeDucks'


const rootReducer = combineReducers({
    // IMPORTANT, nombre a leer en los componentes
    pokemones: pokeReducer // pokeReducer es un método que contiene el array con los datos del fetch

})

// Configuración de extensión para redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Cofnigurar store usando los modulos importados
export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))) 
    return store;
}
