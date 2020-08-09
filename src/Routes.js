import React from 'react'
import App from './App'
import Status from './components/Status'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/status' component={Status} />
      </Switch>
    </Router>
  )
}
export default routes
