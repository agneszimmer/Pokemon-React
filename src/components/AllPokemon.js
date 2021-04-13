import { useState, useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AllPokemon = () => {
  const { pokemonData, loading, setLoading } = useContext(PokemonContext);

  const [pageNum, setPageNum] = useState(0);
  const cardsPerPage = 6;
  const pagesVisited = pageNum * cardsPerPage;
  // slice() Methode gibt Ausschnitt Arr zurück
  const displayPokemons = pokemonData
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((poke) => {
      return (
        <Card key={poke.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={poke.img} />
          <Card.Body>
            <Card.Title>{poke.name.english}</Card.Title>
            <Card.Text>{poke.type}</Card.Text>
            <Card.Text>
              <FontAwesomeIcon icon={['fas', 'heart']} />
              <br/>
              <FontAwesomeIcon icon={['fas', 'fist-raised']} />
            </Card.Text>
            <Button variant="primary">I choose you!</Button>
          </Card.Body>
        </Card>
      );
    });
  // Math.ceil() gibt die nächste Ganzzahl, die größer oder gleich der gegebenen Zahl ist, zurück.
  const pageCount = Math.ceil(pokemonData.length / cardsPerPage);
  // ReactPaginate stellt Argument bereit, what I can destructure to {selected}
  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  return !loading ? (
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
  ) : <div>Loading ...</div>;
};

export default AllPokemon;
