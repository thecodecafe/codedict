// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const ReactionModel = require('../../models/Reaction');
const UserModel = require('../../models/User');
const TermModel = require('../../models/Term');
const DefinitionModel = require('../../models/Definition');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Reaction Model>', () => {
    // Initialize model
    const Reaction = ReactionModel(sequelize, dataTypes);

    // Create an instance of a model
    const ReactionInstance = new Reaction();

    // Test model name
    describe('Name', () => checkModelName(Reaction)('Reaction'));

    // Test model properties
    describe('Properties', () => {
        ['type', 'reactable_id', 'reactable_type', 'reactor_id'].forEach(
            checkPropertyExists(ReactionInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const User = UserModel(sequelize, dataTypes);
        const Term = TermModel(sequelize, dataTypes);
        const Definition = DefinitionModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Reaction.associate({ User, Term, Definition }));

        // belongs to one User
        it('belongs to one User',
            () => expect(Reaction.belongsTo).to.have.been.calledWith(User));
        // belongs to one Term
        it('belongs to one Term',
            () => expect(Reaction.belongsTo).to.have.been.calledWith(Term));
        // belongs to one Definition
        it('belongs to one Definition',
            () => expect(Reaction.belongsTo).to.have.been.calledWith(Definition));
    });
});