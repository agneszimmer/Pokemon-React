import { Fragment, useContext } from 'react';
import { PokemonContext } from '../context/pokemonContext';
import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../context/pokemonContext';
import Button from "react-bootstrap/Row";
import Toggle from "./Toggle";

const Navbar = () => {
  const {
    toggled
  } = useContext(PokemonContext)

  // const { isAuthenticated, logOut } = useContext(AuthContext);
  const isAuthenticated = false;

  return (
    <nav className={`navbar navbar-expand-md navbar-${!toggled ? "light" : "dark"} bg-${!toggled ? "light" : "dark"}`}>
      <div class="container container-fluid">
        <Link className='navbar-brand' to='/'>
          PokeGame
        </Link>
        <Toggle />
        <Button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navToggleContent'
          aria-controls='navToggleContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </Button>
        <div className='collapse navbar-collapse' id='navToggleContent'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <NavLink to='/' exact activeClassName='active' className='nav-link'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/highscore' exact activeClassName='active' className='nav-link'>
                Highscore
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <Fragment>
                <li className='nav-item'>
                  <NavLink to='/signup' activeClassName='active' className='nav-link'>
                    Register
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/signin' activeClassName='active' className='nav-link'>
                    Login
                  </NavLink>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <NavLink to='/secret-info' activeClassName='active' className='nav-link'>
                    Profile
                  </NavLink>
                </li>
                <li className='nav-item'>
                  {/* <div onClick={logOut} className='nav-link'>
                    Logout
                  </div> */}
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;