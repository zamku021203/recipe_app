import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const Mealinfo = () => {
    const { mealid } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [navMeals, setNavMeals] = useState({ prev: null, next: null });
    const [allMeals, setAllMeals] = useState([]);

    const getAllMeals = async () => {
        try {
            // Fetch meals by different categories to get a good variety
            const categories = ['chicken', 'beef', 'seafood', 'pasta', 'dessert', 'vegetarian'];
            let combinedMeals = [];
            
            for (const category of categories) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
                    const data = await response.json();
                    if (data.meals) {
                        combinedMeals = [...combinedMeals, ...data.meals];
                    }
                } catch (error) {
                    console.error(`Error fetching ${category} meals:`, error);
                }
            }

            // Remove duplicates based on idMeal
            const uniqueMeals = Array.from(new Map(combinedMeals.map(meal => [meal.idMeal, meal])).values());
            setAllMeals(uniqueMeals);
            return uniqueMeals;
        } catch (error) {
            console.error('Error fetching all meals:', error);
            return [];
        }
    };

    const getInfo = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
            const jsonData = await response.json();
            
            if (jsonData.meals && jsonData.meals[0]) {
                setInfo(jsonData.meals[0]);
            } else {
                setInfo(null);
            }
        } catch (error) {
            console.error('Error fetching meal:', error);
            setInfo(null);
        } finally {
            setLoading(false);
        }
    };

    const updateNavigation = (meals) => {
        if (meals.length === 0) return;

        const currentIndex = meals.findIndex(meal => meal.idMeal === mealid);
        
        let prevMeal = null;
        let nextMeal = null;
        
        if (currentIndex > 0) {
            prevMeal = meals[currentIndex - 1];
        }
        if (currentIndex >= 0 && currentIndex < meals.length - 1) {
            nextMeal = meals[currentIndex + 1];
        }
        
        // If current meal is not in the list, just use first two meals as navigation
        if (currentIndex === -1 && meals.length >= 2) {
            prevMeal = meals[0];
            nextMeal = meals[1];
        }
        
        setNavMeals({ prev: prevMeal, next: nextMeal });
    };

    const handleNavigation = (meal) => {
        if (meal) {
            navigate(`/meal/${meal.idMeal}`);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            if (mealid) {
                // Get current meal info
                await getInfo();
                
                // Get all meals for navigation if not already loaded
                let meals = allMeals;
                if (allMeals.length === 0) {
                    meals = await getAllMeals();
                }
                
                // Update navigation
                updateNavigation(meals);
            }
        };

        initializeData();
    }, [mealid]);

    // Update navigation when allMeals changes
    useEffect(() => {
        if (allMeals.length > 0) {
            updateNavigation(allMeals);
        }
    }, [allMeals, mealid]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="meal-info-container">
            {!info ? (
                <div className="error-message">Data not found</div>
            ) : (
                <>
                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <button 
                            className="nav-btn prev-btn" 
                            onClick={() => handleNavigation(navMeals.prev)}
                            disabled={!navMeals.prev}
                        >
                            <span className="nav-arrow">←</span>
                            <div className="nav-content">
                                <span className="nav-label">Previous</span>
                                <span className="nav-title">
                                    {navMeals.prev ? navMeals.prev.strMeal : 'No previous meal'}
                                </span>
                            </div>
                        </button>
                        
                        <button 
                            className="nav-btn next-btn" 
                            onClick={() => handleNavigation(navMeals.next)}
                            disabled={!navMeals.next}
                        >
                            <div className="nav-content">
                                <span className="nav-label">Next</span>
                                <span className="nav-title">
                                    {navMeals.next ? navMeals.next.strMeal : 'No next meal'}
                                </span>
                            </div>
                            <span className="nav-arrow">→</span>
                        </button>
                    </div>

                    {/* Recipe Content */}
                    <div className="recipe-content">
                        {info.strMealThumb && (
                            <img src={info.strMealThumb} alt={info.strMeal} className="meal-image" />
                        )}
                        <h1 className="recipe-title">Recipe Detail</h1>
                        <h2 className="meal-name">{info.strMeal}</h2>
                        
                        <div className="instructions-section">
                            <h3 className="instructions-title">Instructions</h3>
                            <div className="instructions-content">
                                {info.strInstructions}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Mealinfo;