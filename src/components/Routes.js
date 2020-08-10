import React from 'react'
import App from '../App'
import Status from './Status/Status'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/find' component={Status}/>
      </Switch>
    </Router>
  )
}
export default routes
