// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const ApiKeyModel = require('../../models/ApiKey');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<ApiKey Model>', () => {
    // Initialize model
    const ApiKey = ApiKeyModel(sequelize, dataTypes);

    // Create and instance of model
    const ApiKeyInstance = new ApiKey();

    // Test model name
    describe('Name', () => checkModelName(ApiKey)('ApiKey'));

    // Test model properties
    describe('Properties', () => {
        ['key', 'domains', 'blacklisted_at', 'expires_at'].forEach(
            checkPropertyExists(ApiKeyInstance)
        );
    });
});