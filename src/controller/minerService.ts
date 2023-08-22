import dotenv from "dotenv";
import { Request, Response } from "express";
import minerBlockSchema from "../schema/minerBlockSchema";

class blockStore {
  constructor() {
    dotenv.config();
  }
  public async latestBlock(req: Request, res: Response) {
    // const Web3 = require("web3");
    // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
    try {
    //   const blockNumber = await web3.eth.getBlockNumber();
      console.log("the latest block in the miner is " + req.body.latestBlockNumber);

       let blockdata = {
          latestBlockNumber:req.body.latestBlockNumber,
          minerName: req.body.minerName

       }
       console.log(blockdata,"this is the block data")
      //   await minerBlockSchema.insertMany({
      //     latestBlockNumber:req.body.latestBlockNumber,
      //     minerName: req.body.minerName
      //   })
    //   await minerBlockSchema
    //     .insertMany({
    //       latestBlockNumber: req.body.latestBlockNumber,
    //       minerName: req.body.minerName,
    //     })
    //     .then((response) => {
    //       res.send(JSON.stringify(response));
    //     })
    //     .catch((err) => {
    //       res.status(404).send({ status: 404, error: true, message: err });
    //     });
          res.send({
            status: 200,
            error: false,
            blockNumber: req.body.latestBlockNumber,
          });
    } catch (error) {

      //   return blockNumber;
      console.log(error);
      throw new Error(`Error ----------- ${error}`);
    }
  }
}

export default new blockStore();
