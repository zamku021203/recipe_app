import React from 'react';
import { Clock, Users, Flame, Tag } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Recipe Image */}
      {recipe.image && (
        <div className="relative h-64 w-full overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      {/* Recipe Header */}
      <div className="p-6 border-b border-orange-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{recipe.description}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </div>
        </div>

        {/* Recipe Stats */}
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">{recipe.cookTime} mins</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">{recipe.servings} servings</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">{recipe.calories} cal</span>
          </div>
        </div>

        {/* Cuisine and Tags */}
        <div className="flex items-center space-x-2 mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {recipe.cuisine}
          </span>
          {recipe.dietary && recipe.dietary.map((diet, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {diet}
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="p-6 border-b border-orange-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{ingredient}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Section */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
        <div className="space-y-3">
          {recipe.instructions.map((step, index) => (
            <div key={index} className="flex space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-orange-600">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section (if available) */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;