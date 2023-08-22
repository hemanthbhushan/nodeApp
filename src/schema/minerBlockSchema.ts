import mongoose from "mongoose";

const minerBlockModel = new mongoose.Schema({
    lastBlockNumber : {type: String},
    minerName:{type:String}
},{timestamps: true})

export default  mongoose.model('minerBlockModel', minerBlockModel);