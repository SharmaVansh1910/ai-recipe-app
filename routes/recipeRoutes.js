const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe"); // Import Recipe model (we'll create it next)

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.render("index", { recipes }); // Pass recipes to EJS template
  } catch (error) {
    res.status(500).send("Error fetching recipes");
  }
});

// POST a new recipe
router.post("/add", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions });
    await newRecipe.save();
    res.redirect("/"); // Redirect to homepage
  } catch (error) {
    res.status(500).send("Error adding recipe");
  }
});

module.exports = router;
