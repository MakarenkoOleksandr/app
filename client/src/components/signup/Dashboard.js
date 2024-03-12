import { useState } from "react";
import DashboardMenu from "../navigation/Dashboard-menu";
import Profile from "../dashboard/Profile";
import Options from "../dashboard/Options";
import { Route, Routes } from "react-router-dom";

const Dashboard = ({ setState }) => {
  const [active, setActive] = useState("");
  const [animation, setAnimation] = useState(false);

  const handleClick = (link) => {
    setAnimation(true);
    setTimeout(() => {
      setActive(link);
    }, 100);
  };

  return (
    <main className="main">
      <div className="container">
        <section className="main__dashboard dashboard">
          <DashboardMenu active={active} handleClick={handleClick} />
          <div className="dashboard__content">
            <Routes>
              <Route
                path="/profile"
                element={<Profile setState={setState} active={active} />}
              />
              <Route path="/options/*" element={<Options active={active} />} />
            </Routes>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
