const { appKey } = require('../configs/app');
const aes = require("crypto-js/aes");
const utf8Enc = require("crypto-js/enc-utf8");

// export module
module.exports = {
  /**
 * Encrypts any given data using advanced
 * encryption standard.
 * @param {String} data
 * @returns String
 */
  encrypt: data => {
    // check if passed data if not of the allowed type and return null
    if (typeof data !== 'string') return null;

    // encrypt and return data
    return aes.encrypt(data, appKey).toString();
  },

  /**
   * Decrypts any system encrypted data using the
   * advanced encryption standard.
   * @param {String} data
   * @returns String
   */
  decrypt: data => {
    // return null if data is a string
    if (typeof data !== 'string') return null;
    // decrypt data
    const decrypted = aes.decrypt(data, appKey).toString(utf8Enc);
    // return decrypted data
    return decrypted ? decrypted : null;
  }
};