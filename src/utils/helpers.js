// Utility functions for the recipe generator

export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const matchesFilters = (recipe, filters) => {
  // Check if recipe matches all applied filters
  const filterEntries = Object.entries(filters).filter(([key, value]) => value && value.trim());
  
  return filterEntries.every(([filterType, filterValue]) => {
    switch (filterType) {
      case 'cuisine':
        return recipe.cuisine.toLowerCase() === filterValue.toLowerCase();
      
      case 'dietary':
        return recipe.dietary && recipe.dietary.some(diet => 
          diet.toLowerCase() === filterValue.toLowerCase()
        );
      
      case 'mealType':
        return recipe.mealType.toLowerCase() === filterValue.toLowerCase();
      
      case 'difficulty':
        return recipe.difficulty.toLowerCase() === filterValue.toLowerCase();
      
      case 'cookTime':
        const time = parseInt(recipe.cookTime);
        switch (filterValue) {
          case 'Under 15 mins':
            return time < 15;
          case '15-30 mins':
            return time >= 15 && time <= 30;
          case '30-60 mins':
            return time > 30 && time <= 60;
          case 'Over 1 hour':
            return time > 60;
          default:
            return true;
        }
      
      default:
        return true;
    }
  });
};

export const formatCookTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} mins`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  }
};

export const searchRecipes = (recipes, query) => {
  if (!query || !query.trim()) return recipes;
  
  const searchTerm = query.toLowerCase().trim();
  
  return recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm) ||
    recipe.description.toLowerCase().includes(searchTerm) ||
    recipe.cuisine.toLowerCase().includes(searchTerm) ||
    recipe.mealType.toLowerCase().includes(searchTerm) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm)
    )
  );
};

export const getDifficultyLevel = (difficulty) => {
  const levels = {
    'easy': 1,
    'medium': 2,
    'hard': 3
  };
  return levels[difficulty.toLowerCase()] || 1;
};

export const formatCalories = (calories) => {
  return `${calories} cal`;
};

export const generateRecipeId = () => {
  return Math.random().toString(36).substr(2, 9);
};