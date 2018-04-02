pragma solidity ^0.4.18;

contract DocAuth {
    
    struct DocMetadata {
        bytes title;
        bytes author;
        bytes email;
        uint dateWritten;
    }
    
    mapping (bytes32 => DocMetadata) registeredDocuments;
    mapping (bytes32 => address)     documentToOwner;
    mapping (address => bytes32[])   ownerToDocument;
    mapping (address => uint)        ownerDocumentCount;
    
    function registerDocument(bytes32 _documentHash, bytes _title,  bytes _author, bytes _email, uint _dateWritten) public returns (bool){
        require(documentToOwner[_documentHash] == 0);
        registeredDocuments[_documentHash] = DocMetadata(_title, _author, _email, _dateWritten);
        documentToOwner[_documentHash] = msg.sender ;
        ownerDocumentCount[msg.sender] ++;
        return true;
    }
    
    function checkDocumentExistence(bytes32 _documentHash) public view returns (bool){
        if(documentToOwner[_documentHash] == 0){
            return false;
        }
        return true;
    }
    
    function getDocumentMetadata(bytes32 _documentHash) public view returns (bytes, bytes, bytes, uint){
         require(documentToOwner[_documentHash] != 0);
         DocMetadata storage dmd = registeredDocuments[_documentHash];
         return (dmd.title, dmd.author, dmd.email, dmd.dateWritten);
    }

    function getOwnerDocumentCount(address _docOwner) public view returns(uint){
        return ownerDocumentCount[_docOwner];
    }
    
    function getDocumentsForOwner(address _docOwner, uint _documentId) public view returns(bytes32){
        return ownerToDocument[_docOwner][_documentId];
    }
}