import React, { useState, useEffect, createContext } from "react";

export const PokemonContext = createContext();

const PokemonState = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImg, setPokemonImg] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pokemon-fight-project.herokuapp.com/api/pokemon"
        );
        const jsonData = await response.json();
        setPokemon(jsonData);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };
    getPokemon();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
        loading,
        setLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
