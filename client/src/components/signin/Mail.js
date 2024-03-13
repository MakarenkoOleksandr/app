import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import SERVER from "../../config";

const Mail = ({
  email,
  setEmail,
  setMessage,
  isAvailableUsername,
  setAvailableUsername,
}) => {
  const [isInputComplete, setIsInputComplete] = useState(false);

  const checkUsernameAvailability = useCallback(
    async (email) => {
      try {
        const response = await fetch(`${SERVER}/user/checkEmail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        setAvailableUsername(data.ok);
        setMessage(data.data);
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    },
    [setMessage, setAvailableUsername]
  );

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  useEffect(() => {
    const fullyTyped = email && email.endsWith(".com");
    const fetchData = async () => {
      await checkUsernameAvailability(email);
    };

    if (fullyTyped) {
      setIsInputComplete(true);
      fetchData();
    }
  }, [email, checkUsernameAvailability]);

  return (
    <label className="form__register">
      Mail:
      <input
        className={`form__input ${
          isInputComplete === true
            ? isAvailableUsername === false
              ? "form__unavailable"
              : "form__available"
            : ""
        }`}
        placeholder="Enter Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <FontAwesomeIcon
        className={
          isAvailableUsername === true ? "checked-visible" : "checked-hide"
        }
        icon={faSquareCheck}
        style={{ color: "#00f0c0" }}
      />
      <FontAwesomeIcon
        className={
          isAvailableUsername === false ? "checked-visible" : "checked-hide"
        }
        icon={faX}
        style={{ color: "#b71515" }}
      />
    </label>
  );
};

export default Mail;
