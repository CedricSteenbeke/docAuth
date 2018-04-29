pragma solidity ^0.4.18;

import "./Mortal.sol";

contract DocAuth is Mortal {// Mortal inherits Owned !

    struct DocMetadata {
        bytes32 title;
        bytes32 author;
        bytes32 email;
        uint256 dateWritten;
    }
    /**
     * Events
     */
    event DocumentRegistered(bytes _documentHash);

    // variables
    mapping(bytes => DocMetadata) registeredDocuments;
    mapping(bytes => address)     documentToOwner;
    mapping(address => bytes[])   ownerToDocument;
    mapping(address => uint256)     ownerDocumentCount;

    // constructor
    function DocAuth(){
        owned();
    }

    function registerDocument(bytes _documentHash, bytes32 _title, bytes32 _author, bytes32 _email, uint256 _dateWritten) public returns (bool){
        require(documentToOwner[_documentHash] == 0);
        registeredDocuments[_documentHash] = DocMetadata(_title, _author, _email, _dateWritten);

        documentToOwner[_documentHash] = msg.sender;
        ownerToDocument[msg.sender].push(_documentHash);
        ownerDocumentCount[msg.sender] ++;

        // emit event
        DocumentRegistered(_documentHash);
        return true;
    }

    function checkDocumentExistence(bytes _documentHash) public view returns (bool){
        if (documentToOwner[_documentHash] == 0) {
            return false;
        }
        return true;
    }

    function getDocumentMetadata(bytes _documentHash) public view returns (bytes32, bytes32, bytes32, uint256){
        require(documentToOwner[_documentHash] != 0);
        DocMetadata storage dmd = registeredDocuments[_documentHash];
        return (dmd.title, dmd.author, dmd.email, dmd.dateWritten);
    }

    function getOwnerDocumentCount(address _docOwner) public view returns (uint256){
        return ownerDocumentCount[_docOwner];
    }

    function getDocumentsForOwner(address _docOwner, uint256 _documentId) public view returns (bytes){
        //should we check if uint256 is larger/smaller than ownerDocumentCount?
        return ownerToDocument[_docOwner][_documentId];
    }

    function remove() onlyOwner {
        kill();
    }
    // rejector
    function() public {throw;}
}
