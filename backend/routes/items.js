const express = require("express");

const Item = require("../models/itemModel");

//creates the router
const router = express.Router();

//GET all items
router.get("/", (req, res) => {
  res.json({ mssg: "Get all items" });
});

//Get a single item
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single item" });
});

//POST a new item
router.post("/", async (req, res) => {
  //destruct the req
  const { title, price, imgURL } = req.body;

  try {
    //create a new item ( a new document)
    const item = await Item.create({ title, price, imgURL });
    //response if the item was created
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//DELETE a item
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a new item" });
});

//UPDATE  a item
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a new item" });
});

module.exports = router;
