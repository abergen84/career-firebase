import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import withAuthentication from './withAuthentication'

// Components
import Navigation from './Navigation'
import Landing from './Landing'
import SignUp from './SignUp'
import SignIn from './SignIn'
import PasswordForget from './PasswordForget'
import Home from './Home'
import Account from './Account'
import Admin from './Admin'

import * as routes from '../routes/routes'


const App = () =>
  <Router>
    <div>
      <Navigation />

      <Route exact path={routes.LANDING} component={ ()=> <Landing /> } />
      <Route exact path={routes.SIGNUP} component={ ()=> <SignUp /> } />
      <Route exact path={routes.SIGNIN} component={ ()=> <SignIn /> } />
      <Route exact path={routes.PASSWORD_FORGET} component={ ()=> <PasswordForget /> } />
      <Route exact path={routes.HOME} component={ ()=> <Home /> } />
      <Route exact path={routes.ACCOUNT} component={ ()=> <Account /> } />
      <Route exact path={routes.ADMIN} component={ () => <Admin /> } />
    </div>
  </Router>


export default withAuthentication(App);
