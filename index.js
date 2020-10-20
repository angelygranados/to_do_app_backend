const express = require("express");
const cors = require("cors");
const app = express();

const { config } = require("./config/index");
const usersApi = require("./routes/users.js");

//bodyparser
app.use(express.json());
app.use(cors());
usersApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
