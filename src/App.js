import './App.css';
import Mainpage from './Component/Mainpage';
import {Route,Routes } from 'react-router-dom';
import Mealinfo from './Component/Mealinfo';

function App() {
  return (
  
    //<Mainpage/>  
  <Routes>
    <Route path='/' element={<Mainpage/>}/>
    <Route path='/meal/:mealid' element={<Mealinfo/>} />
  </Routes>
  
  
  
  );
}

export default App;