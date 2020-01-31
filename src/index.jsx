import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Root from './router.jsx'
// If you have a theme library, import it here
import ThemeContext from './ThemeContext.jsx'

// CUSTOM THEMEING

const themes = {
  light: {
    name: 'light',
    primaryColor: '#5E1DE2',
    secondaryColor: '#B8F2D6',
    navColor: '#6CD9F3',
    baseColor: '#F6F6F6',
    titleColor: '#000000',
    primaryText: '#000000'
  },
  dark: {
    name: 'light',
    primaryColor: '#5E1DE2',
    secondaryColor: '#a412b1',
    navColor: '#5E1DE2',
    baseColor: '#2E2E2E',
    titleColor: '#F6F6F6',
    primaryText: '#F6F6F6'
  },
  highContrast: {
    name: 'high_contrast',
    primaryColor: '#CCFFFF',
    secondaryColor: '#00FF00',
    navColor: '#CCFFFF',
    baseColor: '#000000',
    titleColor: '#CCFFFF',
    primaryText: '#CCFFFF'
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
  const [themeIndex, setThemeIndex] = useState(1)

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes)
    if (themeIndex === 2) {
      setThemeIndex(0)
    } else {
      setThemeIndex(themeIndex + 1)
    }
    setTheme(themes[themeKeys[themeIndex]])
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
