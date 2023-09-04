import mongoose from "mongoose";
// Define the schema
const restaurantSchema = new mongoose.Schema({
  address: {
    building: String,
    coord: [Number], // Array of numbers for longitude and latitude
    street: String,
    zipcode: String,
  },
  borough: String,
  cuisine: String,
  grades: [
    {
      date: Date,
      grade: String,
      score: Number,
    },
  ],
  name: String,
  restaurant_id: String,
});

// Create a model based on the schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
