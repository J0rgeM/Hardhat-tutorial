const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const HelloWorld = await hre.ethers.deployContract("HelloWorld");

  await HelloWorld.waitForDeployment();

  console.log(`HelloWorld contract deployed to ${HelloWorld.target}`);

  // Sleep for 45 seconds
  await sleep(45000);

  // NEW 👇
  await hre.run("verify:verify", {
    address: HelloWorld.target,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
