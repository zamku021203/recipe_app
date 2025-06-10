import React from 'react'
import { NavLink } from 'react-router-dom';

const MealCards = ({ detail }) => {
  console.log(detail);

  return (
    <div className='meals'>
      {!detail ? "" : detail.map((curItem) => {
        return (
          <div className='mealImg'>
            <img src={curItem.strMealThumb} 
            alt={curItem.strMealThumb}
             />
            <p>{curItem.strMeal}</p>
            <NavLink to={`/${curItem.idMeal}`}>
                <button>Recipe</button>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default MealCards;
