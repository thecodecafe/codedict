// load dependencies
const {
    sequelize,
    dataTypes,
    checkPropertyExists,
    checkModelName
} = require('sequelize-test-helpers');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const PointModel = require('../../models/Point');
const UserModel = require('../../models/User');
const TermModel = require('../../models/Term');
const DefinitionModel = require('../../models/Definition');
chai.use(sinonChai);
const expect = chai.expect;

// Describe file test
describe('<Point Model>', () => {
    // Initialize model
    const Point = PointModel(sequelize, dataTypes);

    // Create an instance of model
    const PointInstance = new Point();

    // Test model name
    describe('Name', () => checkModelName(Point)('Point'));

    // Test model properties
    describe('Properties', () => {
        ['type', 'pointable_id', 'pointable_type', 'user_id', 'amount'].forEach(
            checkPropertyExists(PointInstance)
        );
    });

    // Test associations
    describe('Associations', () => {
        // Initialize models
        const User = UserModel(sequelize, dataTypes);
        const Term = TermModel(sequelize, dataTypes);
        const Definition = DefinitionModel(sequelize, dataTypes);

        // Associate models before running test
        before(() => Point.associate({ User, Term, Definition }));

        // belongs to one User
        it('belongs to one User',
            () => expect(Point.belongsTo).to.have.been.calledWith(User));
        // belongs to one Term
        it('belongs to one Term',
            () => expect(Point.belongsTo).to.have.been.calledWith(Term));
        // belongs to one Definition
        it('belongs to one Definition',
            () => expect(Point.belongsTo).to.have.been.calledWith(Definition));
    });
});