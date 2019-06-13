/**
 * Generates the basic many to many relations
 * prerequisites.
 * @param {String} pivotTable
 * @param {String} foreignKey
 * @param {String} otherKey
 * @param {String} alias
 */
function ManyToManyGenerator(pivotTable, foreignKey, otherKey, alias){
  return {
    through: pivotTable,
    foreignKey: foreignKey,
    otherKey: otherKey,
    as: alias
  };
}

// export function as module
module.exports = ManyToManyGenerator;