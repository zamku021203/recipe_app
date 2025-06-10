import React, { useState } from 'react';
import MealCards from './MealCards';

const Mainpage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async () => {
    if (!search.trim()) {
      setMsg("Please enter a dish name or letter.");
      setData([]);
      return;
    }

    setMsg("Searching...");
    try {
      const resByName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    //   const resByLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);

      const dataByName = await resByName.json();
    //   const dataByLetter = await resByLetter.json();

      const mealsByName = dataByName.meals || [];
    //   const mealsByLetter = dataByLetter.meals || [];

      const combined = [...mealsByName,
        //  ...mealsByLetter
        ];
      const uniqueMeals = Array.from(new Map(combined.map(meal => [meal.idMeal, meal])).values());

      setData(uniqueMeals);
      if (uniqueMeals.length === 0) {
        setMsg("No meals found.");
      } else {
        setMsg(""); // Clear message
      }
    } catch (error) {
      console.error("Error fetching meal data:", error);
      setData([]);
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <h1 className='head'>FOOD RECIPE APP</h1>
      <div className="container">
        <div className="searchBar">
          <input type="text" placeholder="Enter Dishes" onChange={handleInput} />
          <button onClick={myFun}>Search</button>
        </div>
        <h4 className='msg'>{msg}</h4>
        <div>
          <MealCards detail={data} />
        </div>
      </div>
    </>
  );
};

export default Mainpage;
