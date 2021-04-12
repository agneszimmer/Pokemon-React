import { useState, useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AllPokemon = () => {
  const { pokemon, loading, setLoading } = useContext(PokemonContext);

  const [pageNum, setPageNum] = useState(0);
  const cardsPerPage = 6;
  const pagesVisited = pageNum * cardsPerPage;
  // slice() Methode gibt Ausschnitt Arr zurück
  const displayPokemons = pokemon
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((pokemon) => {
      return (
        <Card key={pokemon.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{pokemon.name.english}</Card.Title>
            <Card.Text>{pokemon.type}</Card.Text>
            <Button variant="primary">I choose you!</Button>
          </Card.Body>
        </Card>
      );
    });
  // Math.ceil() gibt die nächste Ganzzahl, die größer oder gleich der gegebenen Zahl ist, zurück.
  const pageCount = Math.ceil(pokemon.length / cardsPerPage);
  // ReactPaginate stellt Argument bereit, what I can destructure to {selected}
  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  return (
    <Container variant="mt-5">
      <Row>
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
  );
};

export default AllPokemon;
