const NetworkAddBtn = ({ btnData, click }) => {
  return (
    <button className="profile__action" onClick={() => click()}>
      {btnData}
    </button>
  );
};

export default NetworkAddBtn;
