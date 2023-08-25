import axios from "axios";
import dotenv from "dotenv";
import Web3 from "web3"; // Import the entire Web3 module
import UsdtAbi from "../abi/USDT_ABI";
import balanceSchema from "../schema/balanceSchema";
import latestBlockSchema from "../schema/latestBlockSchema";

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

      const targetApiUrl = "http://localhost:9000/latestBlock";
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
  // async fetchLatestEvent() {
  //   try {
  //     const web3 = new Web3(
  //       new Web3.providers.HttpProvider(process.env.RPC as string)
  //     );
  //     const latestBlockNumber = await web3.eth.getBlockNumber();

  //     const contractInstance = new web3.eth.Contract(
  //       UsdtAbi,
  //       process.env.USDTAddress
  //     );

  //     const currentBlock = latestBlockNumber - 10;
  //     console.log("The latest block is " + latestBlockNumber);
  //     console.log("The current block is " + currentBlock);

  //     const events = await contractInstance.getPastEvents("Transfer", {
  //       fromBlock: currentBlock,
  //       toBlock: latestBlockNumber,
  //     });

  //     console.log("Number of events:=======> " + events.length);

  //     const eventProcessingPromises = events.map(async (event) => {
  //       const dataToSend = {
  //         blockNumber: currentBlock,
  //         fromAddress: event.returnValues.from,
  //         toAddress: event.returnValues.to,
  //         tokenAmount: event.returnValues.value,
  //       };
  //       await balanceSchema.create(dataToSend);
  //     });

  //     await Promise.all(eventProcessingPromises);

  //     console.log("Event processing completed.");
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(`Error: ${error}`);
  //   }
  // }
  
  public fetchLatestEvent = async () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.RPC as string)
    );
    try {
      let latest_block = await web3.eth.getBlockNumber();
      const temp = await latestBlockSchema.findOne().sort({ createdAt: -1 });
      const historicBlock = temp
        ? Number(temp.latestBlockNumber)
        : process.env.BLOCK;
      latest_block =
        Number(historicBlock) + 100 > latest_block
          ? latest_block
          : Number(historicBlock) + 100;
      const contractInstance = new web3.eth.Contract(
        UsdtAbi,
        process.env.USDTAddress
      );
      const events = await contractInstance.getPastEvents("Transfer", {
        fromBlock: historicBlock,
        toBlock: latest_block,
      });
      const sdk = Number(historicBlock);
      console.log("==========events=======================", events);
      const myEvents = await events
        .filter((e: any) => {
          console.log("e", e);
          return e.event === "Mint";
        })
        .map((event: any) => {
          return {
            blockNumber: event.blockNumber,
            fromAddress: event.returnValues.from,
            toAddress: event.returnValues.to,
            tokenAmount: event.returnValues.value,
          };
        });
      await balanceSchema.insertMany(myEvents);

      let blockObj = {
        lastBlockNumber:
          Number(historicBlock) > Number(latest_block)
            ? Number(historicBlock)
            : Number(latest_block) + 1,
      };
      if (!temp) {
        await latestBlockSchema.create(blockObj);
      } else {
        await latestBlockSchema.findOneAndUpdate(
          { lastBlockNumber: sdk },
          blockObj
        );
      }
    } catch (err) {
      console.log(err);
      throw new Error(`Error ----------- ${err}`);
    }
  };
}

export default new EventFetch();
