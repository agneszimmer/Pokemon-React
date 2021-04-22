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
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
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

  const [mood, setMood] = useState(Math.floor(Math.random() * 9 + 1));
  
  const [myPokemon, setMyPokemon] = useState();
  const [opponent, setOpponent] = useState();
  const [win, setWin] = useState(false);
  const [loose, setLoose] = useState(false);

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

    const randomId = Math.floor(Math.random() * pokemonData.length);
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

  const condition = () => {
    if (stateOpp.HP > 0 && statePok.HP > 0) {
      counterAttack();
      if (statePok.HP <= 0) setStateOpp(() => ({
        HP: 0,
        Attack: 0,
        Defense: 0,
        Speed: 0
      }));
    }
    
    if (stateOpp.HP <= 0) {
      setScore(prev => prev + 10); 
      setWin(true);
    }

    if (statePok.HP <= 0) {
      setScore(prev => prev - 10); 
      setLoose(true);
    } 
  }


  const handleAttack = () => {
    setStateOpp(() => ({
      ...stateOpp,
      HP: Math.floor(stateOpp.HP - mood - 0.1 * statePok.Attack),
    }));
    setMood(Math.floor(Math.random() * 9));

    condition();
  };
  
  const counterAttack = () => {
    alert("COUNTER ATTACK");
    setStatePok({
      ...statePok,
      HP: Math.floor(statePok.HP - 0.1 * stateOpp.Attack),
    });
  }
  
  const handleSpecialAttack = () => {
    if (statePok.Speed > 0) {
      setStateOpp({
        ...stateOpp,
        HP: Math.floor(stateOpp.HP - 2 * mood - 0.2 * statePok.Attack),
      });
      setStatePok({ ...statePok, Speed: statePok.Speed - 15 });
      setMood(1);
    } else {
      alert("not enough power");
    }
    condition();
  };

  if(win) {
    return (
      <Container>
        <Card className="pokeCard text-center py-4 my-5">
          <Card.Title>You won against <b>{opponent.name.english}</b></Card.Title>
          <Card.Text>Your new Score is <b>{score}</b></Card.Text>
          <div style={{margin: "5px auto"}}>
            <Link className="btn btn-dark" to="/">Choose a pokemon for the next fight</Link>
          </div>
          <div> 
            <Button variant="btn btn-outline-danger" onClick={(() => setScore(0))}>Reset your score</Button>
          </div>
        </Card>
      </Container>
    )
  }

  if(loose) {
    return (
      <Container>
        <Card className="pokeCard text-center py-4 my-5">
          <Card.Title>You lost against <b>{opponent.name.english}</b></Card.Title>
          <Card.Text>Your new Score is <b>{score}</b></Card.Text>
          <div style={{margin: "5px auto"}}>
            <Link className="btn btn-dark" to="/">Choose a pokemon for the next fight</Link>
          </div>
          <div> 
            <Button variant="btn btn-outline-danger" onClick={(() => setScore(0))}>Reset your score</Button>
          </div>
        </Card>
      </Container>
    );
  } 

  return opponent && pokemonData ? (
    <Container>
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
            <Card className="moodCard">
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
            <Card className="pokeCard">
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
    </Container>
  ) : (
    <Spinner />
  );
};

export default PokeFight;
