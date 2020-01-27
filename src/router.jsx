import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home.jsx'

function RouteManager () {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Home} />
      </div>
    </Router>
  )
}

export default RouteManager