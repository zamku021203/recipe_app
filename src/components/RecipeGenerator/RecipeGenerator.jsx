import React, { useState } from 'react';
import { Search, Shuffle, Loader2 } from 'lucide-react';
import RecipeCard from '../RecipeCard/RecipeCard';
import FilterPanel from '../FilterPanel/FilterPanel';
import { generateRecipe } from '../../services/recipeService';

const RecipeGenerator = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    dietary: '',
    mealType: '',
    cookTime: '',
    difficulty: ''
  });

  const handleGenerateRecipe = async () => {
    setLoading(true);
    try {
      const newRecipe = await generateRecipe(searchQuery, filters);
      setRecipe(newRecipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomRecipe = async () => {
    setLoading(true);
    setSearchQuery('');
    try {
      const newRecipe = await generateRecipe('', {});
      setRecipe(newRecipe);
    } catch (error) {
      console.error('Error generating random recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What would you like to cook today?
        </h2>
        <p className="text-gray-600 text-lg">
          Generate personalized recipes based on your preferences
        </p>
      </div>

      {/* Search and Generate Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter ingredients, dish name, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateRecipe()}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleGenerateRecipe}
              disabled={loading}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span>Generate</span>
            </button>
            
            <button
              onClick={handleRandomRecipe}
              disabled={loading}
              className="px-6 py-3 bg-white border border-orange-200 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              <Shuffle className="h-4 w-4" />
              <span>Random</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Recipe Display */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Your Recipe...</h3>
              <p className="text-gray-600">This will just take a moment</p>
            </div>
          ) : recipe ? (
            <RecipeCard recipe={recipe} />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-12 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Cook Something Amazing?</h3>
              <p className="text-gray-600 mb-6">
                Enter your ingredients or preferences above, or click random to get started!
              </p>
              <button
                onClick={handleRandomRecipe}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Shuffle className="h-4 w-4" />
                <span>Generate Random Recipe</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;