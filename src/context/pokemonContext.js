import React, { useState, useEffect, createContext } from "react";

export const PokemonContext = createContext();

const PokemonState = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImg, setPokemonImg] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myPokemon, setMyPokemon] = useState();
  const [opponent, setOpponent] = useState();

  useEffect(() => {
    const getPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://pokemon-fight-project.herokuapp.com/api/pokemon"
        );
        const jsonData = await res.json();
        setPokemon(jsonData);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };
    getPokemon();
  }, []);

  useEffect(() => {
    const fetchPokemonImg = async (poke) => {
      setLoading(true);
      const { url } = poke;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonImg((prev) => [
          ...prev,
          { id: data.id, img: data.sprites.other.dream_world.front_default },
        ]);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    const getPokemonImg = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=24");
        const data = await res.json();
        data.results.forEach((poke) => {
          fetchPokemonImg(poke);
        });
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };
    getPokemonImg();
  }, []);

  useEffect(() => {
    const newArr = pokemon.map((p) => ({
      ...p,
      ...pokemonImg.find((pokeImg) => pokeImg.id === p.id),
    }));
    setPokemonData(newArr);
  }, [pokemon, pokemonImg]);

  /*   console.log(pokemonData); */

  return (
    <PokemonContext.Provider
      value={{
        pokemonData,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        searchResult,
        setSearchResult,
        myPokemon,
        setMyPokemon,
        opponent,
        setOpponent,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
