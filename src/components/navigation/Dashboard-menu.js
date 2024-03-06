import { NavLink } from "react-router-dom";

const DashboardMenu = ({ active, handleClick }) => {
  return (
    <nav className="dashboard__menu">
      <ul className="dashboard__menu-actions">
        <li className="dashboard__menu-action">
          <NavLink
            to="/dashboard/profile"
            className={`dashboard__menu-link ${
              active === "/profile" ? "active" : ""
            } `}
            onClick={() => handleClick("/profile")}
          >
            Profile
          </NavLink>
        </li>
        <li className="dashboard__menu-action">
          <NavLink
            to="/dashboard/options"
            className={`dashboard__menu-link ${
              active === "/options" ? "active" : ""
            } `}
            onClick={() => handleClick("/options")}
          >
            Options
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardMenu;
