pragma solidity ^0.4.18;

contract DocAuth {
    
    struct DocMetadata {
        bytes32 title;
        bytes32 author;
        bytes32 email;
        uint256 dateWritten;
    }
    
    mapping (bytes32 => DocMetadata) registeredDocuments;
    mapping (bytes32 => address)     documentToOwner;
    mapping (address => bytes32[])   ownerToDocument;
    mapping (address => uint256)        ownerDocumentCount;
    
    function registerDocument(bytes32 _documentHash, bytes32 _title,  bytes32 _author, bytes32 _email, uint256 _dateWritten) public returns (bool){
        require(documentToOwner[_documentHash] == 0);
        registeredDocuments[_documentHash] = DocMetadata(_title, _author, _email, _dateWritten);
        documentToOwner[_documentHash] = msg.sender;
        ownerDocumentCount[msg.sender] ++;
        return true;
    }
    
    function checkDocumentExistence(bytes32 _documentHash) public view returns (bool){
        if(documentToOwner[_documentHash] == 0){
            return false;
        }
        return true;
    }
    
    function getDocumentMetadata(bytes32 _documentHash) public view returns (bytes32, bytes32, bytes32, uint256){
        require(documentToOwner[_documentHash] != 0);
        DocMetadata storage dmd = registeredDocuments[_documentHash];
        return (dmd.title, dmd.author, dmd.email, dmd.dateWritten);
    }

    function getOwnerDocumentCount(address _docOwner) public view returns(uint256){
        return ownerDocumentCount[_docOwner];
    }
    
    function getDocumentsForOwner(address _docOwner, uint256 _documentId) public view returns(bytes32){
        return ownerToDocument[_docOwner][_documentId];
    }
}