/* global it */
//const DocAuthFactoryTest = artifacts.require("DocAuthFactory.sol");
require('truffle-test-utils').init();
const DocAuthTest = artifacts.require("DocAuth.sol");

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
      return docAuthInstance.checkDocumentExistence.call(docHash);
    }).then((storedData) => {
      assert.equal(storedData, true, "The document has been registered");
    })
  });

  it('should trigger an event when document is registered', () => {
    let docAuthInstance;
    return DocAuthTest.deployed().then((instance) => {
      docAuthInstance = instance;
      return docAuthInstance.registerDocument(
        "d80904d6370e366b9b58548549992934167d4513cb850e3f26ba243c34835323",
        "DocTitle.pdf",
        "Cedric Steenbeke",
        "cedric@truffle.com",
        1522678399,
        { from: accounts[0] }
      )
    }).then((result) => {
      assert.web3Event(result, {
        event: 'DocumentRegistered',
        args: {
          _documentHash: web3.fromAscii('d80904d6370e366b9b58548549992934167d4513cb850e3f26ba243c34835323')
        }
      }, 'The event DocumentRegistered is emitted');
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

  it("Should return 2 for amount of documents found", () => {
    return DocAuthTest.deployed().then((docAuthInstance) => {
      return docAuthInstance.getOwnerDocumentCount(accounts[0]);
    }).then(docCount => {
      assert.equal(docCount, 2);
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
