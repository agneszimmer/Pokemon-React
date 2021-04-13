import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPokemon from "./components/AllPokemon";
import Id from "./components/Id";
import Info from "./components/Info";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={AllPokemon} />
        <Route exact path="/pokemon/:id" component={Id} />
        <Route exact path="/pokemon/:id/:info" component={Info} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
