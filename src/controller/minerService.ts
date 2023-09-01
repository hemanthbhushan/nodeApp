import dotenv from "dotenv";
import { Request, Response } from "express";
import minerBlockSchema from "../schema/minerBlockSchema";

class BlockStore {
  constructor() {
    dotenv.config();
  }

  public async latestBlock(data:any) {
    try {
      const{latestBlockNumber,minerName} = data;
      const existingBlock = await minerBlockSchema.findOne({
        latestBlockNumber,
      });

      if (!existingBlock) {
        let temp = await minerBlockSchema.create({
          latestBlockNumber,
          minerName,
        });
        console.log(`The latest block added to DB: ${latestBlockNumber}`);
        return temp;
      } else {
        console.log(`Block number ${latestBlockNumber} already exists`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async registerMiner(req: Request, res: Response) {
    try {
      const { latestBlockNumber, minerName } = req.body;

      console.log("Block number:", latestBlockNumber);

      const updatedDocument = await minerBlockSchema.findOneAndUpdate(
        { latestBlockNumber }, // Shorthand for { latestBlockNumber: latestBlockNumber }
        { minerName },
        { returnOriginal: false }
      );

      console.log("Updated document:", updatedDocument);

      // Using json instead of send:
      // Using json instead of send for JSON responses is more semantically correct.
      res.status(200).json({
        message: "DB updated",
        blockNumber: latestBlockNumber,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

  public async deleteMiner(req: Request, res: Response) {
    try {
      const { latestBlockNumber } = req.body;

      const deletedDocument = await minerBlockSchema.findOneAndDelete(
        { latestBlockNumber },
        { returnOriginal: true }
      );

      console.log("Deleted Document:", deletedDocument);

      res.status(200).json({
        message: "DB Deleted",
      });
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
