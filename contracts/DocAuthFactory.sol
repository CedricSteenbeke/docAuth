pragma solidity ^0.4.18;
import "./DocAuth.sol";
import "./Owned.sol";
import "./Mortal.sol";

contract DocAuthFactory is Owned, Mortal {
    address docAuth;

    function DocAuthFactory(){
        owned();
        docAuth = address(new DocAuth());
    }

    //Update the docAuth contract
    //used when there is a new version
    function setDocAuth() constant onlyOwner returns (bool res){
        docAuth = address(new DocAuth());
        return true;
    }

    function getDocAuth() returns (address da){
        return docAuth;
    }

    function remove() onlyOwner{
        DocAuth(docAuth).remove();
        kill();
    }

}