import React from 'react'
import App from '../App'
import Status from './Status/Status'
import ErrorResponse from './Status/ErrorResponse'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/find' component={Status} />
        <Route path='/error' component={ErrorResponse} />
      </Switch>
    </Router>
  )
}
export default routes
