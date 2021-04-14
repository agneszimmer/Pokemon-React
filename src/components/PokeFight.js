import { useParams } from "react-router-dom";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import React, { useEffect, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

import Button from "react-bootstrap/Button";

const PokeFight = () => {
  const { id } = useParams();
  const {
    pokemonData,
    myPokemon,
    setMyPokemon,
    opponent,
    setOpponent,
  } = useContext(PokemonContext);

  /*     if (pokemonData.length > 1) */
  useEffect(() => {
    setMyPokemon(pokemonData.find((p) => p.id == id));
    console.log(myPokemon);

    const randomPokemonId = Math.floor(Math.random() * pokemonData.length) + 1;
    setOpponent(pokemonData.find((p) => p.id == randomPokemonId));
    console.log(opponent);
  }, [id, pokemonData]);

  return (
    <div>
      {opponent && (
        <div className="d-flex justify-content-around align-items-center">
          <Card key={myPokemon.id} style={{ width: "18rem" }}>
            <Card.Img
              className="pt-2 top"
              src={myPokemon.img}
              style={{ height: "200px" }}
            />
            <Card.Body>
              <Card.Title>{myPokemon.name.english}</Card.Title>
              <Card.Text>{myPokemon.type.join(" | ")}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon className="icon" icon={["fas", "heart"]} />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={myPokemon.base.HP}
                    label={myPokemon.base.HP}
                    max={100}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon
                    className="icon"
                    style={{ width: "20px" }}
                    icon={["fas", "fist-raised"]}
                  />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={myPokemon.base.Attack}
                    label={myPokemon.base.Attack}
                    max={100}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon
                    className="icon"
                    icon={["fas", "shield-alt"]}
                  />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={myPokemon.base.Defense}
                    label={myPokemon.base.Defense}
                    max={100}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon className="icon" icon={["fas", "meteor"]} />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={myPokemon.base.Speed}
                    label={myPokemon.base.Speed}
                    max={100}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Button variant="primary">Attack</Button>

          <Card key={opponent.id} style={{ width: "18rem" }}>
            <Card.Img
              className="pt-2 top"
              src={opponent.img}
              style={{ height: "200px" }}
            />
            <Card.Body>
              <Card.Title>{opponent.name.english}</Card.Title>
              <Card.Text>{opponent.type.join(" | ")}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon className="icon" icon={["fas", "heart"]} />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={opponent.base.HP}
                    label={opponent.base.HP}
                    max={100}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon
                    className="icon"
                    style={{ width: "20px" }}
                    icon={["fas", "fist-raised"]}
                  />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={opponent.base.Attack}
                    label={opponent.base.Attack}
                    max={100}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon
                    className="icon"
                    icon={["fas", "shield-alt"]}
                  />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={opponent.base.Defense}
                    label={opponent.base.Defense}
                    max={100}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <FontAwesomeIcon className="icon" icon={["fas", "meteor"]} />
                  <ProgressBar
                    className="progressBar ms-2"
                    animated
                    now={opponent.base.Speed}
                    label={opponent.base.Speed}
                    max={100}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PokeFight;
