import { useState } from "react";
import Submit from "../btn/Submit";
import SERVER from "../../config";

const Login = ({ user, setState }) => {
  const [email, setEmail] = useState(user);
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("Please fill your data");

  const hanleSubmit = async (e, email, password) => {
    e.preventDefault();
    const updateParam = "loggined";
    const updateStatus = "true";

    try {
      const response = await fetch(`${SERVER}user/checkUser?email=${email}`, {
        method: "POST",
      });

      const data = await response.json();
      if (data.ok) {
        if (password === data.data.password) {
          setMessage("Login successfully");
          await fetch(
            `${SERVER}/user/update?email=${email}&update=${updateParam}&status=${updateStatus}`,
            { method: "POST" }
          );

          const userData = { email };
          localStorage.setItem("userData", JSON.stringify(userData));

          setState(true);
        } else setMessage("Password is incorrect");
      }

      if (!data.ok) setMessage("Username not found");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {message && <p className="main__form-message">{message}</p>}
      <form
        className="main__form form"
        onSubmit={(e) => hanleSubmit(e, email, password)}
      >
        <label className="form__login">
          Login:
          <input
            className="form__input"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form__login">
          Password:
          <input
            className="form__input"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Submit className="form__submit" data={"Login"} />
      </form>
    </>
  );
};

export default Login;
