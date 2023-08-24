import mongoose from "mongoose";

const minerBlockModel = new mongoose.Schema(
  {
    latestBlockNumber: { type: Number, required: true ,unique:true},
    minerName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("minerBlockModel", minerBlockModel);
