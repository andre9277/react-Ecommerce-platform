const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creates a schema, defines the structure of a particular document inside our DB
const itemsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemsSchema);

//Model aply a schmea to a particular model, and then we use the model to interact with a collection
