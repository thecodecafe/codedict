'use strict';
const { DataTypes } = require('sequelize');

/**
 * Model properties.
 */
const Props = {
  key: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  domains: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  blacklisted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
};

/**
 * ApiKey Model
 * @param {Object} Sequelize
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const ApiKey = Sequelize.define(
    'ApiKey',
    Props,
    {underscored: true, tableName: 'api_keys'}
  );
  // Return model
  return ApiKey;
};