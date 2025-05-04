// mintTokens.js

import hre from "hardhat"; // Import Hardhat runtime environment
import * as dotenv from "dotenv"; // Import dotenv to manage environment variables
import { BigNumber } from "ethers";
dotenv.config(); // Load environment variables from .env file

// Define an asynchronous function to mint tokens
export async function mint(recipientAddress :string, amount : BigNumber) {
  const contractAddress = process.env.CONTRACT_ADDRESS || ""; // Get contract address from environment variable
  const SeedToken = await hre.ethers.getContractFactory("MovieReviewToken"); // Get contract factory for FoodToken
  const seedToken = SeedToken.attach(contractAddress); // Attach to the deployed contract

  // Call the mint function of the contract
  const mintTransaction = await seedToken.mint(recipientAddress, amount); 
  await mintTransaction.wait(); // Wait for the transaction to be mined
  
  console.log(`Minted ${amount} tokens to ${recipientAddress}`); // Log success message
}

// Example usage: call the mint function with specified recipient and amount
const recipientAddress = "0x86A5B482eA2f9d157a88E2494269FC9A885Fa0b1"; // Replace with the recipient's address
const amountToMint = hre.ethers.utils.parseUnits("10000", 18); // Specify the amount to mint (10 tokens in this example)

// Execute the mint function
mint(recipientAddress, amountToMint).catch((error) => {
  console.error("Error minting tokens:", error); // Handle any errors that occur during minting
});
