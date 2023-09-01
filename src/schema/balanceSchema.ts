import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
  {
    blockNumber:{type:Number,require:true},
    fromAddress: { type: String ,require:true},
    toAddress: { type: String ,require:true},
    tokenAmount: { type: Number ,require:true},
  },
  { timestamps: true }
);

export default mongoose.model("balanceSchema", balanceSchema);
