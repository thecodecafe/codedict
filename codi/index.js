#!/usr/bin/env node

const { readdirSync } = require("fs");
const path = require("path");
const yargs = require('yargs').argv;
const defaultCommand = require('yargs').version('0.0.0');

// include dotenv config
require('../configs/dotenv');

/**
 * Here we read the commands folder and get the list
 * of files within they directory, we will use these
 * files to import commands.
 */
const files = readdirSync(path.join(__dirname, 'commands'));

/**
 * Here we keep a list of all iterated commands to show within
 * our terminal later a list of all available commands
 * with their available options.
 */
const commands = [];

/**
 * Here we loop through all our files and import their commands,
 * if any matches the command passed by the user, we simply
 * execute it, if not we move over to the next loop.
 */
for (let i = 0; i < files.length; i++) {
  // add command to commands list
  commands.push(
    require(path.join(__dirname, 'commands', files[i]))
  );
}

// get the passed command
const command = commands.find(item => item.name === yargs._[0]);

// Fire the found command
if (command) {
  // parse command
  require('yargs')
    .command(command)
    .help('h')
    .alias('h', 'help')
    .argv;
} else{
  // attach all possible commands to the default comment
  for (let i = 0; i < commands.length; i++) {
    // add command description to the default command as positional.
    defaultCommand.command(commands[i]);
  }
  
  // add help alias and parse argv
  defaultCommand
    .help('h')
    .alias('h', 'help')
    .argv;
}