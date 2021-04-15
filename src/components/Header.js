import logo from '../images/pokelogo.png'

const Header = () => {
  return (
    <footer className="text-left pb-2">
      <img src={logo} alt="Pokemon Banner" className="logo-img"/>
    </footer>
    );
};

export default Header;