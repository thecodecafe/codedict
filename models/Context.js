'use strict';
/**
 * Context Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const Context = Sequelize.define('Context', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    }
  }, {
      underscored: true,
      tableName: 'contexts',
    })

  // Define associations
  Context.associate = ({ User }) => {
    // User association
    Context.belongsTo(User, {
      foreignKey: 'creator_id',
      as: 'creator',
      targetKey: 'id'
    });
  };

  // Return model
  return Context;
};