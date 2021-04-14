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
    handleFilter
  } = useContext(PokemonContext);

  useEffect(() => {
    setSearchResult(pokemonData);
  }, [pokemonData, searchTerm]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!searchTerm) {
      setSearchResult(pokemonData);
      getFilteredResults();
    } else getFilteredResults();
  };

  const onInputChange = ({ target }) => {
    console.log(searchTerm);
    setSearchTerm(target.value);
  };

  const getFilteredResults = () => {
    // 1) Every key in filter obj false
    if(Object.keys(filter).every((key) => !filter[key])) {
      const searchFilter = pokemonData.filter(poke => {
      return poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      });  
      setSearchResult(searchFilter);
    };

    // 2) Filter Health Points true
    if(filter['checkHealth']) {
      const searchFilter = pokemonData.filter(poke => {
      return poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      });
      const filt = searchFilter.sort((a, b) => {
        return b.base.HP - a.base.HP
      });
      setSearchResult(filt);
    };

    // 3) Filter Attack Points true
    if(filter['checkAttack']) {
      const searchFilter = pokemonData.filter(poke => {
      return poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      });
      const filt = searchFilter.sort((a, b) => {
        return b.base.Attack - a.base.Attack
      });
      setSearchResult(filt);
    };

    // 4) Filter Defense Points true
    if(filter['checkDefense']) {
      const searchFilter = pokemonData.filter(poke => {
      return poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      });
      const filt = searchFilter.sort((a, b) => {
        return b.base.Defense - a.base.Defense
      });
      setSearchResult(filt);
    };

    // 5) Filter Speed Points true
    if(filter['checkSpeed']) {
      const searchFilter = pokemonData.filter(poke => {
      return poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      });
      const filt = searchFilter.sort((a, b) => {
        return b.base.Speed - a.base.Speed
      });
      setSearchResult(filt);
    };



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
          className="mb-3 text-center pokeCard"
          key={poke.id}
        >
          <Card.Img
            className="pt-2 top pokeImg"
            src={poke.img}
          />
          <Card.Body>
            <Card.Title>{poke.name.english}</Card.Title>
            <Card.Text>{poke.type.join(" | ")}</Card.Text>
            <ListGroup variant="flush">
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
              <Button variant="btn btn-outline-dark">I choose you!</Button>
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
        <form className="input-group input-group-sm mb-5" onSubmit={onSubmit}>
          <input
            className="form-control searchbar"
            type="search"
            placeholder="Search your Pokemon"
            aria-label="Search"
            onChange={onInputChange}
            value={searchTerm}
          />
          <span className="input-group-text search-icon-container">
            <FontAwesomeIcon
              icon={["fa", "search"]}
              type="submit"
              onClick={onSubmit}
            />
          </span>
          <Col className="col-auto px-3 colFilter">
            <div>Filter by (ascending)</div>
            <div className="form-check form-switch">
              <input className="form-check-input" onClick={handleFilter} defaultChecked={filter.checkHealth} name="checkHealth" type="checkbox" id="checkHealth" />
              <label className="form-check-label" for="checkHealth">
                Health Points (HP) 
                <FontAwesomeIcon className="icon" icon={["fas", "heart"]} color="red"/>
              </label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" onClick={handleFilter} defaultChecked={filter.checkAttack} name="checkAttack" type="checkbox" id="checkAttack" />
              <label className="form-check-label" for="checkAttack">
                Attack Points 
                <FontAwesomeIcon className="icon" icon={["fas", "fist-raised"]} />
              </label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" onClick={handleFilter} defaultChecked={filter.checkDefense} name="checkDefense" type="checkbox" id="checkDefense" />
              <label className="form-check-label" for="checkDefense">
                Defense Points
                <FontAwesomeIcon className="icon" icon={["fas", "shield-alt"]}/>
              </label>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" onClick={handleFilter} defaultChecked={filter.checkSpeed} name="checkSpeed" type="checkbox" id="checkDefense" />
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
