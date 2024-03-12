import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import Submit from "../btn/Submit";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ email, message, btnData }) => {
  const [code, setCode] = useState("");
  const [availableCode, setAvailableCode] = useState(null);
  const navigate = useNavigate();

  const confirmed = async (e, email) => {
    e.preventDefault();
    const updateParam = "confirmed";
    const updateStatus = "true";
    try {
      const response = await fetch(
        `http://localhost:4040/user/update?email=${email}&update=${updateParam}&status=${updateStatus}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.ok) {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  const checkConfirmationCode = useCallback(
    async (email) => {
      try {
        const response = await fetch(
          `http://localhost:4040/user/checkUser?email=${email}`,
          { method: "POST" }
        );

        const data = await response.json();

        if (
          data.data.confirmationCode === code &&
          code.length === data.data.confirmationCode.length
        ) {
          setAvailableCode(true);
        } else if (
          data.data.confirmationCode !== code &&
          code.length === data.data.confirmationCode.length
        ) {
          setAvailableCode(false);
        } else setAvailableCode(null);
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    },
    [code, setAvailableCode]
  );

  const handleCodeInput = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkConfirmationCode(email);
    };

    fetchData();
  }, [email, checkConfirmationCode]);

  return (
    <>
      <main className="main">
        {message && <p className="main__form-message">{message}</p>}
        <form className="main__form form" onSubmit={(e) => confirmed(e, email)}>
          <label className="form__register">
            Confirmation Code:
            <input
              className="form__input"
              placeholder="Enter Confirmation Code"
              value={code}
              onChange={handleCodeInput}
            />
            <FontAwesomeIcon
              className={
                availableCode === true ? "checked-visible" : "checked-hide"
              }
              icon={faSquareCheck}
              style={{ color: "#00f0c0" }}
            />
            <FontAwesomeIcon
              className={
                availableCode === false ? "checked-visible" : "checked-hide"
              }
              icon={faX}
              style={{ color: "#b71515" }}
            />
          </label>
          <Submit
            className={
              availableCode !== true ? "form__submit--disabled" : "form__submit"
            }
            data={btnData}
          />
        </form>
      </main>
    </>
  );
};

export default Confirmation;
