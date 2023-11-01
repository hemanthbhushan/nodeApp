import mongoose from "mongoose";

const liquidationWallets = new mongoose.Schema({
  eligibleForLiquidation: { type: String },
  riskForLiquadation: { type: String },
  walletAddress: { type: String, required: true },
  healthFactor: { type: Number, required: true },
});
export default mongoose.model("liquidationWallets", liquidationWallets);
