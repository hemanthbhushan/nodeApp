import Web3 from "web3"; // Import the entire Web3 module

export default encodeFunction = async (address) => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
    web3.eth.abi.encodeFunctionCall({
      name: "transferOwnerShipOnComplianceContarct",
      type: "function",
      inputs: [
        {
          type: "address",
          name: "pendingOwner",
        },
        [address],
      ],
    });
  } catch (error) {}
};
