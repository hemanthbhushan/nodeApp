import axios from "axios";
import dotenv from "dotenv";
import Web3 from "web3"; // Import the entire Web3 module
import UsdtAbi from "../abi/USDT_ABI";
import balanceSchema from "../schema/balanceSchema";
import latestBlockSchema from "../schema/latestBlockSchema";
import fetchBalanceService from "./fetchBalanceService";
import BlockStore from "../controller/minerService";

class EventFetch {
  constructor() {
    dotenv.config();
  }

  async fetchLatestBlock() {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.RPC as string)
      );
      const blockNumber = await web3.eth.getBlockNumber();
      console.log("The latest block is " + blockNumber);

      const dataToSend = {
        latestBlockNumber: blockNumber,
        minerName: "none",
      };

      let temp = await BlockStore.latestBlock(dataToSend);

      if (temp) {
        console.log("Data posted successfully to target API");
      } else {
        console.log("Failed to post data to target API");
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Error: ${error}`);
    }
  }

  async fetchLatestEvent() {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.RPC as string)
      );

      // const receipt = await web3.eth.getTransactionReceipt(
      //   process.env.TXHash as string
      // );

      const latestBlockNumber = await web3.eth.getBlockNumber();
      const temp = await latestBlockSchema.findOne().sort({ createdAt: -1 });
  

      const historicBlock = temp
        ? Number(temp.latestBlockNumber)
        : process.env.BLOCK;

      console.log(historicBlock, "historicBlock");

      const maxBlockLimit = Number(historicBlock) + 100;
      console.log(maxBlockLimit, "maxBlockLimit");
      const toBlock = Math.min(latestBlockNumber, maxBlockLimit);

      const contractInstance = new web3.eth.Contract(
        UsdtAbi,
        process.env.USDTAddress
      );
      const events = await contractInstance.getPastEvents("Transfer", {
        fromBlock: historicBlock,
        toBlock: toBlock,
      });
      console.log("events=========>", events.length, "===========");
      if (events.length > 0) {
        const eventData = events.map((event) => ({
          blockNumber: event.blockNumber,
          fromAddress: event.returnValues.from,
          toAddress: event.returnValues.to,
          tokenAmount: event.returnValues.value,
        }));
        await balanceSchema.insertMany(eventData);
        for (const event of eventData) {
          try {
            await fetchBalanceService.calculateBalance(
              event.fromAddress,
              event.toAddress,
              event.tokenAmount
            );
          } catch (error) {
            console.error("Error processing balance:", error);
          }
        }

        console.log("Event processing completed.");
      } else {
        console.log("No Event Found.");
      }

      const blockObj = {
        latestBlockNumber: Math.max(Number(historicBlock), toBlock) + 1,
      };

      if (!temp) {
        await latestBlockSchema.create(blockObj);
      } else {
        await latestBlockSchema.findOneAndUpdate(
          { lastBlockNumber: historicBlock },
          blockObj
        );
      }
    } catch (err) {
      console.error(err);
      throw new Error(`Error: ${err}`);
    }
  }
}

export default new EventFetch();
