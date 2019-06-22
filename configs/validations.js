const {check, body} = require('express-validator');
/**
 * Validations
 * -----------
 * This contains all the list of validations for every request, each list
 * of validation is retrieved by the supplied key name, we use the
 * express-validator in this project.
 * ====================================================
 * EXAMPLE
 * -------
 * login: [
 *  check('email')
 *    .isEmail()
 *    .withMessage('Please enter your email address'),
 *  body('password)
 *    .not()
 *    .isEmpty()
 *    .trim()
 *    .withMessage('Please enter a password')
 * ]
 * ====================================================
 * @author Daniel Barde <http://github.com/thecodecafe>
 */
module.exports = {};