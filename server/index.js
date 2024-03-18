const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

const USER_ROUTE = "/user";
const userRoute = require("./routes/user");

(async function connecting() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to the DB");
  } catch (error) {
    console.log("ERROR: DB is not running");
  }
})();

mongoose.set("debug", true);

app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use(express.json());
app.use(USER_ROUTE, userRoute);
app.listen(PORT, () => {});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
