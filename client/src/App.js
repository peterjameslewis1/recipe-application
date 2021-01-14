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
import { setUserOnReload } from '../src/store/actionUser';
import Favourites from './Components/Account/Favourites';



const App = ({ user, saveUserOnReload }) => {
  // const [loggedIn, setLoggedIn] = useState(false)

  // console.log(JSON.parse(localStorage.getItem('user')).loggedIn)
  console.log(user)
  const localUser = JSON.parse(localStorage.getItem('user'))
  // console.log(localUser)

  useEffect(() => {
    if (user.loggedIn) {
      setUserToLocalStorage()
    } else if (localUser.loggedIn) {
      setUserToLocalStorage()
      // saveUserOnReload(user)
    }

    const initialState = JSON.stringify({ loggedIn: false })
    localStorage.setItem('user', initialState)
  }, [user]);


  // useEffect(() => {
  //     async function getData() {
  //         const data = await fetchData(user.user.favourites)
  //         return data;
  //     }
  //     getData();
  //     setLoading(false)
  //     console.log(user.user.favouritesDetails)
  // }, [user.user.favourites])


  const setUserToLocalStorage = async () => {
    const loggedInUser = await JSON.stringify(user)
    localStorage.setItem('user', loggedInUser)
  }


  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path={user.loggedIn ? '/dashboard' : '/account'}>
            {user.loggedIn ? <Dashboard /> : <Account />}
          </Route>
          {/* <Dashboard /> */}
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
const mapDispatchToProps = dispatch => {
  return {
    saveUserOnReload: data => dispatch(setUserOnReload(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
