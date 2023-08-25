import mongoose from "mongoose";

const fetchBalanceService = new mongoose.Schema(
  {
    userAddress: { type: String, require: true ,unique:true },
    userBalance: { type: Number, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("fetchBalanceService", fetchBalanceService);
