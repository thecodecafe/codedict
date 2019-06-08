const Sql = require('sequelize');

/**
 * Initialize a sequelize database connection.
 * @var Object
 */
const sequelize = new Sql(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// export sequelize
module.exports = sequelize;