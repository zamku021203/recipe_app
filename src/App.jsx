import React, { useState } from 'react';
import Header from './components/Header/Header';
import RecipeGenerator from './components/RecipeGenerator/RecipeGenerator';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <RecipeGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;