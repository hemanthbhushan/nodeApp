const Hre = require("hardhat");
async function main() {

//   FactoryContract address 0x95e133fD5c77A16f7046cff09190c15dFD1A1cD6
// TokenContract address 0x4089c6b23914Fc955546f3996ac12619F3E79f5c
// proxy address 0xB5aa34eD482f74Fc1066E844B21bafDfDD7e6f8e
// uprade before
// proxy1 0xB5aa34eD482f74Fc1066E844B21bafDfDD7e6f8e
  await Hre.run("verify:verify", {
    //Deployed contract OwnedUpgradeabilityProxy address
    address: "0xb12A4f60AE72de214785E71dC92d09596648a37B",
    //Path of your main contract.
    contract:
      "contracts/upgradability/OwnedUpgradeabilityProxy.sol:OwnedUpgradeabilityProxy",
  });

  await Hre.run("verify:verify", {
    //Deployed contract Exchange address
    address: "0xe95ec5BF08C0AAC3617E2a81bbbf2E83480Ed7af",
    //Path of your main contract.
    contract: "contracts/FactoryContract.sol:FactoryContract",
  });

  await Hre.run("verify:verify", {
    //Deployed contract OwnedUpgradeabilityProxy address
    address: "0x26dc8A51Bd2edfF3B8cf2cdda61Ef69e49e31B04",
    //Path of your main contract.
    contract: "contracts/TokenContract.sol:TokenContract",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//FactoryContract address 0xcC2871445A3594c2aC16f7Ea868c586eD5DB107E
