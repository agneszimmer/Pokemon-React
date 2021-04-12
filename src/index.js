import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import fontawesome library
import "./fontawesome";
import App from "./App";
import PokemonContext from "./context/pokemonContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PokemonContext>
        <App />
      </PokemonContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
