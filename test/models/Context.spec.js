// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const ContextModel = require('../../models/Context');
const UserModel = require('../../models/User');
const TermModel = require('../../models/Term');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Context Model>', () => {
    // Initialize model
    const Context = ContextModel(sequelize, dataTypes);

    // Create an instance of model
    const ContextInstance = new Context();

    // Test model name
    describe('Name', () => checkModelName(Context)('Context'));

    // Test model properties
    describe('Properties', () => {
        ['name', 'creator_id'].forEach(
            checkPropertyExists(ContextInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const User = UserModel(sequelize, dataTypes);
        const Term = TermModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Context.associate({ User, Term }));

        // belongs to one User
        it('belongs to one User',
            () => expect(Context.belongsTo).to.have.been.calledWith(User));
        // has many Term
        it('has many Term',
            () => expect(Context.hasMany).to.have.been.calledWith(Term));
    });
});