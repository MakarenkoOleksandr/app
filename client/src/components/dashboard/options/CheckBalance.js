import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SERVER from "../../../config";

const CheckBalance = () => {
  const [balance, setBalance] = useState(null);
  const [net, setNet] = useState();
  const [wallet, setWallet] = useState();
  const [message, setMessage] = useState(
    "Here will be shown your current balance"
  );

  const user = localStorage.getItem("userData");
  const userName = JSON.parse(user)?.email;

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
          setNet(data.data.network);
          setWallet(data.data.metamask);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCheck = async (network) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(network.rpc));

    try {
      const checkBalance = await web3.eth.getBalance(wallet);
      const nativeBalance = web3.utils.fromWei(checkBalance, "ether");
      const balance = parseFloat(nativeBalance).toFixed(4);

      setBalance(balance.toString());
      setMessage(`Balance at ${network.name} is ${balance} ${network.token}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="balance">
      {message && <h2 className="balance__message">{message}</h2>}
      {net &&
        net.map((el, idx) => (
          <div className="balance__wrap" key={idx}>
            <div className="balance__item">
              <span className="balance__head">- Network - : </span> {el.name}
              <span className="balance__head">- Token - : </span> {el.token}
              <button
                className="balance__action"
                onClick={() => handleCheck(el)}
              >
                Check
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CheckBalance;
