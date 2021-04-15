import logo from '../images/pokelogo.png'

const Header = () => {
  return (
    <header className="text-center pb-2">
      <img src={logo} alt="Pokemon Banner" className="logo-img"/>
    </header>
    );
};

export default Header;