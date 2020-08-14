import React from 'react'
import App from '../App'
import SuccessResponse from './Status/SuccessResponse'
import NotFound from './Status/NotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/find' component={SuccessResponse} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default routes
