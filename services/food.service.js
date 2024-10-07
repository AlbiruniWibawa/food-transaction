const { Food } = require('../models');

const createFood = async (data) => {
  try {
    const food = await Food.create(data);
    return food;
  } catch (error) {
    throw error;
  }
};

const getAllFoods = async () => {
  try {
    const foods = await Food.findAll();
    return foods;
  } catch (error) {
    throw error;
  }
};

const getFoodById = async (id) => {
  try {
    const food = await Food.findByPk(id);
    if (!food) throw new Error('Food not found');
    return food;
  } catch (error) {
    throw error;
  }
};

const updateFood = async (id, data) => {
  try {
    const food = await Food.findByPk(id);
    if (!food) throw new Error('Food not found');
    return await food.update(data);
  } catch (error) {
    throw error;
  }
};

const deleteFood = async (id) => {
  try {
    const food = await Food.findByPk(id);
    if (!food) throw new Error('Food not found');
    await food.destroy();
    return { message: 'Food deleted successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
