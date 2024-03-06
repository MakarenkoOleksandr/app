import { Route, Routes } from "react-router-dom";
import CheckBalance from "./options/CheckBalance";
import OptionsMenu from "../navigation/Options-menu";
import { useState } from "react";

const Options = ({ active }) => {
  const [activeLink, setActiveLink] = useState("/checkBalance");

  const handleClick = (link) => (e) => {
    e.preventDefault();
    console.log(link);
    setActiveLink(link);
  };

  return (
    <div
      className={`dashboard__options options ${
        active === "/options" ? "active" : ""
      }`}
    >
      <OptionsMenu activeLink={activeLink} handleClick={handleClick} />
      <Routes>
        <Route path="/checkBalance" element={<CheckBalance />} />
      </Routes>
    </div>
  );
};

export default Options;
