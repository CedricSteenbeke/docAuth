pragma solidity ^0.4.18;

contract DocAuth {
    address owner;

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
    event DocumentExists(bytes _documentHash, bool exists);

    mapping(bytes => DocMetadata) registeredDocuments;
    mapping(bytes => address)     documentToOwner;
    mapping(address => bytes[])   ownerToDocument;
    mapping(address => uint256)     ownerDocumentCount;

    function DocAuth(){
        owner = msg.sender;
    }

    function registerDocument(bytes _documentHash, bytes32 _title, bytes32 _author, bytes32 _email, uint256 _dateWritten) public returns (bool){
        require(documentToOwner[_documentHash] == 0);
        registeredDocuments[_documentHash] = DocMetadata(_title, _author, _email, _dateWritten);

        documentToOwner[_documentHash] = msg.sender;
        ownerToDocument[msg.sender].push(_documentHash);
        ownerDocumentCount[msg.sender] ++;

        DocumentRegistered(_documentHash);
        return true;
    }

    function checkDocumentExistence(bytes _documentHash) public view returns (bool){
        bool exists;
        if (documentToOwner[_documentHash] == 0) {
            exists = false;
        }
        exists = true;
        DocumentExists(_documentHash, exists);
        return exists;
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

    function remove() {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
    // rejector
    function() public {throw;}
}
