'use strict';
const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');

/**
 * ApiKey model.
 * @var class
 */
class ApiKey extends Model {}

/**
 * Initialize ApiKey model
 * @var object
 */
ApiKey.init({
  key: {
    type: Sql.TEXT,
    allowNull: false,
  },
  domains: {
    type: Sql.TEXT,
    allowNull: false,
  },
  blacklisted_at: {
    type: Sql.DATE,
    allowNull: true,
    defaultValue: null,
  }
}, {
  underscored: true,
  tableName: 'api_keys',
  sequelize
});


// Export ApiKey model
module.exports = ApiKey;