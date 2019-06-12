// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const RoleModel = require('../../models/Role');
const UserModel = require('../../models/User');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Role Model>', () => {
    // Initialize model
    const Role = RoleModel(sequelize, dataTypes);

    // Create an instance of model
    const RoleInstance = new Role();

    // Test model name
    describe('Name', () => checkModelName(Role)('Role'));

    // Test model properties
    describe('Properties', () => {
        ['name', 'display_name'].forEach(
            checkPropertyExists(RoleInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const User = UserModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Role.associate({ User }));

        // belongs to many User
        it( 'belongs to many User', 
            () => expect(Role.belongsToMany).to.have.been.calledWith(User) );
    });
});