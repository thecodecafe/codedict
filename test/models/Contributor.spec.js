// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const ContributorModel = require('../../models/Contributor');
const UserModel = require('../../models/User');
const TermModel = require('../../models/Term');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Contributor Model>', () => {
    // Initialize model
    const Contributor = ContributorModel(sequelize, dataTypes);

    // Create an instance of model
    const ContributorInstance = new Contributor();

    // Test model name
    describe('Name', () => checkModelName(Contributor)('Contributor'));

    // Test model properties
    describe('Properties', () => {
        ['subscribed', 'term_id', 'contributor_id'].forEach(
            checkPropertyExists(ContributorInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const User = UserModel(sequelize, dataTypes);
        const Term = TermModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Contributor.associate({ User, Term }));

        // belongs to one User
        it('belongs to one User',
            () => expect(Contributor.belongsTo).to.have.been.calledWith(User));
        // belongs to one Term
        it('belongs to one Term',
            () => expect(Contributor.belongsTo).to.have.been.calledWith(Term));
    });
});