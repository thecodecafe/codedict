require('../../configs/dotenv');
const chai = require('chai');
const { hasRoles } = require('../../modules/UserRoleCheck');
const expect = chai.expect;
const db = require('../../models');
const { User, Role } = db;

// Describe file test
describe('<Module: UserRoleCheck>', async () => {
  // create test role 1
  let role1 = await Role.findOne({ where: { name: 'TEST_role1' } });
  if (!role1) role1 = await Role.create({
    name: 'TEST_role1',
    display_name: 'TEST Role 1'
  });

  // create test role 2
  let role2 = await Role.findOne({ where: { name: 'TEST_role2' } });
  if (!role2) role2 = await Role.create({
    name: 'TEST_role2',
    display_name: 'TEST Role 2'
  });

  // create test role 3
  let role3 = await Role.findOne({ where: { name: 'TEST_role3' } });
  if (!role3) role3 = await Role.create({
    name: 'TEST_role3',
    display_name: 'TEST Role 3'
  });

  // create test user
  let user = await User.findOne({ where: { email: 'jon@89359383489.none' } });
  if (!user) user = await User.create({
    name: 'Jon Doe',
    email: 'jon@89359383489.none',
    password: 'password',
    provider: 'local',
  });

  // associate user with roles
  await user.setRoles([role1, role2]);

  describe('Has Role Checks',  async () => {
    // Check if user belongs to one of attached roles
    it(
      'Has Role: ' + role1.name + '.',
      async () => expect(
        await hasRoles(user.id, role1.name)
      ).to.be.true
    );
    // Check if user belongs to all of attached roles
    it(
      'Has Roles: ' + role1.name + ' & ' + role2.naame + '.',
      async () => expect(
        await hasRoles(user.id, role1.name + ',' + role2.name)
      ).to.be.true
    );
    // Check if user does not belong to non-attached role
    it(
      'Does Not Have Role: ' + role3.name + '.',
      async () => expect(
        await hasRoles(user.id, role3.name)
      ).to.be.false
    );
  });

  // clear all created data
  after(async () => {
    // delete test role 1
    if (role1) await role1.destroy();
    // delete test role 2
    if (role2) await role2.destroy();
    // delete test role 3
    if (role3) await role3.destroy();
    // delete test user
    if (user) await user.destroy();
  });
});


