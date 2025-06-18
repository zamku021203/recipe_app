import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <ChefHat className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RecipeGen</h1>
              <p className="text-xs text-gray-500">AI-Powered Recipe Generator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">Generate Magic</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;