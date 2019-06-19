/**
 * API Key Verification Middleware.
 * This ensures that an api key is presend
 * in the request and the the passed api key is valid.
 * @author Daniel Barde <http://github.com/thecodecafe>
 * @var Function
 */

// require dependencies
const { decrypt } = require('../../modules/Encryption');
const {
  isBlacklisted,
  hasExpired,
  doesntExist,
  doesntAllowDomain
} = require('../../modules/ApiKeyValidators');

// default response object
const responseObject = {
  success: false,
  message: 'Access denied'
};

// export module
module.exports = async (req, res, next) => {
  // get api key from header
  const key = decrypt(res.get('X-API-KEY'));

  // deny access if api key doesn't exist
  if (doesntExist(key))
    return res.status(403).json(responseObject);

  // deny access if api dow not allow the origin's host
  if (doesntAllowDomain(req.get('host'), key))
    return res.status(403).json(responseObject);

  // deny access if api key is blacklisted
  if (isBlacklisted(key))
    return res.status(403).json(responseObject);

  // deny access if expired
  if (hasExpired(key))
    return res.status(403).json(responseObject);

  // all checks passed move to next middleware
  next();
};