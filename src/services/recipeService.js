// API service for TheMealDB
const MEAL_API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// Helper function to transform API data to our format
const transformMealData = (meal) => {
  if (!meal) return null;

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
    }
  }

  // Split instructions into steps
  const instructions = meal.strInstructions
    ? meal.strInstructions.split(/\r?\n/).filter(step => step.trim().length > 0)
    : [];

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    description: `Delicious ${meal.strArea || 'International'} ${meal.strCategory || 'dish'} recipe`,
    cuisine: meal.strArea || 'International',
    mealType: meal.strCategory || 'Main',
    difficulty: 'Medium', // API doesn't provide difficulty
    cookTime: 30, // API doesn't provide cook time, default to 30
    servings: 4, // Default servings
    calories: 400, // Default calories
    dietary: getDietaryInfo(meal),
    ingredients,
    instructions,
    image: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : []
  };
};

// Helper to determine dietary info (basic logic)
const getDietaryInfo = (meal) => {
  const dietary = [];
  const category = meal.strCategory?.toLowerCase() || '';
  const instructions = meal.strInstructions?.toLowerCase() || '';
  
  if (category.includes('vegetarian') || 
      (!instructions.includes('chicken') && !instructions.includes('beef') && 
       !instructions.includes('pork') && !instructions.includes('fish') && 
       !instructions.includes('meat'))) {
    dietary.push('Vegetarian');
  }
  
  if (!instructions.includes('cream') && !instructions.includes('milk') && 
      !instructions.includes('cheese') && !instructions.includes('butter') &&
      !instructions.includes('egg')) {
    dietary.push('Vegan');
  }
  
  return dietary;
};

// Search meals by name
export const searchMealsByName = async (query) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.meals) {
      return data.meals.map(transformMealData);
    }
    return [];
  } catch (error) {
    console.error('Error searching meals:', error);
    return [];
  }
};

// Search meals by ingredient
export const searchMealsByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
    const data = await response.json();
    
    if (data.meals) {
      // Note: This endpoint returns limited data, need to fetch full details
      const detailedMeals = await Promise.all(
        data.meals.slice(0, 10).map(meal => getMealById(meal.idMeal))
      );
      return detailedMeals.filter(meal => meal !== null);
    }
    return [];
  } catch (error) {
    console.error('Error searching meals by ingredient:', error);
    return [];
  }
};

// Get meal by ID
export const getMealById = async (id) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/lookup.php?i=${id}`);
    const data = await response.json();
    
    if (data.meals && data.meals[0]) {
      return transformMealData(data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching meal by ID:', error);
    return null;
  }
};

// Get random meal
export const getRandomMeal = async () => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/random.php`);
    const data = await response.json();
    
    if (data.meals && data.meals[0]) {
      return transformMealData(data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching random meal:', error);
    return null;
  }
};

// Filter meals by category
export const getMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/filter.php?c=${encodeURIComponent(category)}`);
    const data = await response.json();
    
    if (data.meals) {
      // Fetch detailed info for first 10 meals
      const detailedMeals = await Promise.all(
        data.meals.slice(0, 10).map(meal => getMealById(meal.idMeal))
      );
      return detailedMeals.filter(meal => meal !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching meals by category:', error);
    return [];
  }
};

// Filter meals by area/cuisine
export const getMealsByArea = async (area) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/filter.php?a=${encodeURIComponent(area)}`);
    const data = await response.json();
    
    if (data.meals) {
      // Fetch detailed info for first 10 meals
      const detailedMeals = await Promise.all(
        data.meals.slice(0, 10).map(meal => getMealById(meal.idMeal))
      );
      return detailedMeals.filter(meal => meal !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching meals by area:', error);
    return [];
  }
};

// Main generate recipe function (updated to use API)
export const generateRecipe = async (query = '', filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading

  try {
    let recipe = null;

    // If no query and no filters, get random meal
    if (!query.trim() && !Object.values(filters).some(f => f)) {
      recipe = await getRandomMeal();
      return recipe;
    }

    // Search by query first
    if (query.trim()) {
      const searchResults = await searchMealsByName(query);
      if (searchResults.length > 0) {
        recipe = searchResults[Math.floor(Math.random() * searchResults.length)];
      } else {
        // Try searching by ingredient if name search fails
        const ingredientResults = await searchMealsByIngredient(query);
        if (ingredientResults.length > 0) {
          recipe = ingredientResults[Math.floor(Math.random() * ingredientResults.length)];
        }
      }
    }

    // Apply filters if recipe found or if only filters are applied
    if (filters.cuisine && filters.cuisine !== '') {
      const cuisineResults = await getMealsByArea(filters.cuisine);
      if (cuisineResults.length > 0) {
        recipe = cuisineResults[Math.floor(Math.random() * cuisineResults.length)];
      }
    }

    if (filters.mealType && filters.mealType !== '') {
      const categoryResults = await getMealsByCategory(filters.mealType);
      if (categoryResults.length > 0) {
        recipe = categoryResults[Math.floor(Math.random() * categoryResults.length)];
      }
    }

    // If still no recipe found, get random
    if (!recipe) {
      recipe = await getRandomMeal();
    }

    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    // Return random meal as fallback
    return await getRandomMeal();
  }
};