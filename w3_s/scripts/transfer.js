// tokenTransfer.js

import hre from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

export async function transfer(donerAddress, recipientAddress, amount) {
  const contractAddress = process.env.CONTRACT_ADDRESS || ""; // Replace with your contract's address
  const SeedToken = await hre.ethers.getContractFactory("QuestToken");
  const seedToken = SeedToken.attach(contractAddress);

  //   const tranc = await seedToken.transfer(recipientAddress, amount);
  const donateP = await seedToken.donate(
    donerAddress,
    recipientAddress,
    amount
  );
  await donateP.wait();
  console.log(`Transacted ${amount} tokens to ${recipientAddress}`);
}
