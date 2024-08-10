import { writeContract } from "@wagmi/core";
import { abi, contractAddress } from "../../config/contract";
import { config } from "../../config"; // Ensure this includes necessary properties like `chain` and `account`
import { ethers } from "ethers";

// Convert the note to bytes32 format
const bytesNote = ethers.encodeBytes32String("test 1");
const hash = "0x935c3a5341f4b649158f3da138d5dc8f6033bd7166d7603d9d2efc40ac3b3877";

// Define an async function to execute the contract interaction
async function executeContract() {
  try {
    // Call writeContract with both config and parameters
    const result = await writeContract(config, {
      abi,
      address: contractAddress,
      functionName: "storeHash",
      args: [hash, bytesNote],
    });
    console.log(result);
  } catch (error) {
    console.error("Error executing contract:", error);
  }
}

// Call the function
executeContract();
