const axios = require('axios');
const { CONFIG } = require('../config');
const { OK, BAD_REQUEST } = require('../responses');


module.exports.allCategories = async (
  /** @type {import('express').Request } */
  req,
  /** @type {import('express').Response } */
  res
)=>{
  
  try {
    
    const result = await axios.get(`${CONFIG.BASE_URL}/categories.php`)
    
    return res.status(200).json( OK({ data: result.data.categories, path: req.originalUrl }) )
    
  } catch (error) {
    console.log(error) 
    
    return res.status(400).json( BAD_REQUEST({ path: req.originalUrl }) )
  }
  
  
  
}


module.exports.allMealsByCategory = async (
  /** @type {import('express').Request } */
  req,
  /** @type {import('express').Response } */
  res
)=>{
  const categoryName = req.params.categoryName
  
  try {
    
    const result = await axios.get(`${CONFIG.BASE_URL}/filter.php?c=${categoryName}`, {
      params: req.params
    })
    
    if(!result.data.meals) return res.status(400).json(BAD_REQUEST({
      path: req.originalUrl,
      message: 'Category does not exist',
    }))
    
    return res.status(200).json( OK({ data: result.data.meals, path: req.originalUrl }) )
    
  } catch (error) {
    console.log(error) 
    
    return res.status(400).json( BAD_REQUEST({ path: req.originalUrl }) )
  }
  
  
}


module.exports.mealById = async (
  /** @type {import('express').Request } */
  req,
  /** @type {import('express').Response } */
  res
)=>{
  const mealId = req.params.mealId
  
  try {  
    const result = await axios.get(`${CONFIG.BASE_URL}/lookup.php?i=${mealId}`, {
      params: req.params
    })
    
    if(!result.data.meals) return res.status(400).json(BAD_REQUEST({
      path: req.originalUrl,
      message: 'meal does not exist'
    }))
    
    const objectEntries = Object.entries(result.data.meals[0])
    
    const measures = []
    const ingredients = []

    for (const entries of objectEntries) {
      const [  key,value ] = entries;
      
      if(key.startsWith('strIngredient') && value.length > 0) ingredients.push(value)
      if(key.startsWith('strMeasure') && value.length > 0) measures.push(value)
    }

    
    return res.status(200).json( OK({ 
      data: {
        measures,
        ingredients,
        ...result.data.meals[0]
      }, path: req.originalUrl }) )
    
  } catch (error) {
    console.log(error) 
    
    return res.status(400).json( BAD_REQUEST({ path: req.originalUrl }) )
  }
  
  
}