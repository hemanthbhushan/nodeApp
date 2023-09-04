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

      const existingBlock = await restaurantSchema.findOne({
        latestBlockNumber,
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
