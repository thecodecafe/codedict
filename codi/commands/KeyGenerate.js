const AES = require('crypto-js/aes');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const uuid4 = require('uuid/v4');
const chalk = require('chalk');
const { appName } = require('../../configs/app');
const placeholder = 'APP_KEY=[Generate App KEY]';

/**
 * This prints out the ney api key and
 * domains associated with it.
 * @param {String} newKey
 */
const printKey = newKey => {
  console.log('App Key  :    ' + chalk.green(newKey));
  console.log(chalk.hex('#FFA500').bold(
    'IMPORTANT:    All pre existing api keys and token are invalid.'
  ));
};

/**
 * Extracts and returns the text content of the env file.
 * @returns String
 */
const getEnvContent = () => readFileSync(
  path.join(process.cwd(), '.env'),
  { encoding: 'utf-8' }
);

/**
 * Updates the env file with the new content including the
 * new key
 * @param {String} content
 * @returns Void
 */
const updateEnvContent = content => writeFileSync(
  path.join(process.cwd(), '.env'),
  content,
  { encoding: 'utf-8' }
);

/**
 * Adds the APP_KEY prop if missing in env content.
 * @param {String} content
 * @returns String
 */
const addEnvKeyProps = content => {
  // no need if app key prop already exists
  if (content.indexOf('APP_KEY=') !== -1) return content;
  // look for first double line break
  let position = content.indexOf('\n\n');
  // loop for first single line break if no double
  if (position === -1) position = content.indexOf('\n');
  // return with line brack abd content appended if no line break
  if (position === -1) return placeholder + '\n' + content;
  // get pre line break if first  line break position is 0
  const preNewline = position > 0 ? '\n' : '';
  // return content placed right before found line break
  return content.substr(0, position)
    + preNewline
    + placeholder
    + content.substr(position);
};

/**
 * Inserts the new api key into the env content.
 * @param {String} key
 * @param {String} content
 * @returns String
 */
const addNewAppKeyToEnvContent = (key, content) => addEnvKeyProps(content)
  .replace(
    /^([\s\S]+)?APP_KEY=.+([\s\S]+)?$/gm,
    (match, before, after) => `${before}APP_KEY="${key}"\n${after}`
  )
  .replace(/\r\n{2,}|\n{2,}|\r{2,}/g, `\n\n`);

/**
 * Export command as module.
 * @var Object
 * @property {String} command
 * @property {String} description
 * @property {Function} handler
 * @property {Object} builder
 */
module.exports = {
  /**
   * The commands name is used to compare with what
   * gets passed in the terminal and if it matches,
   * the fire method gets called.
   * @var String
   */
  command: 'key:generate',

  /**
   * This description here is used to explain what
   * the command does when listing all possible
   * codi commands.
   * @var String
   */
  description: 'Generates a new app key.',

  /**
   * The fire method is called when the command
   * matches the name of the command within this file.
   * @var Function
   */
  handler: async () => {
    // generate new random key
    const key = AES.encrypt(uuid4(), appName);

    // update the dot env file with the new app key
    updateEnvContent(
      addNewAppKeyToEnvContent(
        key, getEnvContent()
      )
    );

    // print key to console
    printKey(key);

    // exit process
    process.exit();
  }
};