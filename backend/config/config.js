require("dotenv").config();
const env = process.env.NODE_ENV || "development";

module.exports = {
  [env]: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "postgres",
    migrationStorageTableName: "_migrations",
    seedDb: process.env.NODE_ENV === "development",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
