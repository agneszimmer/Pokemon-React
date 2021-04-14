import { useParams } from "react-router-dom";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect, createContext, useContext } from "react";

import Button from "react-bootstrap/Button";

const PokeFight = () => {
  const { id } = useParams();
  const {
    pokemonData,
    loading,
    setLoading,
    pokemonImg,
    myPokemon,
    setMyPokemon,
    opponent,
    setOpponent,
  } = useContext(PokemonContext);

  useEffect(() => {
    console.log(pokemonData);
    setMyPokemon(pokemonData.find((p) => p.id === id));
  }, [id, pokemonData]);

  /*   const myPokemon = pokemonData.id;

    useEffect(() => {
    const generateRandomPokemonId = () => {
      const randomPokemonId = Math.floor(Math.random());
      generateRandomPokemonId();
      setOpponent(pokemon.randomPokemonId);

      console.log(opponent);
    };
  });

  const opponent = pokemonData[randomId]; */

  return (
    <div>
      <h1>hello</h1>
      {/*       <Card key={myPokemon.id} style={{ width: "18rem" }}>
        <Card.Img variant="top" src="#" />
        <Card.Body>
          <Card.Title>{myPokemon.name.english}</Card.Title>
          <Card.Text>{myPokemon.type}</Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={["fas", "heart"]} />
          </Card.Text>
        </Card.Body>
      </Card>
      <Card key={opponent.id} style={{ width: "18rem" }}>
        <Card.Img variant="top" src="#" />
        <Card.Body>
          <Card.Title>{poke.name.english}</Card.Title>
          <Card.Text>{poke.type}</Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={["fas", "heart"]} />
          </Card.Text>
        </Card.Body>
      </Card>
      <Button variant="primary">Attack</Button> */}
    </div>
  );
};

export default PokeFight;
