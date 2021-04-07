import axios from "axios";

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
  } catch (error) {
    console.log(error);
  }
};
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
  } catch (error) {
    console.log(error);
  }
};
