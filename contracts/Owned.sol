pragma solidity ^0.4.18;

contract Owned {
    address owner;

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    function owned() public {
        owner = msg.sender;
    }

    function changeOwner(address newOwner) onlyOwner public {
        owner = newOwner;
    }

    function getOwner() constant public returns (address) {
        return owner;
    }
}