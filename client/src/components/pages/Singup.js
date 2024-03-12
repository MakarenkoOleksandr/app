import { useState } from "react";

import Dashboard from "../signup/Dashboard";
import Login from "../signup/Login";

const Signgup = ({ email, setState }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <main className="main">
      {loginStatus === false && <Login user={email} setState={setState} />}
      {loginStatus === true && <Dashboard />}
    </main>
  );
};

export default Signgup;
