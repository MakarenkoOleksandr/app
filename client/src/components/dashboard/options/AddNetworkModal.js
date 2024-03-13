import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SERVER from "../../../config";

const AddNetworkModal = ({ modal, setModal, updateNetwork }) => {
  const [name, setName] = useState();
  const [token, setToken] = useState();
  const [rpc, setRpc] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const user = localStorage.getItem("userData");
  const userName = JSON.parse(user)?.email;

  const addNetwork = async () => {
    try {
      const response = await fetch(`http://${SERVER}:4040/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userName,
          param: "network",
          value: {
            name: name,
            token: token,
            rpc: rpc,
          },
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setMessage("");
        setTimeout(() => {
          setModal(false);
          updateNetwork();
        }, 10);
        navigate("/dashboard/profile");
      } else {
        setMessage(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNetwork();
  };

  return (
    <div
      className={
        modal === false ? "profile__add-network" : "profile__add-network active"
      }
    >
      {message && <p className="modal-message">{message}</p>}
      <form
        className="options__add-network-modal modal"
        onSubmit={handleSubmit}
      >
        <label className="modal__network">
          Name:
          <input
            className="modal__network-input"
            placeholder="Enter network name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="modal__network">
          Token:
          <input
            className="modal__network-input"
            placeholder="Enter token name"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
        <label className="modal__network">
          RPC:
          <input
            className="modal__network-input"
            placeholder="Enter rpc HTTP"
            value={rpc}
            onChange={(e) => setRpc(e.target.value)}
          />
        </label>
        {name && token && rpc && (
          <button className="modal__submit">Submit</button>
        )}
      </form>
      <button
        className="modal__submit modal__submit--close"
        onClick={() => {
          setModal(false);
          setName("");
          setToken("");
          setRpc("");
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AddNetworkModal;
