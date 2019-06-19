require('../../configs/dotenv');
const chai = require('chai');
const {
  doesntAllowDomain,
  doesntExist,
  isBlacklisted,
  hasExpired
} = require('../../modules/ApiKeyValidators');
const expect = chai.expect;
const db = require('../../models');
const { ApiKey } = db;

const DummyKey = {
  key: 'this-is-a-dummy-key',
  expires_at: new Date(
    new Date().getTime() + ((60 * 60 * 24) * 1000)
  ).toISOString(),
  domains: '*'
};

// Decribe module functions
describe('<API Key Checkers>', () => {

  // create test api key
  before(async () => {
    // check if key already exists in the db
    let apiKey = await ApiKey.findOne({where: {key: DummyKey.key}});
    // destroy if found
    if(apiKey) await apiKey.destroy();
  });

  // check key exists
  describe('Does Not Exist', async () => {
    // test key container
    let apiKey = null;

    // create test api key
    before(async () => {
      apiKey = await ApiKey.create(DummyKey); 
    });

    // api key should exist
    it(
      'exists', 
      async () => expect( await doesntExist(DummyKey.key) ).to.be.false
    );

    // api key should not exist
    it(
      'does not exist', 
      async () => expect( await doesntExist('Foo-Bar') ).to.be.true
    );

    // delete the created api key
    after(async () => await apiKey.destroy());
  });

  // expired check
  describe('Has Expired', async () => {
    // test key container
    let apiKey = null;

    // create test api key
    before(async () => {
      apiKey = await ApiKey.create(DummyKey); 
    });

    // key should have not expired
    it('has not expired', async () => {
      expect(await hasExpired(DummyKey.key)).to.be.false;
    });

    // key should have expired now
    it('has expired', async () => {
      // set key to expiry date to to past
      apiKey.expires_at = new Date( new Date().getTime() - 3600000 ).toISOString();
      // save the change
      await apiKey.save();
      // check if expired
      expect(await hasExpired(DummyKey.key)).to.be.true
    });

    // delete the created api key
    after(async () => await apiKey.destroy());
  });

  // blacklisted check
  describe('Is Blacklisted', async () => {
    // test key container
    let apiKey = null;

    // create test api key
    before(async () => {
      apiKey = await ApiKey.create(DummyKey); 
    });

    // key should have not be blacklisted
    it('is not blacklisted', async () => {
      expect(await isBlacklisted(DummyKey.key)).to.be.false;
    });

    // key should be lacklisted
    it('is blacklisted', async () => {
      // set key to blacklisted date
      apiKey.blacklisted_at = new Date( new Date().getTime() - 3600000 ).toISOString();
      // save the change
      await apiKey.save();
      // check if black listed
      expect(await isBlacklisted(DummyKey.key)).to.be.true
    });

    // delete the created api key
    after(async () => await apiKey.destroy());
  });

  // allowed domains check
  describe('Doesnt Allow Domain', async () => {
    // test key container
    let apiKey = null;
    const domains = 'facebook.com, google.com, www.facebook.com';
    const domain = domains.split(',')[0].trim();
    const anyDomain = 'twitter.com';

    // create test api key
    before(async () => {
      apiKey = await ApiKey.create(DummyKey); 
    });

    // should allow any domain
    it('allows any domain', async () => {
      expect(await doesntAllowDomain(anyDomain, DummyKey.key)).to.be.false;
    });

    // should not allow any domain
    it('does not allow any domain', async () => {
      // set key to blacklisted date
      apiKey.domains = domains;
      // save the change
      await apiKey.save();
      // check if black listed
      expect(await doesntAllowDomain(anyDomain, DummyKey.key)).to.be.true
    });

    // should allow th stored domain
    it('allows stored domain', async () => {
      // check if black listed
      expect(await doesntAllowDomain(domain, DummyKey.key)).to.be.false
    });

    // delete the created api key
    after(async () => await apiKey.destroy());
  });
});