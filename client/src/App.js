import { Route, Routes, useNavigate } from "react-router-dom";
import "../src/style/style.css";
import Main from "./components/pages/Main";
import About from "./components/pages/About";
import Signin from "./components/pages/Signin";
import Signgup from "./components/pages/Singup";
import Dashboard from "./components/signup/Dashboard";
import Confirmation from "./components/signin/Confirmation";
import { useEffect, useState } from "react";
import MainMenu from "./components/navigation/Main-menu";
import SERVER from "./config";

const App = () => {
  const [state, setState] = useState(false);

  const user = localStorage.getItem("userData");
  const userName = JSON.parse(user)?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${SERVER}/user/checkUser?email=${userName}`,
          { method: "POST" }
        );

        const data = await response.json();

        if (data.ok && !data.data.confirmed) {
          navigate("/confirmation");
        } else if (data.ok && data.data.confirmed && !data.data.loggined) {
          navigate("/signup");
        } else navigate("/");

        if (data.data.loggined) {
          setState(true);
          navigate("/dashboard/profile");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userName, state, setState]);
  return (
    <>
      <MainMenu state={state} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/signup"
          element={<Signgup email={userName} setState={setState} />}
        />
        <Route
          path="/confirmation"
          element={<Confirmation email={userName} />}
        />
        <Route
          path="/dashboard/*"
          element={<Dashboard setState={setState} />}
        />
      </Routes>
    </>
  );
};

export default App;
