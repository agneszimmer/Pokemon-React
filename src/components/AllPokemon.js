import { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AllPokemon = () => {
  const { 
    pokemonData,
    loading,
    searchTerm,
    setSearchTerm,
    searchResult,
    setSearchResult 
  } = useContext(PokemonContext);

  useEffect(() => {
    setSearchResult(pokemonData);
  }, [pokemonData, searchTerm]);

  const onSubmit = (e) => {
    e.preventDefault();
    !searchTerm ? alert('Type in something') : getFilteredResults();
  };

  const onInputChange = ({target}) => {
    console.log(searchTerm);
    setSearchTerm(target.value);
  }

  const getFilteredResults = () => {
    setSearchResult(
      pokemonData.filter((poke) =>
        poke.name.english.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const [pageNum, setPageNum] = useState(0);
  const cardsPerPage = 10;
  const pagesVisited = pageNum * cardsPerPage;
  // slice() Methode gibt Ausschnitt Arr zurück
  const displayPokemons = searchResult
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((poke) => {
      return (
        <Card className='mb-3 text-center' key={poke.id} style={{ flex: "0 1 19%", minWidth: "230px", opacity: "0.8" }}>
          <Card.Img className="pt-2 top" src={poke.img} style={{ height: "200px" }} />
          <Card.Body>
            <Card.Title>{poke.name.english}</Card.Title>
            <Card.Text>{poke.type.join(' | ')}</Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon icon={['fas', 'heart']} />  
                <ProgressBar className="ms-2" style={{width: "90%"}} animated now={poke.base.HP} label={poke.base.HP} max={100}/>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon icon={['fas', 'fist-raised']} />
                <ProgressBar className="ms-2" style={{width: "90%"}} animated now={poke.base.Attack} label={poke.base.Attack} max={100}/>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon icon={['fas', 'shield-alt']} />
                <ProgressBar className="ms-2" style={{width: "90%"}} animated now={poke.base.Defense} label={poke.base.Defense} max={100}/>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <FontAwesomeIcon icon={['fas', 'meteor']} />
                <ProgressBar className="ms-2" style={{width: "90%"}} animated now={poke.base.Speed} label={poke.base.Speed} max={100}/>
              </ListGroup.Item>
            </ListGroup>
            <Button className="btn-light btn-outline-dark">I choose you!</Button>
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
    <Container className='mt-5 mb-5'>
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
        </form>
      </Row>
      <Row style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
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
  ) : <Spinner />;
};

export default AllPokemon;
