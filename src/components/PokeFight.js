import { useParams } from "react-router-dom";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import mood0 from "../images/moods/0.png";
import mood1 from "../images/moods/1.png";
import mood2 from "../images/moods/2.png";
import mood3 from "../images/moods/3.webp";
import mood4 from "../images/moods/4.png";
import mood5 from "../images/moods/5.png";
import mood6 from "../images/moods/6.png";
import mood7 from "../images/moods/7.png";
import mood8 from "../images/moods/love.png";

const PokeFight = () => {
  const { id } = useParams();
  const { pokemonData, score, setScore, history, setHistory } = useContext(
    PokemonContext
  );

  const [mood, setMood] = useState(Math.floor(Math.random() * 9));

  const [myPokemon, setMyPokemon] = useState();
  const [opponent, setOpponent] = useState();

  const moodImgArray = [
    mood0,
    mood1,
    mood2,
    mood3,
    mood4,
    mood5,
    mood6,
    mood7,
    mood8,
  ];

  const [statePok, setStatePok] = useState({
    HP: null,
    Defense: null,
    Attack: null,
    Speed: null,
  });

  const [stateOpp, setStateOpp] = useState({
    HP: null,
    Defense: null,
    Attack: null,
    Speed: null,
  });

  useEffect(() => {
    setMyPokemon(pokemonData.find((p) => p.id == id));

    const randomId = Math.floor(Math.random() * pokemonData.length) + 1;
    setOpponent(pokemonData.find((p) => p.id == randomId));
  }, [pokemonData]);

  useEffect(() => {
    myPokemon &&
      setStatePok({
        HP: myPokemon.base.HP,
        Attack: myPokemon.base.Attack,
        Defense: myPokemon.base.Defense,
        Speed: myPokemon.base.Speed,
      });
  }, [myPokemon]);

  useEffect(() => {
    opponent &&
      setStateOpp({
        HP: opponent.base.HP,
        Attack: opponent.base.Attack,
        Defense: opponent.base.Defense,
        Speed: opponent.base.Speed,
      });
  }, [opponent]);

  const handleAttack = () => {
    setStateOpp({ ...stateOpp, HP: stateOpp.HP - 2 * mood });
    setMood(Math.floor(Math.random() * 9));
  };

  const handleSpecialAttack = () => {
    if (statePok.Speed > 1) {
      setMood((prevMood) => prevMood - 1);
      setStateOpp({ ...stateOpp, HP: stateOpp.HP - 5 * mood });
      setStatePok({ ...statePok, Speed: statePok.Speed - 20 });
    } else {
      alert("not enough power");
    }
  };

  stateOpp.HP && if (stateOpp.HP < 1) {
    alert("you won!!!!!");
    setScore((prevScore) => prevScore - 10);
    setHistory({ ...history, Fight: `won against ${opponent.name.english}` });
  }
  /*   if (lifepoints * mood < oppLP * Math.floor(Math.random() * 7)) {
      setLifepoints((prevLifepoints) => prevLifepoints - 20);
    } else setOppLP((prevOppLP) => prevOppLP - 20);
  console.log(lifepoints); 
  }; */

  /*   const handleSpecialAttack = () => {} */
  /*     if (specialAttack * mood < oppLP * Math.floor(Math.random() * 7)) {
      setLifepoints((prevLifepoints) => prevLifepoints - 20);
    } else setOppLP((prevOppLP) => prevOppLP - 20);
    console.log(lifepoints); */

  return pokemonData && mood ? (
    <Container>
      {opponent && myPokemon && mood && (
        <Row className="align-items-center text-center my-5">
          <Col>
            <Card key={myPokemon.id} className="pokeCard">
              <Card.Img className="pokeImg pt-2 top" src={myPokemon.img} />
              <Card.Body>
                <Card.Title>{myPokemon.name.english}</Card.Title>
                <Card.Text>{myPokemon.type.join(" | ")}</Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex">
                    <FontAwesomeIcon className="icon" icon={["fas", "heart"]} />
                    <ProgressBar
                      className="progressBar ms-2"
                      animated
                      now={statePok.HP}
                      label={statePok.HP}
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

                      now={statePok.Attack}
                      label={statePok.Attack}
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
                      now={statePok.Defense}
                      label={statePok.Defense}
                      max={100}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                    <FontAwesomeIcon
                      className="icon"
                      icon={["fas", "meteor"]}
                    />
                    <ProgressBar
                      className="progressBar ms-2"
                      animated
                      now={statePok.Speed}
                      label={statePok.Speed}
                      max={100}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card key={mood} className="moodCard">
              <Card.Title style={{ color: "yellow" }}>I feel like</Card.Title>
              <Card.Img className="moodImg pt-2 top" src={moodImgArray[mood]} />
              <Card.Body>
                <Button variant="btn btn-warning" onClick={handleAttack}>
                  Attack
                </Button>
                <Button variant="btn btn-dark" onClick={handleSpecialAttack}>
                  Special Attack
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card key={opponent.id} className="pokeCard">
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
                      now={stateOpp.HP}
                      label={stateOpp.HP}
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
                      now={stateOpp.Attack}
                      label={stateOpp.Attack}
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
                      now={stateOpp.Defense}
                      label={stateOpp.Defense}
                      max={100}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex">
                    <FontAwesomeIcon
                      className="icon"
                      icon={["fas", "meteor"]}
                    />
                    <ProgressBar
                      className="progressBar ms-2"
                      animated
                      now={stateOpp.Speed}
                      label={stateOpp.Speed}
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
  ) : (
    <Spinner />
  );
};

export default PokeFight;
