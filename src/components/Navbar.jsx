import React, { useContext } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import textSize from '@iconify/icons-fe/text-size'
import menuIcon from '@iconify/icons-mdi/menu'
import ThemeContext from '../ThemeContext.jsx'
import { Link } from 'react-router-dom'
import KeyboardEventHandler from 'react-keyboard-event-handler'

const Navbar = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  console.log(props)

  /// STYLE ///
  const navStyle = {
    backgroundColor: theme.navColor,
    height: '50px',
    width: '100%',
    position: 'fixed',
    bottom: 0,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const iconsStyle = {
    width: '90%',
    height: '100%',
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const iconStyle = {
    color: '#F6F6F6'
  }

  const keyPressHandler = (key) => {
    console.log(key)
    if (key === 'esc') {
      props.history.push('/')
    } else if (key === 'ctrl+a') {
      toggleTheme()
    }
  }

  return (
    <div style={navStyle}>
      <KeyboardEventHandler
        handleKeys={['esc', 'ctrl+a']}
        onKeyEvent={(key, e) => keyPressHandler(key)}
      />
      <div style={iconsStyle}>
        <Link to='/'>
          <Icon icon={menuIcon} height='2.2em' style={iconStyle} />
        </Link>
        <Icon icon={textSize} height='2.2em' style={iconStyle} onClick={toggleTheme} />
      </div>
    </div>
  )
}

export default Navbar
