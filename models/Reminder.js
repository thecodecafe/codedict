'use strict';
const { DataTypes } = require('sequelize');

const Props = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

/**
 * Defines owner relationship.
 * @param {Object} Model
 * @param {Object} User
 */
const OwnerAssociation = (Model, User) => {
  Model.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'owner'
  });
};

/**
 * Reminder Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = Sequelize => {
  const Reminder = Sequelize.define(
    'Reminder',
    Props,
    {underscored: true, tableName: 'reminders'}
  );

  // Define associations
  Reminder.associate = ({ User }) => OwnerAssociation(Reminder, User);

  // return model
  return Reminder;
};