import mongoose from "mongoose";
import dotenv from "dotenv"

class MongoHelper {
  constructor() {
    dotenv.config();
  }
  public async connectMongoDB() {
    try {
       // Make sure you get the mogo url from compass or any other online database
       // Make sure you have the url in .env file  
      let url:any =  process.env.MONGOURL;
      console.log('url',url)

      let options: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };


      /**
       * @param {string} url - URL for database connection
       * @param options - 
      */

      const connect = mongoose.connect(url,options);
      console.log("mongoDB: Connected Successfully.!!");
    } catch (error) {
      console.log("mongoDb: Failed To Connect.!!");
      console.log(error);
    }
  }
}
export default new MongoHelper();
