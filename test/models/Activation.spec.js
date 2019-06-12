// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const ActivationModel = require('../../models/Activation');
const UserModel = require('../../models/User');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Activation Model>', () => {
    // Initialize model
    const Activation = ActivationModel(sequelize, dataTypes);

    // Create an instance of model
    const ActivationInstance = new Activation();

    // Test model name
    describe('Name', () => checkModelName(Activation)('Activation'));

    // Test model properties
    describe('Properties', () => {
        ['code', 'activated_at', 'user_id'].forEach(
            checkPropertyExists(ActivationInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const User = UserModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Activation.associate({ User }));

        // belongs to one User
        it( 'belongs to one user', 
            () => expect(Activation.belongsTo).to.have.been.calledWith(User) );
    });
});