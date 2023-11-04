const express = require("express");

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
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new item" });
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
