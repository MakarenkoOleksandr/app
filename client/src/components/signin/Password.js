import { useCallback, useEffect, useState } from "react";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SERVER from "../../config";

const Password = ({
  password,
  setPassword,
  availablePassword,
  setAvailablePassword,
  isAvailableUsername,
  setMessage,
}) => {
  const [confirmPassword, setConfirmPassword] = useState();
  const [isInputComplete, setIsInputComplete] = useState(false);

  const checkPasswordAvailability = useCallback(
    async (password, confirmPassword) => {
      try {
        const response = await fetch(`http://${SERVER}/user/checkPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, confirmPassword }),
        });

        const data = await response.json();

        setAvailablePassword(data.ok);
        isAvailableUsername === true
          ? setMessage(data.data)
          : setMessage("Username already exists");
      } catch (error) {
        console.error("Error checking password availability:", error);
      }
    },
    [setMessage, setAvailablePassword, isAvailableUsername]
  );

  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (password && confirmPassword) {
      setIsInputComplete(true);
      checkPasswordAvailability(password, confirmPassword);
    } else {
      setIsInputComplete(false);
    }
  }, [password, confirmPassword, checkPasswordAvailability]);

  return (
    <>
      <label className="form__register">
        Password:
        <input
          className="form__input"
          type="password"
          value={password}
          onChange={handleChangePass}
        ></input>
        {isInputComplete && (
          <FontAwesomeIcon
            className={
              availablePassword === true ? "checked-visible" : "checked-hide"
            }
            icon={faSquareCheck}
            style={{ color: "#00f0c0" }}
          />
        )}
        <FontAwesomeIcon
          className={
            availablePassword === false ? "checked-visible" : "checked-hide"
          }
          icon={faX}
          style={{ color: "#b71515" }}
        />
      </label>

      <label className="form__register">
        Confirm Password:
        <input
          className="form__input"
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPass}
        ></input>
        {isInputComplete && (
          <FontAwesomeIcon
            className={
              availablePassword === true ? "checked-visible" : "checked-hide"
            }
            icon={faSquareCheck}
            style={{ color: "#00f0c0" }}
          />
        )}
        <FontAwesomeIcon
          className={
            availablePassword === false ? "checked-visible" : "checked-hide"
          }
          icon={faX}
          style={{ color: "#b71515" }}
        />
      </label>
    </>
  );
};

export default Password;
