import React, { useContext } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import textSize from '@iconify/icons-fe/text-size'
import ThemeContext from '../ThemeContext.jsx'

const Navbar = () => {
  const { theme } = useContext(ThemeContext)

  const navStyle = {
    backgroundColor: theme.navColor,
    height: '50px',
    width: '100%',
    position: 'fixed',
    bottom: 0
  }

  return (
    <div style={navStyle}>
      <Icon icon={textSize} style={{ color: '#F6F6F6' }} />
    </div>
  )
}

export default Navbar
