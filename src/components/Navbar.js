import { Fragment, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../context/pokemonContext';
import Button from "react-bootstrap/Row";

const Navbar = () => {
  // const { isAuthenticated, logOut } = useContext(AuthContext);
  const isAuthenticated = false;

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <div class="container-fluid">
        <Link className='navbar-brand' to='/'>
          PokeGame
        </Link>
        <Button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </Button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto w-50 justify-content-around'>
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