const BN = require("ethers").BigNumber;
const { ethers, upgrades } = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy the Price Oracle contract
  const PriceOracle = await ethers.getContractFactory("PriceOracle");
  const priceOracle = await PriceOracle.deploy();

  const oraclePriceChange = await PriceOracle.attach(priceOracle.target);

  const tx = await oraclePriceChange.setAssetPrice(
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    17000
  );

  await sleep(6000);
  console.log(tx, "---tx--------");

  console.log(`Price Oracle deployed to: ${priceOracle.target}`);
  //deployed contract address for the oracle :0x9eb52339B52e71B1EFD5537947e75D23b3a7719B
  //WBTC address : 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
