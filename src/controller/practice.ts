import balanceSchema from "../schema/balanceSchema";
import { Request, Response } from "express";

class Practice {
    // 1. Write a MongoDB query to display all the documents in the collection restaurants.
  public async practice1(req: Request, res: Response) {
    try {
      const x = await balanceSchema.find();
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
//   2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant
  public async practice2(req: Request, res: Response) {
    try {
      const x = await balanceSchema.find({},{blockNumber:1,fromAddress:1,toAddress:1,tokenAmount:1});
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
//   3. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine,
// but exclude the field _id for all the documents in the collection restaurant.
  public async practice3(req: Request, res: Response) {
    try {
      const x = await balanceSchema.find({},{blockNumber:1,fromAddress:1,toAddress:1,tokenAmount:1,_id:0});
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  //5.Write a MongoDB query to display all the restaurant which is in the borough Bronx.
  public async practice4(req: Request, res: Response) {
    try {
      const x = await balanceSchema.find({fromAddress:"0x0B999462E124CDc39328ab16F19F1b349fd9E2bE"});
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  //6. Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
  public async practice5(req: Request, res: Response) {
    try {

      const x = await balanceSchema.find({fromAddress:"0x0B999462E124CDc39328ab16F19F1b349fd9E2bE"}).limit(5);
      
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
//   7.Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
  public async practice6(req: Request, res: Response) {
    try {

      const x = await balanceSchema.find({fromAddress:"0x0B999462E124CDc39328ab16F19F1b349fd9E2bE"}).skip(1).limit(5);
      
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  public async practice(req: Request, res: Response) {
    try {

      const x = await balanceSchema.find({fromAddress:"0x0B999462E124CDc39328ab16F19F1b349fd9E2bE"}).skip(1).limit(5);
      
      console.log(x,"is",x.length,"data");

      res.status(200).json({
        message: "Fetched",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
}
export default new Practice();
