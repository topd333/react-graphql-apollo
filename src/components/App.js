import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'

import { AUTH_TOKEN } from '../constants'

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <Fragment>
        <Header />
        <div className="body">
          <Switch>
            <Route exact path="/" render={() => authToken?
              <Dashboard />:
              <Redirect to="/login" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App
