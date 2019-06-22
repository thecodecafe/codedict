// include dotenv config
require('./dotenv');

// export db configs for different environments
module.exports = {
  /**
   * Database Username
   * @var string
   */
  username: process.env.DB_USER,

  /**
   * Database Password
   * @var string
   */
  password: process.env.DB_PASSWORD,

  /**
   * Database name
   * @var string
   */
  database: process.env.DB_NAME,

  /**
   * Database host
   * E.g. localhost
   * @var string
   */
  host: process.env.DB_HOST,

  /**
   * Database Dialect
   * E.g. mysql, mariadb, postgres, or mssql.
   * @var string
   */
  dialect: process.env.DB_DIALECT
};