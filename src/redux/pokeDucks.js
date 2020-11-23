import axios from 'axios'

// contantes
const dataInicial = {
    array: [],
    offset: 0 // el offset tiene su estado inicial en 0, incrementara en 20 en 20 despues.
}


// types
const GET_POKEMON_EXITO = 'GET_POKEMON_EXITO'
const NEXT_POKEMON_EXITO = 'NEXT_POKEMON_EXITO'

// reducer
export default function pokeReducer(state = dataInicial, action){
    // Switch leera la accion (axios(getPokemonAction)), luego el type((GET_POKEMON_EXITO)) y luego genera un switch case
    switch(action.type) {
        // Si el caso del type es EXITO
       case GET_POKEMON_EXITO:
           // Copiar el state con su data inicial (array), luego igualar ese array con action.payload
           return {...state, array: action.payload} // Acción que modifica el state
           // Al obtener exitosamente el objeto de getPokemonAction, la dataInicial se llenara con esos datos (payload)
        case NEXT_POKEMON_EXITO: // En caso de dar siguiente..
            return {...state, array: action.payload.array, offset: action.payload.offset} // Sera el state modificado y el array modificado (lo tiene el payload)

        default:
            return state // retornar el state inicial / modificado, en caso de no enviarle un type
        }
}
// acciones
export const getPokemonAction = () => async (dispatch, getState) => {
    // console.log('getState', getState().pokemones.offset) // Accede a los datos iniciales de pokemones (array vacio)
    const offset = getState().pokemones.offset
    try {
        // Intenta la llamada a la API
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)

        // axios genera la data en res.data + la propiedad que queremos leer (results)
        dispatch({
            type: GET_POKEMON_EXITO,
            payload: res.data.results // Lista que contiene los resultados (objeto)
        })
    } catch (error) {
        console.log(error)
    }
}
    // En cada acción de 'getPokemonAcion' tambien se disparara esta función para que cambie dinamicamente el valor de offset de 20 en 20
export const nextPokemonAction = () => async (dispatch, getState) => {
    const offset = getState().pokemones.offset // offstate es 0
    const next = offset + 20

    try {
        const  res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`)
        dispatch({
            type: NEXT_POKEMON_EXITO,
            payload: { // Envia en el payload tanto los datos del fetch, como el offset modificado (valor de 20 en 20)
                array: res.data.results, // Resultados a partir del 20
                offset: next
            }
        })
    } catch (error) {
        console.log(error)

    }
}
