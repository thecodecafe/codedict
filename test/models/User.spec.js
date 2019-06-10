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
const UserModel = require('../../models/User');
const RoleModel = require('../../models/Role');
const ActivationModel = require('../../models/Activation');
const ReminderModel = require('../../models/Reminder');
const ContextModel = require('../../models/Context');
const TermModel = require('../../models/Term');
const DefinitionModel = require('../../models/Definition');
const PointModel = require('../../models/Point');
const ReactionModel = require('../../models/Reaction');

describe('<User Model>', () => {
    // Initialize user model
    const User = UserModel(sequelize, dataTypes);

    // Instantiate user
    const UserInstance = new User();

    // Test model name
    describe('Name', () => checkModelName(User)('User'));

    // Test model properties
    describe('Properties', () => {
        ['name', 'email', 'password', 'avatar', 'provider'].forEach(
            checkPropertyExists(UserInstance)
        );
    });

    // Test model associations
    describe('Associations', () => {
        // Initialize models
        const Role = RoleModel(sequelize, dataTypes);
        const Activation = ActivationModel(sequelize, dataTypes);
        const Reminder = ReminderModel(sequelize, dataTypes);
        const Context = ContextModel(sequelize, dataTypes);
        const Term = TermModel(sequelize, dataTypes);
        const Definition = DefinitionModel(sequelize, dataTypes);
        const Reaction = ReactionModel(sequelize, dataTypes);
        const Point = PointModel(sequelize, dataTypes);

        // Associate user with role
        before(() => User.associate({
            Role,
            Activation,
            Reminder,
            Context,
            Term,
            Definition,
            Reaction,
            Point,
        }));

        // belongs many Role
        it('belongs to many Role',
            () => expect(User.belongsToMany).to.have.been.calledWith(Role));

        // has one Activation
        it('has one Activation',
            () => expect(User.hasOne).to.have.been.calledWith(Activation));

        // has one Reminder
        it('has one Reminder',
            () => expect(User.hasOne).to.have.been.calledWith(Reminder));

        // has many Context
        it('has many Context',
            () => expect(User.hasMany).to.have.been.calledWith(Context));

        // has many Term
        it('has many Term',
            () => expect(User.hasMany).to.have.been.calledWith(Term));

        // belongs to many Term
        it('belongs to many Term',
            () => expect(User.belongsToMany).to.have.been.calledWith(Term));

        // has many Definition
        it('has many Definition',
            () => expect(User.hasMany).to.have.been.calledWith(Definition));

        // has many Reaction
        it('has many Reaction',
            () => expect(User.hasMany).to.have.been.calledWith(Reaction));

        // has many Point
        it('has many Point',
            () => expect(User.hasMany).to.have.been.calledWith(Point));
    });

});