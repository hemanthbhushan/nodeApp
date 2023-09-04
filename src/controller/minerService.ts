import dotenv from "dotenv";
import { Request, Response } from "express";
import restaurantSchema from "../schema/restaurantSchema";

class BlockStore {
  constructor() {
    dotenv.config();
  }

  public async latestBlock(req: Request, res: Response) {
    try {
      const { latestBlockNumber, minerName } = req.body;

      const existingBlock = await minerBlockSchema.findOne({
        latestBlockNumber,
      });

      if (!existingBlock) {
        await minerBlockSchema.create({ latestBlockNumber, minerName });
        console.log(`The latest block added to DB: ${latestBlockNumber}`);
        res.status(200).json({
          message: "BlockAdded",
          blockNumber: latestBlockNumber,
        });
      } else {
        console.log(`Block number ${latestBlockNumber} already exists`);
        res.status(200).json({
          message: "BlockExists",
          blockNumber: latestBlockNumber,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

}

export default new BlockStore();
