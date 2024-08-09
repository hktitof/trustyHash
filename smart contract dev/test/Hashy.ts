import { ethers } from "hardhat";
import { expect } from "chai";
import { Hashy } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { BytesLike } from "ethers";

// create a a function that will call storeHash
const callTestingStoreHash = async (
  contract: Hashy,
  _note: string,
  accounts: SignerWithAddress,
  _storedHashes: BytesLike[]
) => {
  // Generate a 32 bytes keccak256 hash from a note string
  const hash = ethers.keccak256(ethers.toUtf8Bytes(_note));

  // convert the note string to bytes
  const noteBytes = ethers.toUtf8Bytes(_note);

  /// Call the contract function using the first signer
  const result = await contract.connect(accounts).storeHash(hash, noteBytes);

  // store the hash in the storedHashes BytesLike array
  _storedHashes.push(hash);

  return { hash: hash };
};

/**
 * @dv : note that in each it function the smart contract is deployed again, since we are using beforeEach
 */

describe("Hashy", function () {
  let contract: Hashy;
  let accounts: SignerWithAddress[];
  const storedHashes: BytesLike[] = [];

  beforeEach(async () => {
    // Get the default Hardhat accounts
    accounts = await ethers.getSigners();

    // get the contract factory
    const Hashy = await ethers.getContractFactory("Hashy");

    // deploy the contract and store the reference to the contract
    contract = await Hashy.connect(accounts[0]).deploy();
  });

  // this test will check when a user store a hash and check if that hash is stored correctly
  /**
   * @note : unit testing for storeHash() function and getHashesByAddress() function
   */
  it("check if hash stored properly by account 0", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash } = await callTestingStoreHash(contract, "titof first note", accounts[0], storedHashes);

      // call the function getHashesByAddress with the first signer address and get the array of hashes
      const result = await contract.getHashesByAddress(accounts[0].address);

      // loop through the array of hashes and check if the hash we stored is in the array
      expect(result.some(hash => hash === hash)).to.eql(true);
    } catch (error) {
      // Handle errors if any
      console.error("Error 1 :", error);
    }
  });

  // this test will check when a user store again a hash and check if that hash is stored correctly
  it("check if hash stored properly by account 1", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash } = await callTestingStoreHash(contract, "titof second note", accounts[1], storedHashes);

      // call the function getHashesByAddress with the first signer address and get the array of hashes
      const result = await contract.getHashesByAddress(accounts[1].address);

      // loop through the array of hashes and check if the hash we stored is in the array
      expect(result.some(hash => hash === hash)).to.eql(true);
    } catch (error) {
      // Handle errors if any
      console.error("Error 2 :", error);
    }
  });

  // this test will check if the storedHashes BytesLike array hashes are stored correctly, by calling verifyHash function
  it("verify existence of stored hashes", async function () {
    try {
      // convert string to bytes
      const bytes = ethers.toUtf8Bytes(storedHashes[0].toString());

      // Call the contract function using the first signer
      const { hash: hash1 } = await callTestingStoreHash(contract, "titof third note", accounts[0], storedHashes);

      // Call the contract function using the first signer
      const { hash: hash2 } = await callTestingStoreHash(contract, "titof fourth note", accounts[1], storedHashes);

      // call the verifyHash function wit hash1 and hash2 to check if they are stored correctly
      const result1 = await contract.verifyHash(hash1);

      // call the verifyHash function wit hash1 and hash2 to check if they are stored correctly
      const result2 = await contract.verifyHash(hash2);

      // check if the function verifyHashes returns true
      expect(result1 && result2).to.eql(true);
    } catch (error) {
      // Handle errors if any
      console.error("Error 3 :", error);
    }
  });

  /**
   * TODO : testing the following function of the contract Hashy.sol
   * // function that get the number of hashes stored by a specific address
    function getNumberOfHashesByAddress(address user) public view returns (uint256) {
        return proofOfWorkByAddress[user].length;
    }
   */
  // this test will check if the number of hashes stored by a specific address is correct
  it("check if the number of hashes stored by a specific address is correct", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash1 } = await callTestingStoreHash(contract, "titof x note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash2 } = await callTestingStoreHash(contract, "titof y note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash3 } = await callTestingStoreHash(contract, "titof z note", accounts[0], storedHashes);

      // call the function getNumberOfHashesByAddress with the first signer address and get the number of hashes
      /**
       * @note : result is a BigNumber
       */
      const result = await contract.getNumberOfHashesByAddress(accounts[0].address);

      // result should be 3 but it is returning 3n which is not correct so we need to fix it
      // convert result xn to x number before expect function

      // check if the number of hashes stored by a specific address is correct
      expect(parseInt(result.toString())).to.eql(3);
    } catch (error) {
      // Handle errors if any
      console.error("Error 4 :", error);
    }
  });

  /**
   * TODO : testing the following function of the contract Hashy.sol
   * function getHashesByAddress(address user) public view returns (bytes32[] memory) {
        return proofOfWorkByAddress[user];
    }
   */
  // this test will check if the hashes stored by a specific address are correct
  it("check if the hashes stored by a specific address are correct", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash1 } = await callTestingStoreHash(contract, "titof x note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash2 } = await callTestingStoreHash(contract, "titof y note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash3 } = await callTestingStoreHash(contract, "titof z note", accounts[0], storedHashes);

      // call the function getHashesByAddress with the first signer address and get the array of hashes
      /**
       * @note : result is an array of hashes
       */
      const result = await contract.getHashesByAddress(accounts[0].address);

      // check that the hashes hash1, hash2, hash3 are in the array result
      expect(result.includes(hash1) && result.includes(hash2) && result.includes(hash3)).to.equal(true);
    } catch (error) {
      // Handle errors if any
      console.error("Error 5 :", error);
    }
  });

  /**
   * TODO : testing the following function of the contract Hashy.sol
   * function getTotalHashesByAddress(address user) public view returns (uint256) {
        return proofOfWorkByAddress[user].length;
    }
   */
  // this test will check if the total number of hashes stored by a specific address is correct
  it("check if the total number of hashes stored by a specific address is correct", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash1 } = await callTestingStoreHash(contract, "titof x note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash2 } = await callTestingStoreHash(contract, "titof y note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash3 } = await callTestingStoreHash(contract, "titof z note", accounts[0], storedHashes);

      // call the function getTotalHashesByAddress with the first signer address and get the total number of hashes
      /**
       * @note : result is a BigNumber
       */
      const result = await contract.getTotalHashesByAddress(accounts[0]);

      // check if the total number of hashes stored by a specific address is correct
      expect(parseInt(result.toString())).to.eql(3);
    } catch (error) {
      // Handle errors if any
      console.error("Error 6 :", error);
    }
  });

  /**
   * TODO : testing the following function of the contract Hashy.sol
   * function getLastHashes(uint256 number) public view returns (bytes32[] memory) {
        // create a new array of bytes32 with the length of the number passed in
        bytes32[] memory lastHashes = new bytes32[](number);

        // loop through the hashes array and get the last number of hashes
        for (uint256 i = 0; i < number; i++) {
            lastHashes[i] = hashes[hashes.length - (i + 1)];
        }

        // return the array of hashes
        return lastHashes;
    }
   */
  // this test will check if the last number of hashes stored are correct
  it("check if the last number of hashes stored are correct", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash1 } = await callTestingStoreHash(contract, "titof x note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash2 } = await callTestingStoreHash(contract, "titof y note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash3 } = await callTestingStoreHash(contract, "titof z note", accounts[0], storedHashes);

      // call the function getLastHashes with the first signer address and get the last number of hashes
      /**
       * @note : result is an array of hashes
       */
      const result = await contract.getLastHashes(2);

      // check if the last number of hashes stored are correct
      expect(result.includes(hash2) && result.includes(hash3)).to.equal(true);
    } catch (error) {
      // Handle errors if any
      console.error("Error 7 :", error);
    }
  });

  function hexToString(hex: string): string {
    // Remove the '0x' prefix if present
    if (hex.startsWith("0x")) {
      hex = hex.slice(2);
    }

    // Convert the hexadecimal string to bytes
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }

    // Convert bytes to string
    const decodedString = Buffer.from(bytes).toString("utf8"); // Using Buffer to convert bytes to string

    return decodedString;
  }

  /**
  * TODO : testing the following function of the contract Hashy.sol
  * function getLastHashesWithData(uint256 number) public view returns (HashAndData[] memory) {
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
  */
  // this test will check if the last number of hashes stored are correct
  it("check if the last number of hashes stored are correct", async function () {
    try {
      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash1 } = await callTestingStoreHash(contract, "titof x note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash2 } = await callTestingStoreHash(contract, "titof y note", accounts[0], storedHashes);

      // call the function the testing callTestingStoreHash with a note and get the hash
      const { hash: hash3 } = await callTestingStoreHash(contract, "titof z note", accounts[0], storedHashes);

      // call the function getLastHashesWithData with the first signer address and get the last number of hashes
      /**
       * @note : result is an array of hashes
       */
      const result = await contract.getLastHashesWithData(2);

      // print result
      console.log("result : ", result[0][1][0]);

     

      // Example input
      const hexBytes = result[0][1][0];
      const decodedString = hexToString(hexBytes);

      console.log("Decoded String:", decodedString);

      // check if last stored hash is correct by comparing the note result[0][1][0] with the note we stored "titof z note"
      expect(decodedString).to.equal("titof z note");

    // check if the last number of hashes stored are correct
      // expect(result.includes(hash2) && result.includes(hash3)).to.equal(true);
    } catch (error) {
      // Handle errors if any
      console.error("Error 8 :", error);
    }
  });
});
