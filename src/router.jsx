import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ThemeContext from './ThemeContext.jsx'

// PAGES
import Home from './pages/Home.jsx'
import WhoIs from './pages/WhoIs.jsx'

function RouteManager (props) {
  const { theme } = useContext(ThemeContext)

  const appStyle = {
    backgroundColor: theme.baseColor,
    color: theme.primaryText,
    height: '90vh',
    fontFamily: theme.primaryFont
  }

  return (
    <Router>
      <div style={appStyle}>
        <Route exact path='/' component={Home} />
        <Route exact path='/WhoIs' component={WhoIs} />
      </div>
    </Router>
  )
}

export default RouteManager
