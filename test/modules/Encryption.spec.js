require('../../configs/dotenv');

// require dependencies
const chai = require('chai');
const {encrypt, decrypt} = require('../../modules/Encryption');
const expect = chai.expect;


// describe file test
describe('<Module: Encryption>', () => {
  // test data
  const testData = "THIS IS TEST DATA";

  // Test encrypt function
  describe('Encrypt',  () => {
    // encrypted test data
    let  encryptedData = null;

    // should encrypt data
    it('should encrypt the test data', () => {
      // encrypt data
      encryptedData = encrypt(testData);
      // encrypted data is not null
      expect(encryptedData).to.not.equal(null);
    })

    // should be a string
    it('should be a string', () => expect(encryptedData).to.be.a('string'));

    // should not be same as test data
    it('should not be equal to test data', () => expect(encryptedData).to.not.be.equal(testData));

    // returned data should be null
    it('should be null for none string value', () => expect(encrypt(null)).to.be.a('null'));

    // returned data should be null
    it('data should be null for boolean:false', () => expect(encrypt(false)).to.be.a('null'));

    // returned data should be null
    it('data should be null for boolean:true', () => expect(encrypt(true)).to.be.a('null'));
  });

  // Test decrypt function
  describe('Decrypt',  () => {
    // encrypt the test data
    const decryptedData = decrypt(encrypt(testData));

    // returned data should not be null
    it('should not be null', () => expect(decryptedData).to.not.be.a('null'));

    // returned data should equal test data
    it('should be same as test data', () => expect(decryptedData).to.be.equal(testData));

    // returned data should be null
    it('should be null for null falue', () => expect(decrypt(null)).to.be.a('null'));

    // returned data should be null
    it('should be null for boolean:false', () => expect(decrypt(false)).to.be.a('null'));

    // returned data should be null
    it('should be null for boolean:true', () => expect(decrypt(true)).to.be.a('null'));

    // returned data should be null
    it('should be null for invalid data', () => expect(decrypt('Hello, World!')).to.be.a('null'));
  });

});