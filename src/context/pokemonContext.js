import React, { useState, useEffect, createContext } from "react";

export const PokemonContext = createContext();

const PokemonState = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://pokemon-fight-project.herokuapp.com/api/pokemon"
        );
        const jsonData = await res.json();
        setPokemon(jsonData);
        console.log(jsonData);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };
    getPokemon();

    const fetchPokemonImg = async (pokemon) => {
      setLoading(true);
      let url = pokemon.url;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(prev => [...prev, { ...pokemon, img: data.sprites.other.dream_world.front_default} ])
      } catch(err) {
        console.log(err.message);
      };
      setLoading(false);
    }

    const getPokemonImg = async () => {
      setLoading(true);
      try {        
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=8");
        const data = await res.json();
        data.results.forEach(pokemon => { fetchPokemonImg(pokemon) });
        
      } catch (err) {
        console.log(err.message);
      };
      setLoading(false);
    }
    getPokemonImg();
  }, []);


  console.log(pokemon);
  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        loading,
        setLoading
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
