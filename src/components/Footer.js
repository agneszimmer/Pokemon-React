import { useContext } from 'react';
import { PokemonContext } from '../context/pokemonContext';
import banner from '../images/Pokebanner2.png'

const Footer = () => {
  const {
    toggled
  } = useContext(PokemonContext);

  return (
    <footer className={`text-left pb-2 ${!toggled ? "day" : "night"}`}>
      <img src={banner} alt="Pokemon Banner"/>
    </footer>
    );
};

export default Footer;
