var DocAuthFactory = artifacts.require("./DocAuthFactory.sol");
var DocAuth = artifacts.require("./DocAuth.sol");

module.exports = function(deployer) {
  deployer.deploy(DocAuthFactory);
  deployer.deploy(DocAuth);
};
