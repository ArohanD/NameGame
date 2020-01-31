import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../ThemeContext.jsx'
import Button from '../components/Button.jsx'
import Navbar from '../components/Navbar.jsx'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import MenuHumaaans from '../components/MenuHumaaans.jsx'

const Home = (props) => {
  const { theme } = useContext(ThemeContext)

  /// STYLE ///
  const circleStyle = {
    height: '200px',
    width: '200px',
    backgroundColor: theme.secondaryColor,
    borderRadius: '200px',

    gridColumn: '2 / 4',
    gridRow: '1 / 3',
    justifySelf: 'center',
    alignSelf: 'center'
  }

  const buttonHolderStyle = {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '3 / 7',
    gridRow: '2 / 3',
    justifyContent: 'space-around',
    alignItems: 'center'
  }

  const titleHolder = {
    marginTop: '15vh',
    maxWidth: '330px',
    alignSelf: 'center',
    gridColumn: '2 / 8',

    display: 'grid',
    height: '300px',
    gridTemplateColumns: '33% 33% 33%',
    gridTemplateRows: '33% 33% 33%',
    justifySelf: 'center'
  }

  const titleContainerStyle = {
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1 / 3',
    gridRow: '2 / 3'
  }

  const titleStyle = {
    fontSize: '3em',
    margin: 0
  }

  const [interactionIndex, setInteractionIndex] = useState(-1)

  const keyPressHandler = (key) => {
    if (key === 'left' || key === 'up') {
      if (interactionIndex <= 0) {
        setInteractionIndex(2)
      } else {
        setInteractionIndex(interactionIndex - 1)
      }
    } else if (key === 'right' || key === 'down') {
      if (interactionIndex >= 2) {
        setInteractionIndex(0)
      } else {
        setInteractionIndex(interactionIndex + 1)
      }
    }

    if (key === 'space') {
      if (interactionIndex === 0) {
        props.history.push('/WhoIs')
      } else if (interactionIndex === 1) {
        props.history.push('/Leaderboard')
      } else if (interactionIndex === 2) {
        props.history.push('/')
      }
    }
  }

  return (
    <div id='home_grid'>
      <KeyboardEventHandler
        handleKeys={['all']}
        onKeyEvent={(key, e) => keyPressHandler(key)}
      />
      <div style={titleHolder}>
        <div style={titleContainerStyle}>
          <div>THE</div>
          <h1 style={titleStyle}>NAME GAME</h1>
        </div>
        <div style={circleStyle} />
      </div>
      <div style={buttonHolderStyle}>
        <Link to='/WhoIs'>
          <Button
            text='Play'
            highlight={interactionIndex === 0}
          />
        </Link>
        <Link to='/Leaderboard'>
          <Button
            text='Leaderboard'
            highlight={interactionIndex === 1}
          />
        </Link>
      </div>
      <MenuHumaaans />
      <Navbar history={props.history} />
    </div>
  )
}

export default Home
