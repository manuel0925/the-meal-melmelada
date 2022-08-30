const { Router } = require('express');
const { allCategories, allMealsByCategory,mealById } = require('../controllers/meal');

const MealRouter = Router();
const API_V1 = '/v1'

MealRouter.get(`${API_V1}/categories`, allCategories);
MealRouter.get(`${API_V1}/categories/:categoryName`, allMealsByCategory);
MealRouter.get(`${API_V1}/categories/:categoryName/:mealId`, mealById);

module.exports = MealRouter