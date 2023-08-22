import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

import blockStore from "../controller/minerService";

class eventFetch {
  constructor() {
    dotenv.config();
  }
  public async fetchLatestBlock(req: Request, res: Response) {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      console.log("the latest block is " + blockNumber);

      let dataToSend = {
        latestBlockNumber: blockNumber,
        minerName: "none",
      };

      const targetApiUrl = "http://localhost:9000/blockData";
      const response = await axios.post(targetApiUrl, dataToSend);

      if (response.status === 200) {
        res
          .status(200)
          .json({ message: "Data posted successfully to target API" });
      } else {
        res
          .status(response.status)
          .json({ message: "Failed to post data to target API" });
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Error ----------- ${error}`);
    }
  }
}
export default new eventFetch();
