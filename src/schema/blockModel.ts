import mongoose from "mongoose";

const blockModel = new mongoose.Schema(
  {
    latestBlockNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("blockModel", blockModel);
