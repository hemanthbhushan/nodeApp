import mongoose from "mongoose";

const minersLoginSchema = new mongoose.Schema({
  accountAddress: { type: String, require: true, unique: true },
  minerName: { type: String, require: true },
  password: { type: String, require: true },
});
export default mongoose.model("minersLoginSchema", minersLoginSchema);
