import { NavLink } from "react-router-dom";
import logo from "../../img/Logo.jpg";

const MainMenu = ({ state }) => {
  return (
    <header className="header">
      <nav className="header__menu">
        <div className="header__menu-logo">
          <NavLink to="/">
            <img className="header__menu-img" src={logo} alt="logo"></img>
          </NavLink>
        </div>
        <ul className="header__menu-actions">
          {state === false && (
            <>
              <li className="header__menu-action">
                <NavLink to="/signin" className="header__menu-link">
                  Sign In
                </NavLink>
              </li>
              <li className="header__menu-action">
                <NavLink to="/signup" className="header__menu-link">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {state === true && (
            <li className="header__menu-action">
              <NavLink to="/dashboard" className="header__menu-link">
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainMenu;
