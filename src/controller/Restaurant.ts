import dotenv from "dotenv";
import { Request, Response } from "express";
import restaurantSchema from "../schema/restaurantSchema";

class Restaurant {
  constructor() {
    dotenv.config();
  }

  public async restaurant(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find();
      console.log(data,"data")
      res.status(200).json({
        message: "fetched",
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

export default new Restaurant();
