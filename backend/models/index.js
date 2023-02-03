const dbConfig = require("../config/config.js")[process.env.NODE_ENV];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  underscored: true,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.file = require("./file.model.js")(sequelize, Sequelize);
db.folder = require("./folder.model.js")(sequelize, Sequelize);
module.exports = db;
