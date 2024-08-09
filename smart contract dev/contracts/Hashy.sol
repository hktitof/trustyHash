// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// create custom error 25 characters max
error NoteLengthExceedsLimit();

// create custom is Hash already exists
error HashAlreadyExists();

contract Hashy {
    // create variable for total hashes
    uint256 public totalHashes = 0;

    // create a struct HashData with the following properties: string note, uint256 dateStored,address storedBy
    struct HashData {
        bytes note; // 25 bytes limit, representing a 25-character string
        uint256 dateStored; // block.timestamp which is the current block timestamp as seconds since unix epoch
        address storedBy; // msg.sender
    }
    struct HashAndData {
        bytes32 hash;
        HashData hashData;
    }



    // mapping of hash to HashData : hash => HashData, which means that we can access the HashData struct by passing in the hash
    mapping(bytes32 => HashData) public proofOfWork;

    // create an array of bytes32 that stores hashes
    bytes32[] public hashes;

    // create mapping that maps on proofOfWork that has address as key and byte32 as value
    /**
     * @notice @note : the use of the mapping to to get the hash stored by a specific wallet address
     */
    mapping(address => bytes32[]) public proofOfWorkByAddress;

    // store the hash in the mapping
    function storeHash(bytes32 hash, bytes memory note) public {
        // check if the note is less than or equal 25 characters, otherwise throw an error TooLongMax25Chars, use the require function
        if (note.length > 25) revert NoteLengthExceedsLimit();

        // check if hash exist using the verifyHash function, otherwise throw an error HashDoesNotExist, use the require function
        if (verifyHash(hash)) revert HashAlreadyExists();

        // create a new HashData struct with the note, block.timestamp and msg.sender
        HashData memory newHashData = HashData({
            note: note,
            dateStored: block.timestamp,
            storedBy: msg.sender
        });

        // store the hash in the mapping
        proofOfWork[hash] = newHashData;

        // store the sender address in the mapping proofOfWorkByAddress and add the hash to the array
        proofOfWorkByAddress[msg.sender].push(hash);

        // store the hash into the array hashes
        hashes.push(hash);

        // increment the totalHashes
        totalHashes++;
    }

    // function that verify if the hash exists and return boolean true or false
    function verifyHash(bytes32 hash) public view returns (bool) {
        // check if the hash exists , otherwise return false
        /**
         * 
         * @param user @note : address(0) means that the address is empty, it's typically 0x
         */
        return proofOfWork[hash].storedBy != address(0);
    }

    // function that will get the hash data by passing in the hash
    function getHashData(bytes32 hash) public view returns (HashData memory) {

        // return the hash data
        return proofOfWork[hash];
    }

    // function that get all hashes stored by a specific address
    function getHashesByAddress(address user) public view returns (bytes32[] memory) {
        return proofOfWorkByAddress[user];
    }

    // function that get the number of hashes stored by a specific address
    function getNumberOfHashesByAddress(address user) public view returns (uint256) {
        return proofOfWorkByAddress[user].length;
    }

    // function that get the total number of hashes stored
    function getTotalHashes() public view returns (uint256) {
        return totalHashes;
    }

    // get the total number of hashes stored by a specific address
    function getTotalHashesByAddress(address user) public view returns (uint256) {
        return proofOfWorkByAddress[user].length;
    }

    // get a number of hashes based on the paramert number passed in of last hashes stored
    function getLastHashes(uint256 number) public view returns (bytes32[] memory) {
        // create a new array of bytes32 with the length of the number passed in
        bytes32[] memory lastHashes = new bytes32[](number);

        // loop through the hashes array and get the last number of hashes
        for (uint256 i = 0; i < number; i++) {
            lastHashes[i] = hashes[hashes.length - (i + 1)];
        }

        // return the array of hashes
        return lastHashes;
    }

    // get the latest hashes with the their hashes data, using HashAndData
    function getLastHashesWithData(uint256 number) public view returns (HashAndData[] memory) {
        // create a new array of HashAndData with the length of the number passed in
        HashAndData[] memory lastHashes = new HashAndData[](number);

        // loop through the hashes array and get the last number of hashes
        for (uint256 i = 0; i < number; i++) {
            // get the hash
            bytes32 hash = hashes[hashes.length - (i + 1)];

            // get the hash data
            HashData memory hashData = proofOfWork[hash];

            // create a new HashAndData struct
            HashAndData memory newHashAndData = HashAndData({
                hash: hash,
                hashData: hashData
            });

            // store the new HashAndData struct into the array
            lastHashes[i] = newHashAndData;
        }

        // return the array of hashes
        return lastHashes;
    }

  
}
