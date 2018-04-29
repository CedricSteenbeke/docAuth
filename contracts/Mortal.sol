pragma solidity ^0.4.18;

contract Mortal {
    function kill() {
        if (msg.sender == owner) selfdestruct(owner);
    }
}