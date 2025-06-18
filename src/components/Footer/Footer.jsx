import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-orange-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm text-gray-600">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="text-sm text-gray-600">for food lovers everywhere</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-orange-600 transition-colors duration-200">
              <Github className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-orange-600 transition-colors duration-200">
              <Twitter className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-orange-100 text-center">
          <p className="text-xs text-gray-500">
            © 2025 RecipeGen. All rights reserved. | Generate amazing recipes with AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;