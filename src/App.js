import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import AllPokemon from "./components/AllPokemon";
import PokeFight from "./components/PokeFight";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Switch>
        <Route exact path="/" component={AllPokemon} />
        <Route exact path="/:id" component={PokeFight} />
        <Route exact path="/:stats" component={Stats} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
