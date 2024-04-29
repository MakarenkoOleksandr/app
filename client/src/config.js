const SERVER =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:4040"
    : "https://lemon-gorilla-slipCyclicDB";

export default SERVER;
