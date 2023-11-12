import { Request, Response } from "express";
import dotenv from "dotenv";
import Web3 from "web3"; // Import the entire Web3 module
import POOL_ABI from "../abi/POOL_ABI";
import ORACLE_ABI from "../abi/ORACLE_ABI";
import liquidationWallets from "../schema/liquidationWallets";
import valueOfLiquidation from "../schema/valueOfLiquidation";
import blockModel from "../schema/blockModel";

//0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2 pool contract address we have
//form the above we have to fetch the wallets from the events which have
//the wbtc as the asset

class EventFetch {
  constructor() {
    dotenv.config();
  }

 

  async locakEvm() {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.RPC as string)
      );
      let latest_block = await web3.eth.getBlockNumber();

      const temp = await blockModel.findOne().sort({ createdAt: -1 });

      const historicBlock = temp
        ? Number(temp.latestBlockNumber)
        : process.env.BLOCK;

      console.log(historicBlock, "historicBlock");

      const maxBlockLimit = Number(historicBlock) + 1000;
      console.log(maxBlockLimit, "maxBlockLimit");
      const toBlock = Math.min(18436820, maxBlockLimit);
      console.log(toBlock, "toBlock");

 

console.log(latest_block,"-----------------latest_block---------------")
  



      const blockObj = {
        latestBlockNumber: Math.max(Number(historicBlock), toBlock) + 1,
      };

      if (!temp) {
        await blockModel.create(blockObj);
      } else {
        await blockModel.findOneAndUpdate(
          { lastBlockNumber: historicBlock },
          blockObj
        );
      }

      // return res.status(200).send({
      //   message: "done",
      //   assetPrice,
      //   latest_block,
      // });
    } catch (error) {
      console.error(error);
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new EventFetch();
