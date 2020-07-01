import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import RecipeCard from './Components/RecipieCard/RecipieCard';
import RecipeCardDetails from './Components/RecipeCardDetails/RecipeCardDetails';
import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp'

import { BrowserRouter as Router, Route } from 'react-router-dom';


const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  const showInput = () => {
    setShowSearch(!showSearch);
  }



  return (
    <Router>
      <div className="App">

        <Header clicked={showInput} state={showSearch} />
        <Route path="/recipe-app" exact component={SignUp} />
        <Route path="/recipe-app/home" exact component={Home} />
        <Route path="/recipe-app/home/:type" component={RecipeCard} />
        <Route path="/:index" component={RecipeCardDetails} />

      </div>
    </Router>
  )
}

export default App;