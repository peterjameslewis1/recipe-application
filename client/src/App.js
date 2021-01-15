import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeCardDetails from './Components/RecipeCardDetails/RecipeCardDetails';
import Home from './Components/Home/Home';
import Search from './Components/Search';
import Account from './Components/Account/Account';
import Dashboard from './Components/Private/Dashboard';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Favourites from './Components/Account/Favourites';


const App = ({ user, }) => {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={Account} />
          <Layout>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/recipe" component={RecipeCardDetails} />
            <Route path="/favourites" component={Favourites} />
          </Layout>
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App);
