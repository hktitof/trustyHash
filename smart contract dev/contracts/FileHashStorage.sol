// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title FileHashStorage
 * @author : Ferax
 * @notice : Check the contract that i have created and try to understand it, also check the unit tests, in the test folder "test/Hash.ts"
 */

contract FileHashStorage {
    struct HashEntry {
        address storedBy;
        string dateStored;
        string note;
    }

    mapping(bytes32 => HashEntry) private hashEntries;
    bytes32[] private hashList;

    error NoteTooLong();
    error HashAlreadyExists();
    error HashDoesNotExist();



    function storeHash(bytes32 fileHash, string memory date, string memory note) public {
        if (bytes(note).length > 25) {
            revert NoteTooLong();
        }
        if (hashEntries[fileHash].storedBy != address(0)) {
            revert HashAlreadyExists();
        }

        HashEntry memory newEntry = HashEntry({
            storedBy: msg.sender,
            dateStored: date,
            note: note
        });

        hashEntries[fileHash] = newEntry;
        hashList.push(fileHash);
    }

    function checkHash(bytes32 fileHash) public view returns (bool exists) {
        return hashEntries[fileHash].storedBy != address(0);
    }

    function getHashData(bytes32 fileHash) public view returns (address, string memory, string memory) {
        if (hashEntries[fileHash].storedBy == address(0)) {
            revert HashDoesNotExist();
        }
        HashEntry memory entry = hashEntries[fileHash];

        return (entry.storedBy, entry.dateStored, entry.note);
    }

    function getTotalHashes() public view returns (uint) {
        return hashList.length;
    }
}