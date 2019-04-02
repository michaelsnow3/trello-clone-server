require("dotenv").config();
const bcrypt = require('bcrypt');

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
const updateQueries = require("./knexQueries/updateQueries.js")(knex);
const deleteQueries = require("./knexQueries/deleteQueries.js")(knex);

// user endpoints
const userRoutes = require("./serverEndpoints/userRoutes");
app.use("/user/", userRoutes(bcrypt, insertQueries, selectQueries));

// board endpoints
const boardRoutes = require("./serverEndpoints/boardRoutes");
app.use("/board/", boardRoutes(insertQueries, selectQueries, updateQueries, deleteQueries));

// list endpoints
const listRoutes = require("./serverEndpoints/listRoutes");
app.use("/list/", listRoutes(insertQueries, selectQueries, updateQueries, deleteQueries));

// card endpoints
const cardRoutes = require("./serverEndpoints/cardRoutes");
app.use("/card/", cardRoutes(insertQueries, selectQueries, updateQueries, deleteQueries));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
