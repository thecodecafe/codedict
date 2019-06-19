/**
 * API Key Checkers.
 * This ensures that an api key is presend
 * in the request and the the passed api key is valid.
 * @author Daniel Barde <http://github.com/thecodecafe>
 * @var Function
 */

const db = require('../models');
const { ApiKey } = db;
const { Op } = require('sequelize');

// export module
module.exports = {
  /**
 * Checks to see if a given api key has already expired.
 * @param {String} key
 * @returns Boolean
 */
  hasExpired: async key => {
    // api key has expired
    return await ApiKey
      .count({
        where: {
          key: key,
          expires_at: {
            [Op.gt]: new Date().toISOString()
          }
        }
      }) ? false : true;
  },

  /**
   * Checks to see if a given api key has been blacklisted.
   * @param {String} key
   * @returns Boolean
   */
  isBlacklisted: async key => {
    // api key has not expired
    return await ApiKey.count({
      where: {
        key,
        blacklisted_at: null
      }
    }) ? false : true;
  },

  /**
   * Checks to see if a given api key exists.
   * @param {String} key
   * @returns Boolean
   */
  doesntExist: async key => {
    // api key has not expired
    const exists = await ApiKey.count({ where: { key } }) ? true : false;
    // check if nothing was returned
    return exists < 1 ? true : false;
  },

  /**
   * Check if the api key is set to allow request
   * from the passed domain.
   * @param {String} key
   * @param {String} domain
   * @returns Boolean
   */
  doesntAllowDomain: async (domain, key) => {
    // api key has not expired
    const apiKey = await ApiKey.findOne({ where: { key } });

    // if no domain is set return false
    if (apiKey === null
        || apiKey.domains === "*"
        || !apiKey.domains
    ) return false;

    // get list of allowed domains
    const domains = apiKey.domains.split(',');

    // check if passed domain is in the list of alled domains
    return domains.filter(item => domain === item.trim()).length < 1;
  }
};