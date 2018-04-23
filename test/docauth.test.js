/* global it */
const DocAuthTest = artifacts.require("DocAuth.sol");

contract('DocAuth', function(accounts) {

  it("should commit document Hash", function() {
    return DocAuthTest.deployed().then(function(instance) {
      docAuthInstance = instance;
      var docHash = "6EAFF5056948D7D28A58E56461D09B1AAA0345399F624D0CFBC856E64FB69FBC";
      var docTitle = "Intro to the assignment";
      var author = "Cedric";
      var email = "cedric@truffle.com";
      var dWritten = 1522678399;
      return docAuthInstance.registerDocument(docHash, docTitle, author, email, dWritten, {from: accounts[0]});
    }).then(function() {
      return docAuthInstance.checkDocumentExistence("6EAFF5056948D7D28A58E56461D09B1AAA0345399F624D0CFBC856E64FB69FBC");
    }).then(function(storedData){
      assert.equal(storedData, true, "The document has been stored");
    });
  });

  /*it("Should retrieve the owner 'Cedric'", function(){
    return DocAuth.deployed().then(function(instance) {
      docAuthInstance = instance;
      return docAuthInstance.getDocumentMetadata("6EAFF5056948D7D28A58E56461D09B1AAA0345399F624D0CFBC856E64FB69FBC");
    }).then(function(storedData){
      assert.equal(web3.toAscii(storedData[1]), "Cedric", "The owner is Cedric");
    });
  });*/
});
