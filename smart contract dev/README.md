#Trusty Hash Smart contract testing

### Description
This project implements a smart contract named Hashy that facilitates hashing and storage of notes on the Ethereum blockchain. It provides functionalities to store hashes with associated notes and retrieve hashes stored by specific addresses.

#### Technologies Used
Solidity
Hardhat
Yarn

### Prerequisites
Make sure you have the following prerequisites installed before running the project:

Node.js : v20.10.0
Yarn : 1.22.19

### Instructions 
Inside the folder 'smart contract dev' run `yarn` to install the required dependencies


### To compile the smart contracts, and get the ABI, artifacts...etc run:

npx hardhat compile


### To execute unit tests, run:

npx hardhat test

This command will run all the unit tests present in the test/ directory.

Deployment

## NOTE !!!!

@Ferax your next task is to deploy smart contract manually using private key in the goearli network...etc

you will have to setup .env

i will need you then to share with me the syntax of the .env so i can test you work later

Also make sure that you deployed 10 differnt entries to the contract using the 10 accounts which are provided by hardhat, and also you will have to send some eth to these 10 accounts

better to do that programmatically and not creating 10 wallet addresses in your MetaMask Hahahah

```
