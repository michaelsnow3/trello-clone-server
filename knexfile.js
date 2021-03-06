require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    ssl: true,
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations"
    }
  }
};
