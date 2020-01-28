import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Root from './router.jsx'
// If you have a theme library, import it here
import ThemeContext from './ThemeContext.jsx'

// CUSTOM THEMEING

const themes = {
  light: {
    primaryColor: '#5E1DE2',
    secondaryColor: '#B8F2D6',
    navColor: '#6CD9F3',
    baseColor: '#F6F6F6',
    titleColor: '#000000',
    primaryText: '#000000'
  },
  dark: {
    primaryColor: '#5E1DE2',
    secondaryColor: '#5E1DE2',
    navColor: '#5E1DE2',
    baseColor: '#2E2E2E',
    titleColor: '#F6F6F6',
    primaryText: '#F6F6F6'
  }
}

const fonts = {
  primaryFont: 'Lora, serif',
  secondaryFont: 'Poppins, sans-serif'
}
for (const key in themes) {
  themes[key] = Object.assign(themes[key], fonts)
}

const App = () => {
  const [theme, setTheme] = useState(themes.light)
  const toggleTheme = () => {
    const currentTheme = JSON.stringify(theme)
    const newState = currentTheme === JSON.stringify(themes.light) ? themes.dark : themes.light
    setTheme(newState)
  }
  const defaultContext = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={defaultContext}>
      <Root />
    </ThemeContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
