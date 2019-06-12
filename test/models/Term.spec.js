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
const TermModel = require('../../models/Term');
const UserModel = require('../../models/User');
const ContextModel = require('../../models/Context');
const DefinitionModel = require('../../models/Definition');
const ReactionModel = require('../../models/Reaction');

describe('<Term Model>', () => {
    // Initialize model
    const Term = TermModel(sequelize, dataTypes);

    // Create an instance of model
    const TermInstance = new Term();

    // Test model name
    describe('Name', () => checkModelName(Term)('Term'));

    // Test model properties
    describe('Properties', () => {
        ['body', 'creator_id', 'editor_id', 'edit_comment', 'context_id'].forEach(
            checkPropertyExists(TermInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const Context = ContextModel(sequelize, dataTypes);
        const Definition = DefinitionModel(sequelize, dataTypes);
        const Reaction = ReactionModel(sequelize, dataTypes);
        const User = UserModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Term.associate({
            Context,
            Term,
            Definition,
            Reaction,
            User
        }));

        // belongs to on Context
        it('belongs to on Context',
            () => expect(Term.belongsTo).to.have.been.calledWith(Context));

        // belongs to many User
        it('belongs to one User',
            () => expect(Term.belongsTo).to.have.been.calledWith(User));

        // belongs to many User
        it('belongs to many User',
            () => expect(Term.belongsToMany).to.have.been.calledWith(User));

        // has many Definition
        it('has many Definition',
            () => expect(Term.hasOne).to.have.been.calledWith(Definition));

        // has many Reaction
        it('has many Reaction',
            () => expect(Term.hasMany).to.have.been.calledWith(Reaction));
    });

});