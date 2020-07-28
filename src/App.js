import React, { useState } from 'react';
import './App.css';
// import Header from './Components/Header/Header';
import RecipeCard from './Components/RecipieCard/RecipieCard';
import RecipeCardDetails from './Components/RecipeCardDetails/RecipeCardDetails';
import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp';
import Header from './Components/Header/Header';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  const showInput = () => {
    setShowSearch(!showSearch);
  }

  

  return (
    <Router>
      <div className="App">
        <Header clicked={showInput} state={showSearch} />
        <Switch>
          <Route path="/recipe-app" exact component={SignUp} />
          <Route path="/recipe-app/home" exact component={Home} />
          <Route path="/recipe-app/home/:type" exact component={RecipeCard} />
          <Route path="/:index" component={RecipeCardDetails} />
        </Switch>

      </div>
    </Router>
  )
}

export default App;
