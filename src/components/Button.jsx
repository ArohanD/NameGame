import React, {useContext} from 'react'
import ThemeContext from '../ThemeContext.jsx'

const Button = (props) => {
  const { theme } = useContext(ThemeContext)

  const buttonStyle = { 
    // reset
    WebkitAppearance: 'none',
    MozAppearance: 'none',

    // new styling
    border: props.highlight ? `2px solid ${theme.secondaryColor}` : 'none',
    minWidth: '120px',
    backgroundColor: theme.primaryColor,
    color: theme.baseColor,
    fontSize: '1em',
    padding: '8px 12px',
    borderRadius: '20px'

  }

  return (
    <button style={buttonStyle} onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default Button
