const express = require("express");

const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
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
router.delete("/:id", deleteItem);

//UPDATE  a item
router.patch("/:id", updateItem);

module.exports = router;
