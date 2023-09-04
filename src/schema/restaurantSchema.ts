import mongoose from "mongoose";
// Define the schema

const addresstemp = new mongoose.Schema({
  building: { type: String },
  coord: [{ type: Number }],
  street: { type: String },
  zipcode: { type: Number },
});

const gradesTemp = new mongoose.Schema({
  date:{type:String},
  grade:{type:String},
  score:{type:Number}
})

const restaurantSchema = new mongoose.Schema({
  address: { type: addresstemp },
  borough: { type: String },
  cuisine: { type: String },
  grades:[{type:gradesTemp}],
  name:{type:String},
  restaurant_id:{type:String}
});
export default mongoose.model("Restaurant", restaurantSchema);
