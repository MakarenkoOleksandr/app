const SERVER =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "localhost:4040"
    : "lemon-gorilla-slip.cyclic.app";

export default SERVER;
