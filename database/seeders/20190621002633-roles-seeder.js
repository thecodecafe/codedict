'use strict';

module.exports = {
  /**
  * Add altering commands here.
  * Return a promise to correctly handle asynchronicity.
  */
  up: queryInterface => queryInterface.bulkInsert('roles', [
    {
      name: 'admin',
      display_name: 'Admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      name: 'user',
      display_name: 'User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      name: 'moderator',
      display_name: 'Moderator',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ], {}),

  /**
   * Add reverting commands here.
   * Return a promise to correctly handle asynchronicity.
   */
  down: (queryInterface, {Op}) => queryInterface.bulkDelete('roles', {
    [Op.or]: [{name: 'admin'}, {name: 'user'}, {name: 'moderator'}]
  }, {})
};
