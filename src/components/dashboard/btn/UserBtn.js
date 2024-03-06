const UserBtn = ({ btnData, click }) => {
  return (
    <button
      className="profile__action"
      onClick={() => click("loggined", "false")}
    >
      {btnData}
    </button>
  );
};

export default UserBtn;
