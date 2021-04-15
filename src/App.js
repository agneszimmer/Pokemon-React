import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPokemon from "./components/AllPokemon";
import PokeFight from "./components/PokeFight";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
