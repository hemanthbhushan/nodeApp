import dotenv from "dotenv";
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
class eventFetch {
  constructor() {
    dotenv.config();
  }

  public fetchLatestBlock = async () => {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      console.log("the latest block is " + blockNumber);

      return blockNumber;
    } catch (error) {
      console.log(error);
      throw new Error(`Error ----------- ${error}`);
    }
  };
}
