const foodService = require('../services/food.service');

const createFood = async (req, res) => {
  try {
    const food = await foodService.createFood(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);
    res.status(200).json(food);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await foodService.updateFood(req.params.id, req.body);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const message = await foodService.deleteFood(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
