const Submit = ({ data, className }) => {
  return (
    <button className={className} type="submit">
      {data}
    </button>
  );
};

export default Submit;
