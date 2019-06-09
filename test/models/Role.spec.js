// load dependencies
const chai = require('chai');
const sinonChai = require('sinon-chai');
const RoleModel = require('../../models/Role');
const UserModel = require('../../models/User');
chai.use(sinonChai);
const expect = chai.expect;
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');

// Describe file test
describe('<Role Model Test>', () => {
    // Initialize model
    const Role = RoleModel(sequelize, dataTypes);
    const role = new Role();

    // Check role name
    describe('Model Name', () => checkModelName(Role)('Role'));

    // Check role properties
    describe('Model Properties', async () => {
        ['name', 'display_name'].forEach(
            checkPropertyExists(role)
        );
    });

    // User association
    describe('User Association', () => {
        // Initialize user model
        const User = UserModel(sequelize, dataTypes);

        // Associate user before running test
        before(() => Role.associate({ User }));

        // Check user association
        it( 'should be a belongs to many', 
            () => expect(Role.belongsToMany).to.have.been.calledWith(User) );
    });
});