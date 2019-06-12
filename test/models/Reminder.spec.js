// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const ReminderModel = require('../../models/Reminder');
const UserModel = require('../../models/User');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Reminder Model>', () => {
    // Initialize model
    const Reminder = ReminderModel(sequelize, dataTypes);

    // Create an instance of model
    const ReminderInstance = new Reminder();

    // Test model name
    describe('Name', () => checkModelName(Reminder)('Reminder'));

    // Test model properties
    describe('Properties', () => {
        ['code', 'expires_at', 'user_id'].forEach(
            checkPropertyExists(ReminderInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize model
        const User = UserModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Reminder.associate({ User }));

        // Belongs to one User
        it( 'belongs to one user', 
            () => expect(Reminder.belongsTo).to.have.been.calledWith(User) );
    });
});