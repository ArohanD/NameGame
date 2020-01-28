import React, {useContext} from 'react'
import ThemeContext from '../ThemeContext.jsx'

const Button = (props) => {
  const { theme } = useContext(ThemeContext)

  const buttonStyle = { 
    // RESET
    WebkitAppearance: 'none',
    MozAppearance: 'none',

    // STYLE
    border: 'none',

  }

  return (
    <button style={buttonStyle}>
      {props.text}
    </button>
  )
}

export default Button
