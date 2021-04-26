import React from "react";
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

export default Pokemones;
