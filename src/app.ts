import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "../src/Routes/blockRoutes";
import cron from "node-cron";
import mongo from "./helpers/mongoHelper";
// import mySQL from "./helpers/mySQLHelper";

class App {
  private app: express.Application;
  private port: any;
  constructor() {
    this.app = express();
    dotenv.config();
    this.port = process.env.PORT || 9000;
    this.initMiddleware();
    // cron.schedule("*/3 * * * * *", async () => {
    //     await eventFetch.fetchLatestBlock();
    // })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    // Connection with mongoDB
    mongo.connectMongoDB();
    // mySQL.connectMySQLDB();
    // You can import routes into this file and use it as a middleware
    this.app.use(routes);
  }
}

export default new App();
