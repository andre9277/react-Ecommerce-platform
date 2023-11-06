const Item = require("../models/itemModel");

const mongoose = require("mongoose");

//Get all items
const getItems = async (req, res) => {
  //gets all the items
  const items = await Item.find({}).sort({ createdAt: -1 }); // -1: descending order

  res.status(200).json(items);
};

//Get a single item
const getItem = async (req, res) => {
  const { id } = req.params;

  //Checks if id is valid (so app does not crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

//Create new item
const createItem = async (req, res) => {
  //destruct the req
  const { title, price, imgURL } = req.body;

  //add doc to db
  try {
    //create a new item ( a new document)
    const item = await Item.create({ title, price, imgURL });
    //response if the item was created
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete item

//Update item

module.exports = { getItems, getItem, createItem };
