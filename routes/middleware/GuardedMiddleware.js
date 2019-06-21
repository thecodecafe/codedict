/**
 * Guarded Middleware
 * ------------------
 * Used to implement access control on routes.
 * @author Daniel Barde <http://github.com/thecodecafe>
 */

const { hasRoles } = require('../../modules/UserRoleCheck');

// export middleware
module.exports = roles => async (req, res, next) => {
  // If user does not belong reuturn access denied error
  if(await hasRoles(res.userId, roles)){
    return res
      .status(403)
      .json({
        success: false,
        message: 'Invalid access'
      });
  }
  // move to next middleware
  next();
};