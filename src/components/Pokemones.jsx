import React from 'react'

//hooks de react-redux, useDispach consume la acción y useSelector lee el array final (state principal)
import { useDispatch, useSelector} from 'react-redux'
import {getPokemonAction, nextPokemonAction} from '../redux/pokeDucks'

export const Pokemones = () => {
    const dispatch = useDispatch() // Función que consume la acción del fetch
    // Accede a las propiedades de rootReducer (mezcla de todos los reducer en 'storejs')
    const pokemones = useSelector(store => store.pokemones.array) // store.pokemones esta en el modulo store de su variable rootReducer
    console.log(pokemones) // Aqui estara el array con los datos (20 pokems)


    return (
        <div className="container">
            <h1>Poke List using fetch/Redux</h1>
            <button  onClick={() => dispatch(getPokemonAction())}> Get Poke</button>
            <button onClick={() => dispatch(nextPokemonAction())}> Next Poke "20"</button>

          <ul>
              {
                  pokemones.map(pokemon => (
                  <li key={pokemon.name}> {pokemon.name}</li>
                  ))
              }
          </ul>
        </div>
    )
}
 
export default Pokemones
