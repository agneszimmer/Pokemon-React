import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import AllPokemon from "./components/AllPokemon";
import Id from "./components/Id";
import Info from "./components/Info";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/pokemon" component={AllPokemon} />
        <Route exact path="/pokemon/:id" component={Id} />
        <Route exact path="/pokemon/:id/:info" component={Info} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
