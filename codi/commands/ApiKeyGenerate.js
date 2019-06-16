const AES = require("crypto-js/aes");
const uuid4 = require('uuid/v4');
const chalk = require('chalk');
const { appKey } = require('../../configs/app');
const db = require('../../models');
const { ApiKey } = db;
const secondsPerDay = (60 * 60) * 24;

/**
 * This prints out the ney api key and
 * domains associated with it.
 * @param {String} newKey
 * @param {String} domains
 */
const printKey = (newKey, domains = 'n/a') => {
  console.log('API Key  :    ' + chalk.green(newKey));
  console.log('Domains  :    ' + chalk.green(domains));
  console.log(
    chalk.red.bold('IMPORTANT:    You only get to see this once keep it safe.')
  );
};

/**
 * This calculates and returns a date timestamp based on the
 * age passed.
 * @param {Number} age number of days.
 * @returns string
 */
const getExpirationDate = age => {
  // check if age is not a number
  if(typeof age !== 'number'){
    console.error(TypeError('Age must be a numeric value.'));
    process.exit(1);
  }

  // get the expiration time this is age time plus current time.
  const expTime = (new Date().getTime() / 1000 + (age * secondsPerDay)) * 1000;

  // get instance of new date object with date and time set to exp time
  return new Date(expTime).toISOString();
};

module.exports = {
  /**
   * The commands name is used to compare with what
   * gets passed in the terminal and if it matches,
   * the fire method gets called.
   * @var String
   */
  command: 'api:key:generate',

  /**
   * This description here is used to explain what
   * the command does when listing all possible
   * codi commands.
   * @var String
   */
  description: 'Will generate a new api key, and possibly black .',

  /**
   * Here we define available options for the command.
   * @property {Number} age number of days the cose should be valid for
   * @property {String} domains single or comma seperated domains
   */
  builder: {
    age: {
      alias: 'a',
      default: 365,
      numeric: true
    },
    domains: {
      alias: 'd',
      default: '*',
      description: 'Single or comma seperated list of domains'
    }
  },

  /**
   * The fire method is called when the command
   * matches the name of the command within this file.
   * @var Function
   */
  handler: async argv => {
    // exists is false by default
    let exists = false;
    // perform operation to generate a new api key
    do{
      // generate new random key
      const key = uuid4();
      // check if the api key exists
      exists = await ApiKey.count({where: {key: key}});
      // store key in db if not exist
      if(!exists) {
        // store new api key in database
        const newKey = await ApiKey.create({
          expires_at: getExpirationDate(argv.age),
          domains: argv.domains || '*',
          key: key
        });
        // Encrypt key and display to human
        printKey(AES.encrypt(newKey.key, appKey), newKey.domains);
        // exit process
        process.exit();
      }
    }while(exists);
  }
};