/* global it */
const DocAuthTest = artifacts.require("DocAuth.sol");
//const DocAuthFactoryTest = artifacts.require("DocAuthFactory.sol");

contract('DocAuth', (accounts) => {
  const docHash = "6EAFF5056948D7D28A58E56461D09B1A";
  const docTitle = "Intro to the assignment";
  const author = "Leander Hoedt";
  const email = "leander@truffle.com";
  const dateWritten = 1522678399;

  it("should register a new document", () => {
    let docAuthInstance;
    return DocAuthTest.deployed().then((instance) => {
      docAuthInstance = instance;
      docAuthInstance.registerDocument(
        docHash,
        docTitle,
        author,
        email,
        dateWritten,
        { from: accounts[0] }
        );
    }).then(() => {
      return docAuthInstance.checkDocumentExistence(docHash);
    }).then((storedData) => {
      assert.equal(storedData, true, "The document has been registered");
    });
  });

  it("should return document metadata", () => {
    return DocAuthTest.deployed().then((docAuthInstance) => {
      return docAuthInstance.getDocumentMetadata.call(docHash);
    }).then(docMetaData => {
      assert.equal(web3.toAscii(docMetaData[0]).replace(/\u0000/g, ''), docTitle);
      assert.equal(web3.toAscii(docMetaData[1]).replace(/\u0000/g, ''), author);
      assert.equal(web3.toAscii(docMetaData[2]).replace(/\u0000/g, ''), email);
      assert.equal(docMetaData[3], dateWritten);
    })
  });

  it("Should return the number 1 for amount of documents found", () => {
    return DocAuthTest.deployed().then((docAuthInstance) => {
      return docAuthInstance.getOwnerDocumentCount(accounts[0]);
    }).then(docCount =>{
      assert.equal(docCount, 1);
    });
  });

  it("Should return the docHash", () => {
    return DocAuthTest.deployed().then((docAuthInstance) => {
      return docAuthInstance.getDocumentsForOwner(accounts[0], 0);
    }).then(foundDocHash => {
      assert.equal(web3.toAscii(foundDocHash), '6EAFF5056948D7D28A58E56461D09B1A');
    });
  });
});
