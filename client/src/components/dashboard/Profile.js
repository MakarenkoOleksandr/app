import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserBtn from "./btn/UserBtn";
import WalletBtn from "./btn/WalletBtn";
import AddNetworkModal from "./options/AddNetworkModal";
import NetworkAddBtn from "./btn/NetworkAddBtn";
import SERVER from "../../config";

const Profile = ({ setState, active }) => {
  const [btnData, setBtnData] = useState("Add");
  const [wallet, setWallet] = useState();
  const [isWallet, setIsWallet] = useState(false);
  const [btnClick, setBtnClick] = useState(false);
  const [modal, setModal] = useState(false);
  const [network, setNetwork] = useState([]);

  const user = localStorage.getItem("userData");
  const userName = JSON.parse(user)?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${SERVER}/user/getUser?email=${userName}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (data.ok) {
          console.log(data.ok);
          setNetwork(data.data.network.map((network) => network.name));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${SERVER}/user/checkUser?email=${userName}`,
          { method: "POST" }
        );

        const data = await response.json();
        if (data.data.metamask) {
          setIsWallet(true);
          setWallet(data.data.metamask);
          setBtnData("Change");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userName]);

  useEffect(() => {
    if (modal) {
      document.body.className = "active";
    } else {
      document.body.className = "";
    }
  }, [modal]);

  const handleWalletChange = async () => {
    setIsWallet(false);
    setBtnClick(true);

    if (btnClick === true) {
      try {
        const response = await fetch(
          `http://${SERVER}/user/update?email=${userName}&update=metamask&status=${wallet}`,
          { method: "POST" }
        );

        const data = await response.json();
        if (data.ok) {
          setIsWallet(true);
          setBtnClick(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNetworkAdd = () => {
    setModal(true);
  };

  const handleWalletAdd = async (userName, addParam, paramValue) => {
    try {
      const response = await fetch(`http://${SERVER}/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userName,
          param: addParam,
          value: paramValue,
        }),
      });
      const data = await response.json();
      if (data.ok) {
        setIsWallet(true);
        setBtnData("Change");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (updateParam, updateStatus) => {
    try {
      const response = await fetch(
        `http://${SERVER}/user/update?email=${userName}&update=${updateParam}&status=${updateStatus}`,
        { method: "POST" }
      );

      const data = await response.json();
      if (data.ok) {
        setState(false);
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNetwork = async () => {
    try {
      const response = await fetch(`${SERVER}/user/getUser?email=${userName}`, {
        method: "GET",
      });

      const data = await response.json();

      if (data.ok) {
        setNetwork(data.data.network.map((network) => network.name));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`dashboard__profile profile ${
          active === "/profile" ? "active" : ""
        }`}
      >
        <div className="profile__wrap">
          <span className="profile__name">User: {userName}</span>
          <UserBtn btnData={"Logout"} click={handleLogout} />
        </div>
        <div className="profile__wrap">
          {isWallet === false && (
            <>
              <span className="profile__name">Wallet: </span>
              <input
                className="profile__input"
                placeholder="Enter your wallet"
                onChange={(e) => setWallet(e.target.value)}
              />
            </>
          )}
          {isWallet === true && (
            <span className="profile__name">Wallet: {wallet}</span>
          )}
          <WalletBtn
            btnData={btnData}
            handleWalletAdd={handleWalletAdd}
            handleWalletChange={handleWalletChange}
            userName={userName}
            wallet={wallet}
          />
        </div>
        <div className="profile__wrap">
          <span className="profile__name">
            Network(s):
            {network
              ? network.map((el, index) => (
                  <div className="profile__name-network" key={index}>
                    - {el}
                  </div>
                ))
              : "No networks"}
          </span>
          <NetworkAddBtn btnData={"Add"} click={handleNetworkAdd} />
        </div>
      </div>
      <AddNetworkModal
        modal={modal}
        setModal={setModal}
        updateNetwork={updateNetwork}
      />
    </>
  );
};

export default Profile;
