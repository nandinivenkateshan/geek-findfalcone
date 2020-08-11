import React from 'react'
import App from '../App'
import Status from './Status/Status'
import ErrorResponse from './Status/ErrorResponse'
import NotFound from './Status/NotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/find' component={Status} />
        <Route exact path='/error' component={ErrorResponse} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default routes
