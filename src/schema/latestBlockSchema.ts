import mongoose from "mongoose";

const latestBlockSchema = new mongoose.Schema(
  {
    latestBlockNumber: { type: Number, require: true, unique: true },
    contractAddress: { type: String, require: true },
    eventName: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("latestBlockSchema", latestBlockSchema);
