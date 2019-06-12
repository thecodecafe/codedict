'use strict';
/**
 * User Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User',
    {
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING
      },
      provider: {
        type: DataTypes.STRING
      } // local or github
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );
  
  // Create associations
  User.associate = ({
    Role,
    Context,
    Term,
    Definition,
    Point,
    Reaction,
    Reminder,
    Activation
  }) => {
    // Roles association
    User.belongsToMany(Role, {
      as: 'roles',
      through: 'RoleUser',
      foreignKey: 'user_id',
      otherKey: 'role_id'
    });

    // Contexts association
    User.hasMany(Context, {
      as: 'contexts',
      foreignKey: 'creator_id'
    });

    // Contributions association
    User.belongsToMany(Term, {
      as: 'contributions',
      through: 'Contributor',
      foreignKey: 'contributor_id',
      otherKey: 'term_id'
    });

    // Created Definitions association
    User.hasMany(Definition, {
      as: 'createdDefinitions',
      foreignKey: 'creator_id'
    });

    // Edited Definitions association
    User.hasMany(Definition, {
      as: 'editedDefinitions',
      foreignKey: 'editor_id'
    });

    // Created Terms association
    User.hasMany(Term, {
      as: 'createdTerms',
      foreignKey: 'creator_id'
    });

    // Edited Terms association
    User.hasMany(Term, {
      as: 'editedTerms',
      foreignKey: 'editor_id'
    });

    // Point association
    User.hasMany(Point, {
      as: 'points',
      foreignKey: 'user_id'
    });

    // Reaction association
    User.hasMany(Reaction, {
      as: 'reactions',
      foreignKey: 'reactor_id'
    });

    // Reminder association
    User.hasOne(Reminder, {
      as: 'reminders',
      foreignKey: 'user_id'
    });

    // Activation association
    User.hasOne(Activation, {
      as: 'activations',
      foreignKey: 'user_id'
    });
  };

  // return model
  return User;
};