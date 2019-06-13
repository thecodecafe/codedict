/**
 * Generates the basic
 * polymorphic relations prerequisites.
 * @param {String} morphName
 * @param {String} morphType
 * @param {String} alias
 */
function PolymorphicGenerator(morphName, morphType, alias){
  return {
    foreignKey: `${morphName}_id`,
    as: alias,
    scope: {[`${morphName}_type`]: morphType}
  };
}

// export function as module
module.exports = PolymorphicGenerator;