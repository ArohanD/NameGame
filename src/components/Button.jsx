import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext.jsx'

const Button = (props) => {
  const { theme } = useContext(ThemeContext)

  const buttonStyle = {
    border: props.highlight ? `2px solid ${theme.secondaryColor}` : 'none',
    backgroundColor: props.highlight ? theme.secondaryColor : theme.primaryColor,
    textShadow: `1px 1px 3px ${props.highlight ? theme.primaryColor : 'none'}`,
    color: theme.baseColor
  }

  return (
    <button
      tabIndex='0'
      style={buttonStyle}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button
