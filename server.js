require("dotenv").config();

const PORT = process.env.PORT || 8888;
const ENV = process.env.ENV || "development";
const express = require("express");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

