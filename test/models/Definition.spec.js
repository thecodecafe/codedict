const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const DefinitionModel = require('../../models/Definition');
const TermModel = require('../../models/Term');
const UserModel = require('../../models/User');
const ReactionModel = require('../../models/Reaction');

describe('<Definition Model>', () => {
    // initialize model
    const Definition = DefinitionModel(sequelize, dataTypes);

    // instantiate model
    const DefinitionInstance = new Definition();

    // Test model name
    describe('Name', () => checkModelName(Definition)('Definition'));

    // Test model properties
    describe('Properties', () => {
        ['body', 'type', 'creator_id', 'term_id', 'editor_id', 'edit_comment'].forEach(
            checkPropertyExists(DefinitionInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // initialize models
        const Term = TermModel(sequelize, dataTypes);
        const Reaction = ReactionModel(sequelize, dataTypes);
        const User = UserModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Definition.associate({
            Term,
            Reaction,
            User
        }));

        // belongs to many User
        it('belongs to one User',
            () => expect(Definition.belongsTo).to.have.been.calledWith(User));

        // belongs to Term
        it('belongs to Term',
            () => expect(Definition.belongsTo).to.have.been.calledWith(Term));

        // has many Reaction
        it('has many Reaction',
            () => expect(Definition.hasMany).to.have.been.calledWith(Reaction));
    });

});