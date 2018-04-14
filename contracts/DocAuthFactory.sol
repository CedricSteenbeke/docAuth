pragma solidity ^0.4.18;
import "DocAuth.sol";

contract DocAuthFactory {
    address owner;
    address docAuth;

    modifier onlyOwner {
        if (msg.sender == owner)
            _
    }

    function DocAuthFactory(){
        owner == msg.sender;
        docAuth = new DocAuth();
    }

    //Update the docAuth contract
    //used when there is a new version
    function setDocAuth() constant onlyOwner returns (bool res){
        docAuth = new DocAuth();
        return true;
    }

    function getDocAuth() returns (address da){
        return docAuth;
    }

    function remove() onlyOwner{
        selfdestruct(owner)
    }

}