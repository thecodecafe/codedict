'use strict';
/**
 * Reminder Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  const Reminder = Sequelize.define('Reminder',
    {
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
    },
    {
      underscored: true,
      tableName: 'reminders'
    }
  );

  // Define associations
  Reminder.associate = ({ User }) => {
    // User association
    Reminder.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user'
    });
  };

  // return model
  return Reminder;
};