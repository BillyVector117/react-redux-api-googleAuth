import axios from "axios";

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
  } catch (error) {
    console.log(error);
  }
};
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
  } catch (error) {
    console.log(error);
  }
};
