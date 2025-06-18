import React from 'react';
import { Filter } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange }) => {
  // Updated to match TheMealDB API areas/cuisines
  const cuisineTypes = [
    'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch', 
    'Egyptian', 'French', 'Greek', 'Indian', 'Irish', 'Italian', 
    'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 
    'Moroccan', 'Polish', 'Portuguese', 'Russian', 'Spanish', 
    'Thai', 'Tunisian', 'Turkish', 'Vietnamese'
  ];

  // Updated to match TheMealDB API categories
  const mealTypes = [
    'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb', 
    'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 
    'Starter', 'Vegan', 'Vegetarian'
  ];

  const cookingTimes = ['Under 15 mins', '15-30 mins', '30-60 mins', 'Over 1 hour'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleFilterChange = (category, value) => {
    onFilterChange({
      ...filters,
      [category]: filters[category] === value ? '' : value
    });
  };

  const FilterSection = ({ title, options, category }) => (
    <div className="space-y-2">
      <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterChange(category, option)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              filters[category] === option
                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="space-y-4">
        <FilterSection title="Cuisine" options={cuisineTypes} category="cuisine" />
        <FilterSection title="Category" options={mealTypes} category="mealType" />
        <FilterSection title="Cooking Time" options={cookingTimes} category="cookTime" />
        <FilterSection title="Difficulty" options={difficulties} category="difficulty" />
      </div>

      <button
        onClick={() => onFilterChange({ cuisine: '', mealType: '', cookTime: '', difficulty: '' })}
        className="w-full mt-4 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;