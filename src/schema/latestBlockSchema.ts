import mongoose from "mongoose";

const latestBlockSchema = new mongoose.Schema(
  {
    latestBlockNumber: { type: Number, require: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("latestBlockSchema", latestBlockSchema);
