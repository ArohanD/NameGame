import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext.jsx'

const Home = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div onClick={toggleTheme}>You are on the Home page</div>
  )
}

export default Home
