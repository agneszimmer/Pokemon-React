import { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
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
        <Card className='mb-3' key={poke.id} style={{ flex: "0 1 19%", minWidth: "230px", opacity: "0.8" }}>
          <Card.Img className="pt-2 top" src={poke.img} />
          <Card.Body>
            <Card.Title>{poke.name.english}</Card.Title>
            <Card.Text>{poke.type}</Card.Text>
            <Card.Text>
              <FontAwesomeIcon icon={['fas', 'heart']} />
            </Card.Text>
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
      <Row style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
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
