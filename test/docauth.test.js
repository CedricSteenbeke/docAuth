/* global it */
const DocAuthTest = artifacts.require("DocAuth.sol");
const DocAuthFactoryTest = artifacts.require("DocAuthFactory.sol");

contract('DocAuth', (accounts) => {
  const docHash = "6EAFF5056948D7D28A58E56461D09B1AAA0345399F624D0CFBC856E64FB69FBC";
  const docTitle = "Intro to the assignment";
  const author = "Leander Hoedt";
  const email = "leander@truffle.com";
  const dateWritten = 1522678399;

  it("should register a new document", () => {
    let docAuthInstance;
    return DocAuthTest.deployed().then((instance) => {
      docAuthInstance = instance;
      return docAuthInstance.registerDocument(
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
      return docAuthInstance.getDocumentMetadata(docHash);
    }).then(docMetaData => {
      assert.equal(web3.toAscii(docMetaData[1].valueOf()), docTitle);
      assert.equal(web3.toAscii(docMetaData[2]).replace(/\u0000/g, ''), author);
      assert.equal(web3.toAscii(docMetaData[3]).replace(/\u0000/g, ''), email);
      assert.equal(docMetaData[4], dateWritten);
    })
  });
});
