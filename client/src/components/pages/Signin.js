import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Mail from "../signin/Mail";
import Password from "../signin/Password";
import Submit from "../btn/Submit";
import Confirmation from "../signin/Confirmation";
import SERVER from "../../config";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("Please fill form below");
  const [btnData, setBtnData] = useState("Register");

  const [isAvailableUsername, setAvailableUsername] = useState(null);
  const [availablePassword, setAvailablePassword] = useState(null);

  const [registrationStep, setRegistrationStep] = useState(1);

  const sendConfirmationCode = async () => {
    try {
      await fetch(`http://${SERVER}/user/confirmUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error("Error sending confirmation code:", error);
    }
  };

  const register = async (e) => {
    const confirmationCode = uuidv4();

    e.preventDefault();
    try {
      const response = await fetch(`http://${SERVER}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setRegistrationStep(2);
        setBtnData("Confirm");
        sendConfirmationCode();
        setMessage("We have send confirmation code to your email");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Error during registration. Please try again.");
    }
  };

  return (
    <main className="main">
      {registrationStep === 1 && (
        <form className="main__form form" onSubmit={register}>
          <Mail
            email={email}
            setEmail={setEmail}
            isAvailableUsername={isAvailableUsername}
            setAvailableUsername={setAvailableUsername}
            setMessage={setMessage}
          />
          <Password
            password={password}
            setPassword={setPassword}
            availablePassword={availablePassword}
            setAvailablePassword={setAvailablePassword}
            isAvailableUsername={isAvailableUsername}
            setMessage={setMessage}
          />
          <Submit
            className={
              isAvailableUsername !== true || availablePassword !== true
                ? "form__submit--disabled"
                : "form__submit"
            }
            data={btnData}
          />
        </form>
      )}

      {registrationStep === 2 && (
        <Confirmation email={email} message={message} btnData={btnData} />
      )}
    </main>
  );
};

export default Signin;
