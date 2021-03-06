import React from "react";
<<<<<<< HEAD
//  useDispach() executes an action, useSelector() reads the reducer STATE
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
// Import all actions from a duck module (pokeDucks)
import {
  getPokemonsAction,
  nextPokemonsAction,
  previousPokemonsAction,
  pokeDetailAction,
} from "../redux/pokeDucks";
import Detail from "./Detail"; // Component
export const Pokemones = () => {
  const dispatch = useDispatch();

  // useSelecto() capures three properties of pokemones reducer STATE (results, next, previous)
  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  console.log(pokemones); // Store axios Data (20 items)
  console.log(next); // Next 20 items
  console.log(previous); // Previous 20 items

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Poke List using axios/Redux</h3>
        {/* 'dispatch()' executes the imported action*/}
        <div className="d-flex justify-content-between">
          {
            // Only show this button if pokemones (state) is empty
            pokemones.length === 0 && (
              <button
                className="btn btn-success"
                onClick={() => dispatch(getPokemonsAction())}
              >
                Get Poke
              </button>
            )
          }
          {
            // Once executed getPokemonsAction() previous will store its info. then 'previous' is true
            previous && (
              <button
                className="btn btn-dark btn-sm "
                onClick={() => dispatch(previousPokemonsAction())}
              >
                Previous
              </button>
            )
          }
          {
            // Once executed getPokemonsAction() previous will store its info. then 'next' is true
            next && (
              <button
                className="btn btn-info"
                onClick={() => dispatch(nextPokemonsAction(20))}
              >
                Next
              </button>
            )
          }
        </div>
        <ul className="list-group mt-3">
          {/* pokemones contains full data once getPokemonsAction() or another actions is called, dispatch(pokeDetailAction() is execute to get details info in state*/}
          {pokemones.map((pokemon) => (
            <li key={pokemon.name} className="list-group-item text-uppercase">
              {pokemon.name}
              <button
                className="btn btn-primary btn-sm float-right"
                onClick={() => dispatch(pokeDetailAction(pokemon.url))}
              >
                +Info
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h3>Poke properties</h3>
        <Detail />
      </div>
    </div>
  );
};

=======
import { getPokemonAction, nextPokemonAction } from "../redux/pokeDucks";
// react-redux Hooks, useDispach() Executes 'Actions', useSelector() Reads final array/ results (main state) generated by dispatch() methods (Actions)
import { useDispatch, useSelector } from "react-redux";

export const Pokemones = () => {
  const dispatch = useDispatch(); // Initialize dispatch()
  // useSelector() access to store.js 'rootReducer' (contains all reducers (results) and get 'pokemones' reducer RESULT)
  const pokemones = useSelector((store) => store.pokemones.array);
    const ready = useSelector((store) => store.pokemones.ready);

   console.log(ready) // data in Array-format (20 items)

  return (
    <div className="container">
      <h1>Poke List using Redux to global variables and Axios to get Data</h1>
      {/* Execute Actions with dispatch()*/}
      { !ready ? (
        <button
          className="btn btn-warning p-3 m-2"
          onClick={() => dispatch(getPokemonAction())}
        >
          Get Poke
        </button>
      ) : null }
      <button
        className="btn btn-secondary p-3"
        onClick={() => dispatch(nextPokemonAction())}
      >
        Next Poke (20)
      </button>

      <ul>
        {/* Iterate data captured by useSelector() thorugh dispatch() method */}
        {pokemones.map((pokemon) => (
          <li key={pokemon.name}> {pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

>>>>>>> 5649a24db8bc6b3e2cfc5d0e2ccad4dec3a57dd3
export default Pokemones;
