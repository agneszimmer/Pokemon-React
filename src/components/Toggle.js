import { useState, useContext } from 'react';
import { PokemonContext } from "../context/pokemonContext";

const Toggle = () => {
  const {
    toggled,
    handleToggleDN
  } = useContext(PokemonContext);
  
  return (
    <div onClick={handleToggleDN} className={`toggle${toggled ? " night" : ""}`}>
      <div className="notch">
        <div className="crater" />
        <div className="crater" />
      </div>
      <div>
        <div className="shape sm" />
        <div className="shape sm" /> 
        <div className="shape md" />
        <div className="shape lg" />
      </div>
    </div>
  )
}

export default Toggle;
