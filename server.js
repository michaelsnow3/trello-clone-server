require("dotenv").config();

// database setup
const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// server setup
const PORT = process.env.PORT || 8888;
const express = require("express");
const app = express();

// express middleware
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors()).use(bodyParser());

// knex queries
const selectQueries = require("./knexQueries/selectQueries.js")(knex);
const insertQueries = require("./knexQueries/insertQueries.js")(knex);

// user endpoints
const userRoutes = require("./server-endpoints/userRoutes");
app.use("/user/", userRoutes(insertQueries, selectQueries));

// board endpoints
const boardRoutes = require("./server-endpoints/boardRoutes");
app.use("/board/", boardRoutes(insertQueries, selectQueries));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
