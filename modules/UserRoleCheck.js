/**
 * User Role Check Module
 * ----------------------
 * Helpers for checking user role relationships.
 * @author Daniel Barde <http://github.com/thecodecafe>
 */

const db = require('../models');
const { User } = db;

// export module
module.exports = {
  hasRoles: async (userId, roles) => {
    // fetch user from db
    const user = await User.findOne({ where: { id: userId } });

    // Check if user has a relationship with the supplied roles
    return user && await user.countRoles({
      where: {name: roles.split(',')}
    }) ? true : false;
  }
};