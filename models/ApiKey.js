'use strict';
/**
 * ApiKey Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const ApiKey = Sequelize.define('ApiKey', {
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    domains: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blacklisted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    underscored: true,
    tableName: 'api_keys',
  });
  // Return model
  return ApiKey;
};