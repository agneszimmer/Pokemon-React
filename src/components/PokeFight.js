import { useParams } from "react-router-dom";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import React, { useEffect, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PokeFight = () => {
  const { id } = useParams();
  const {
    pokemonData,
    myPokemon,
    setMyPokemon,
    opponent,
    setOpponent
  } = useContext(PokemonContext);

/*  useEffect(() => {
    setMyPokemon(pokemonData.find((p) => p.id == id));
    console.log(myPokemon);
setMyLifePoints(myPokemon.base.HP); 

    const randomPokemonId = Math.floor(Math.random() * pokemonData.length) + 1;
    setOpponent(pokemonData.find((p) => p.id == randomPokemonId));
    console.log(opponent);
     setOpLifePoints(opponent.base.HP); 
  }, [id, pokemonData]);*/

/*   const handleAttack = () => {
    setLifePoints
  } */

  

  
  return (
    <Container>
      {opponent && (
        <Row className="align-items-center text-center my-5">
          <Col>
            <Card key={myPokemon.id} className="pokeCard" >
              <Card.Img
                className="pokeImg pt-2 top"
                src={myPokemon.img}
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
          </Col>
          <Col>
            <Button variant="btn btn-dark" /* onClick={handleAttack} */>Attack</Button>
          </Col>
          <Col>
            <Card key={opponent.id} className="pokeCard" >
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
          
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PokeFight;
