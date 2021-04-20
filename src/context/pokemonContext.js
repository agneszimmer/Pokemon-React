import React, { useState, useEffect, createContext } from "react";

export const PokemonContext = createContext();

const PokemonState = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImg, setPokemonImg] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState();
  const [toggled, setToggled] = useState(false);
  const [filter, setFilter] = useState([
    { id: "checkHealth", state: false },
    { id: "checkAttack", state: false },
    { id: "checkDefense", state: false },
    { id: "checkSpeed", state: false },
  ]);

  const handleFilter = ({ target }) => {
    const newFilter = filter.map((filter) =>
      filter.id === target.name && filter.state !== true
        ? { ...filter, state: true }
        : { ...filter, state: false }
    );
    setFilter(newFilter);
  };

  const handleToggleDN = () => {
    setToggled((prev) => !prev);
  };

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
    setLoading(true);
    const fetchPokemonImg = async (poke) => {
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
    };

    const getPokemonImg = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=40");
        const data = await res.json();
        data.results.forEach((poke) => {
          fetchPokemonImg(poke);
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    getPokemonImg();
    setLoading(false);
  }, []);

  useEffect(() => {
    const newArr = pokemon.map((p) => ({
      ...p,
      ...pokemonImg.find((pokeImg) => pokeImg.id === p.id),
    }));
    setPokemonData(newArr);
  }, [pokemon, pokemonImg]);

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
        score,
        setScore,
        history,
        setHistory,
        filter,
        handleFilter,
        toggled,
        handleToggleDN,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
