const fs = require('fs');
const path = require('path');
const sequelize = require('../configs/sequelize');
const baseFileName = path.basename(__filename);
const db = {};

/**
 * This will be used to check if the passed
 * file is a valid model file this has
 * @param {String} modelFile
 */
const modelFilter = modelFile => {
  return modelFile.indexOf('.') !== 0
    && (modelFile !== baseFileName)
    && (modelFile.slice(-3) === '.js');
};

/**
 * This will import the model from the model file name
 * give and add it to the db object.
 * @param {String} modelFile
 */
const modelInitializer = modelFile => {
  const model = sequelize.import(path.join(__dirname, modelFile));
  db[model.name] = model;
};

/**
 * Here we read the model files from the models directory
 * and then for each file import it's model into seqeulize
 * and initialise the model.
 */
fs
  .readdirSync(__dirname)
  .filter(modelFilter)
  .forEach(modelInitializer);

/**
 * Here we initialize all model relationships using
 * the associate function.
 */
Object.keys(db).forEach(modelName => {
  // only if associate function is defined
  if (typeof db[modelName].associate === 'function'){
    // run model assocaite function, pass all models
    db[modelName].associate(db);
  }
});

// add sequelize instnce to db bject
db.sequelize = sequelize;

// export db
module.exports = db;