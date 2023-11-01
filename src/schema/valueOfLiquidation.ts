import mongoose from "mongoose";

const valueOfLiquidation = new mongoose.Schema({
  valueEligibleForLiquidation: { type: Number },
  valueAtRiskForLiquadation: { type: Number },
});
export default mongoose.model("valueOfLiquidation", valueOfLiquidation);
