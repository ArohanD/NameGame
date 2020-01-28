import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import ThemeContext from './ThemeContext.jsx'

function RouteManager (props) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const appStyle = {
    backgroundColor: theme.baseColor,
    color: theme.primaryText,
    height: '80vh'
  }

  return (
    <Router>
      <div style={appStyle}>
        <Route exact path='/' component={Home} />
      </div>
    </Router>
  )
}

export default RouteManager
