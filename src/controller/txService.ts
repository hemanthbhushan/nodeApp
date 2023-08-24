import axios from "axios";
import dotenv from "dotenv";
import Web3 from "web3"; // Import the entire Web3 module

class EventFetch {
  constructor() {
    dotenv.config();
  }

  async fetchLatestBlock() {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC as string));
      const blockNumber = await web3.eth.getBlockNumber();
      console.log("The latest block is " + blockNumber);

      const dataToSend = {
        latestBlockNumber: blockNumber,
        minerName: "none",
      };

      const targetApiUrl = "http://localhost:9000/blockData";
      const response = await axios.post(targetApiUrl, dataToSend);

      if (response.status === 200) {
        console.log("Data posted successfully to target API");
      } else {
        console.log("Failed to post data to target API");
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new EventFetch();
