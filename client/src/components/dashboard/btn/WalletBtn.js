const WalletBtn = ({
  btnData,
  handleWalletAdd,
  handleWalletChange,
  userName,
  wallet,
}) => {
  return (
    <button
      className="profile__action"
      onClick={
        btnData === "Add"
          ? () => handleWalletAdd(userName, "metamask", wallet)
          : handleWalletChange
      }
    >
      {btnData}
    </button>
  );
};

export default WalletBtn;
