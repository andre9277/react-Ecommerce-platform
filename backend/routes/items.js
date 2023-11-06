const express = require("express");

const {
  getItems,
  getItem,
  createItem,
} = require("../controllers/itemController");

//creates the router
const router = express.Router();

//GET all items
router.get("/", getItems);

//Get a single item
router.get("/:id", getItem);

//POST a new item
router.post("/", createItem);

//DELETE a item
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a new item" });
});

//UPDATE  a item
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a new item" });
});

module.exports = router;
