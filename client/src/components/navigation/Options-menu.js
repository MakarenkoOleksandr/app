import { NavLink } from "react-router-dom";

const OptionsMenu = ({ active, handleClick }) => {
  return (
    <nav className="options__menu">
      <ul className="options__menu-actions">
        <li className="options__menu-action">
          <NavLink
            to="/dashboard/options/checkBalance"
            className={`options__menu-link ${
              active === "/checkBalance" ? "active" : ""
            }`}
            onClick={() => handleClick("/checkBalance")}
          >
            Check Balance
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default OptionsMenu;
