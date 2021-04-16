import { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const AllPokemon = () => {
  const {
    pokemonData,
    loading,
    searchTerm,
    setSearchTerm,
    searchResult,
    setSearchResult,
    filter,
    handleFilter,
    toggled
  } = useContext(PokemonContext);

  useEffect(() => {
    setSearchResult(pokemonData);
  }, [pokemonData, searchTerm]);
  
  const onInputChange = ({ target }) => setSearchTerm(target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!searchTerm) {
      setSearchResult(pokemonData);
      getFilteredResults();
    } else {
      console.log(filter)
      getFilteredResults()
    };
  };

  const getFilteredResults = () => {
    // ES6
    const searchFilter = (toggle) => pokemonData.filter(poke => poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => b.base[toggle] - a.base[toggle]);

    // ES5
    // function searchFilter(toggle){
    //   return pokemonData.filter(function (poke) {
    //     return poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
    //   }).sort(function (a, b){ return  b.base[toggle] - a.base[toggle]});
    // }

    // 1) Filter Health Points true
    if(filter[0].state) return setSearchResult(searchFilter('HP'))
    // 2) Filter Attack Points true
    if(filter[1].state) return setSearchResult(searchFilter('Attack'))
    // 3) Filter Defense Points true
    if(filter[2].state) return setSearchResult(searchFilter('Defense'))
    // 4) Filter Speed Points true
    if(filter[3].state) return setSearchResult(searchFilter('Speed'))
    // 5) Every key in filter obj false
    setSearchResult(searchFilter);
  };

  const [pageNum, setPageNum] = useState(0);
  const cardsPerPage = 10;
  const pagesVisited = pageNum * cardsPerPage;
  // slice() Methode gibt Ausschnitt Arr zurück
  const displayPokemons = searchResult
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((poke) => {
      return (
        <Card
          className={`mb-3 text-center pokeCard ${!toggled ? "" : "night"}`}
          key={poke.id}
        >
          <Card.Img
            className="pt-2 top pokeImg"
            src={poke.img}
          />
          <Card.Body>
            <Card.Title>{poke.name.english}</Card.Title>
            <Card.Text>{poke.type.join(" | ")}</Card.Text>
            <ListGroup variant="flush mb-3">
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon className="icon" icon={["fas", "heart"]} color="red"/>
                <ProgressBar
                  className="progressBar ms-2"
                  animated
                  now={poke.base.HP}
                  label={poke.base.HP}
                  max={150}
                />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon
                  className="icon"
                  icon={["fas", "fist-raised"]}
                />
                <ProgressBar
                  className="progressBar ms-2"
                  animated
                  now={poke.base.Attack}
                  label={poke.base.Attack}
                  max={150}
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
                  now={poke.base.Defense}
                  label={poke.base.Defense}
                  max={150}
                />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon className="icon" icon={["fas", "meteor"]} />
                <ProgressBar
                  className="progressBar ms-2"
                  animated
                  now={poke.base.Speed}
                  label={poke.base.Speed}
                  max={150}
                />
              </ListGroup.Item>
            </ListGroup>
            <Link to={`/${poke.id}`}>
              <Button variant={`btn btn-outline-${!toggled ? "dark" : "light"}`}>I choose you!</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    });
  // Math.ceil() gibt die nächste Ganzzahl, die größer oder gleich der gegebenen Zahl ist, zurück.
  const pageCount = Math.ceil(searchResult.length / cardsPerPage);
  // ReactPaginate stellt Argument bereit, what I can destructure to {selected}
  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  return searchResult && !loading ? (
    <Container className="mt-5 mb-5">
      <Row>
        <form className={`input-group input-group-sm mb-5 ${!toggled ? "day" : "night"}`} onSubmit={onSubmit}>
          <input
            className={`form-control searchbar ${!toggled ? "" : "night"}`}
            type="search"
            placeholder="Search your Pokemon"
            aria-label="Search"
            onChange={onInputChange}
            value={searchTerm}
          />
          <button className={`input-group-text search-icon-container ${!toggled ? "" : "night"}`} type='submit'>
            <FontAwesomeIcon
              className={`${!toggled ? "" : "iconNight"}`}
              icon={["fa", "search"]}
              type="submit"
            />
          </button>
          <Col className={`col-auto px-3 colFilter ${!toggled ? "" : "night"}`}>
            <div>Filter by (descending)</div>
            <div className="form-check form-switch">
              <input className="form-check-input" onChange={handleFilter} value={filter.find(item => item.id === 'checkHealth').state} name="checkHealth" type="checkbox" checked={`${filter.find(item => item.id === 'checkHealth').state ? "checked" : ""}`} />
              <label className="form-check-label" for="checkHealth">
                Health Points (HP) 
                <FontAwesomeIcon className="icon" icon={["fas", "heart"]} color="red"/>
              </label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" onChange={handleFilter} value={filter.find(item => item.id === 'checkAttack').state} name="checkAttack" type="checkbox" checked={`${filter.find(item => item.id === 'checkAttack').state ? "checked" : ""}`}/>
              <label className="form-check-label" for="checkAttack">
                Attack Points 
                <FontAwesomeIcon className="icon" icon={["fas", "fist-raised"]} />
              </label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" onChange={handleFilter} value={filter.find(item => item.id === 'checkDefense').state} name="checkDefense" type="checkbox" checked={`${filter.find(item => item.id === 'checkDefense').state ? "checked" : ""}`}/>
              <label className="form-check-label" for="checkDefense">
                Defense Points
                <FontAwesomeIcon className="icon" icon={["fas", "shield-alt"]}/>
              </label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" onChange={handleFilter} value={filter.find(item => item.id === 'checkSpeed').state} name="checkSpeed" type="checkbox" checked={`${filter.find(item => item.id === 'checkSpeed').state ? "checked" : ""}`}/>
              <label className="form-check-label" for="checkSpeed">
                Speed Points
                <FontAwesomeIcon className="icon" icon={["fas", "meteor"]}/>
              </label>
            </div>
          </Col>
        </form>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {displayPokemons}
        <ReactPaginate
          previousLabel={
            <FontAwesomeIcon
              className="previousBtn"
              icon={["fas", "angle-left"]}
            />
          }
          nextLabel={
            <FontAwesomeIcon
              className="nextBtn"
              icon={["fas", "angle-right"]}
            />
          }
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </Row>
    </Container>
  ) : (
    <Spinner />
  );
};

export default AllPokemon;
