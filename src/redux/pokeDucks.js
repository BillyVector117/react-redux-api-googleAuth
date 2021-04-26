import axios from "axios";

<<<<<<< HEAD
// CONSTANTES (Contains response-API Structure to get easily control in state props)
const dataInit = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
// ACTIONS
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS";
const NEXT_POKEMONS_SUCCESS = "NEXT_POKEMONS_SUCCESS";
const POKE_INFO_SUCCESS = "POKE_INFO_SUCCESS";

// REDUCER (Always return a modified dataInit (state))
// This exported function contains the empty dataInit, and it will change with an 'action' execute (switch)
export default function pokeReducer(state = dataInit, action) {
  // Depending on the type in each Dispatch (In actions / functions) is the action.type to execute.
  switch (action.type) {
    case GET_POKEMONS_SUCCESS:
      return { ...state, ...action.payload }; // action.payload is the API response 
    case NEXT_POKEMONS_SUCCESS:
      return {
        ...state, 
        ...action.payload, // + 20 items from payload res
      };
    case POKE_INFO_SUCCESS:
      return { ...state, PokeProperty: action.payload }; // PokeProperty will be 4 properties key-value in 'getDetail()' action
    // En el caso de que no pueda leer un state o no exista
    default:
      return state;
  }
}
// ACTIONS (API call)
// If an action needs a param it will receive in the first arrow function
// dispatch() allows to active a specific action to execute its Switch-case
export const getPokemonsAction = () => async (dispatch, getState) => {
  // console.log('getState: ', getState().pokemones.offset) // getState() Allows to access any Reducers (in this case 'pokemones', that is defined at store.js)
  // const offset = getState().pokemones.offset; // Access to default state property data (offset) of pokemones
  // Try searching for "offset=0" key item (Name and content) in LocalStorage
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem("offset=0")), // JSON to JS-Object
    });
    console.log("getting data from localStorage");
    return;
  }
  try {
    // API call (return an Item-List)
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
    );
    // console.log(res.data);
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: res.data,
    });
    // Save into LocalStorage API-Response
    localStorage.setItem("offset=0", JSON.stringify(res.data)); // JSON to String
    console.log("getting data from Poke API");
  } catch (error) {
    console.log(error);
  }
};
// Action #2 - Next Button ('number' is optional param, the second way is set offset property (from initialState) +20 for each execution)
export const nextPokemonsAction = (number) => async (dispatch, getState) => {
  // console.log('getState: ', getState().pokemones.offset) // Store 'offset' value
  // const offset = getState().pokemones.offset; // Access to 'offset' property (default value: 0)
  // const next = offset + number; // Offset increase +20 or the params equivalent
  const next = getState().pokemones.next; // 'next' property contains the next offset (URL for next 20 items), this property is generate when API is executed

  // Try searching in LocalStorage the 'next' item key (URL with content)
  if (localStorage.getItem(next)) {
    dispatch({
      type: NEXT_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem(next)), // STRING to JSON
    });
    console.log("next page using localStorage!");
    return;
  }
  try {
    // API call
    const res = await axios.get(`${next}`); // 'next' is saved at initialData because getPokemonsAction() fill the state in the first API call (next is an URL)
    console.log(res.data); // Contains all 20 items
    dispatch({
      type: NEXT_POKEMONS_SUCCESS,
      payload: res.data,
    });
    // The new localStorage item key will name as the COMPLETE URL (next) with URL as value
    localStorage.setItem(next, JSON.stringify(res.data)); // JSON to STRING (localStorage just supports String format)
    console.log("next data from POKE API!");
  } catch (error) {
    console.log(error);
  }
};
// Action #3 - Previous button
export const previousPokemonsAction = () => async (dispatch, getState) => {
  const previous = getState().pokemones.previous; // Access to 'previous' property of the stage ('previous' contains a URL)
  // Try searching 'previous' (URL with content) item in localStorage 
  if (localStorage.getItem(previous)) {
    dispatch({
      type: NEXT_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem(previous)), // STRING to JSON
    });
    console.log("previous page using localStorage!");
    return;
  }
  try {
    // API call
    const res = await axios.get(`${previous}`); // 'previous' is saved in initialData because 'getPokemonsAction()' / other action filled the state in the first API call (previous is an URL)
    dispatch({
      type: NEXT_POKEMONS_SUCCESS,
      payload: res.data,
    });
    // The new localStorage item key will name as the COMPLETE URL (previous) with URL as value
    localStorage.setItem(previous, JSON.stringify(res.data));
    console.log("previous data from POKE API!");
=======
// CONSTANTS
const dataInicial = {
  array: [],
  offset: 0, // Will increase +20 for each nextPokemonAction() call
  ready: false
};

// TYPES (Specific name)
const GET_POKEMON_EXITO = "GET_POKEMON_EXITO";
const NEXT_POKEMON_EXITO = "NEXT_POKEMON_EXITO";

// REDUCERS
export default function pokeReducer(state = dataInicial, action) {
  // Depending on Dispatch() Action type is the result case to execute
  switch (action.type) {
    case GET_POKEMON_EXITO:
      // Success case: Copy 'state' adding payload result (axios-data)
      return { ...state, array: action.payload }; // Modifying 'dataInicial' state
    case NEXT_POKEMON_EXITO: // En caso de dar siguiente..
      return {
        ...state,
        array: action.payload.array,
        offset: action.payload.offset,
        ready: true
      }; // Sera el state modificado y el array modificado (lo tiene el payload)

    default:
      return state; // retornar el state inicial / modificado, en caso de no enviarle un type
  }
}

// ACTIONS (Two functions in each Action in case needs a params (in first function))
export const getPokemonAction = () => async (dispatch, getState) => {
  // console.log('getState', getState().pokemones.offset) // Accede a los datos iniciales de pokemones (array vacio)
  const offset = getState().pokemones.offset;
  // API Call
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    // Set and send data to REDUCER case, 'payload' contains the Data-array ('results')
    dispatch({
      type: GET_POKEMON_EXITO,
      payload: res.data.results, // Axios Data is saved as res.data.results ()
    });
>>>>>>> 5649a24db8bc6b3e2cfc5d0e2ccad4dec3a57dd3
  } catch (error) {
    console.log(error);
  }
};
<<<<<<< HEAD
// Action #4 - Detail item (Contains an default url as first param)
export const pokeDetailAction = (
  url = "https://pokeapi.co/api/v2/pokemon/1/"
) => async (dispatch, getState) => {
  /* // In the first app view, the url is empty, then there is not an +Info Poke,
  If this action does not receive an 'url', then set up one by default
  if (url === undefined) {
    url = 'https://pokeapi.co/api/v2/pokemon/1/'
  } */
  // Search if 'url' key exists in LocalStorage
  if (localStorage.getItem(url)) {
    dispatch({
      type: POKE_INFO_SUCCESS,
      // Payload: Get specific info. from localStorage
      payload: JSON.parse(localStorage.getItem(url)),
    });
    console.log("getting infoPoke using localStorage!");
    return;
  }
  try {
    const res = await axios.get(url);
    console.log(res.data);
    dispatch({
      type: POKE_INFO_SUCCESS,
      // Payload: Get specific info. from axios request, 'res.data' contains +10 properties, only extract 4 from there
      payload: {
        name: res.data.name,
        weight: res.data.weight,
        height: res.data.height,
        sprites: res.data.sprites.front_default, // Image
      },
    });
    const toLocal = {
      name: res.data.name,
      weight: res.data.weight,
      height: res.data.height,
      sprites: res.data.sprites.front_default,
    };
    // Set the current res.data to localStorage with the 'url' as key
    localStorage.setItem(url, JSON.stringify(toLocal));
    console.log("getting infoPoke from API");
=======
//
export const nextPokemonAction = () => async (dispatch, getState) => {
  // 'offset' key starts in 0
  const offset = getState().pokemones.offset; // 'pokemones' refers to dataInitial
  const next = offset + 20;

  try {
    // API Call
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`
    );
    dispatch({
      type: NEXT_POKEMON_EXITO,
      // Send to Reducer case the axios-result (next 20 items) and the new offset value
      payload: {
        array: res.data.results, // res.data.results is an array
        offset: next,
      },
    });
>>>>>>> 5649a24db8bc6b3e2cfc5d0e2ccad4dec3a57dd3
  } catch (error) {
    console.log(error);
  }
};
