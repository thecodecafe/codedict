/**
 * Helper Functions Module
 * @var Object
 */
module.exports = {
  /**
   * This helps add a leading zero to a given number.
   * @requires String
   */
  addLeadingZero: number => {
    const str =  String(number).trim();
    if(str.length > 1) return str;
    if(str.length === 0) return '00';
    return '0' + str;
  }
};