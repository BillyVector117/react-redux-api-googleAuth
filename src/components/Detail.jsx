import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokeDetailAction } from "../redux/pokeDucks";
const Detail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => {
      dispatch(pokeDetailAction()); // Execute the action to get InfoPoke, By default it initialize with 1rst PokeElement
    };
    fetchData();
  }, [dispatch]);
  // useSelector access to store module, then return the 'PokeProperty' prop from init (state) of 'pokemones' reducer.
  const pokemon = useSelector((store) => store.pokemones.PokeProperty); // .property returns only 'weigth, height, pic, name' as 'PokeProperty' object from payload result
  console.log(pokemon);
  // return: if pokemon exist store the Info card, else nothing
  return pokemon ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <img src={pokemon.sprites} className="img-fluid" />
        <div className="card-title text-uppercase">{pokemon.name}</div>
        <p className="card-text">
          Height: {pokemon.height} | Weight: {pokemon.weight}
        </p>
      </div>
    </div>
  ) : null;
};

export default Detail;
