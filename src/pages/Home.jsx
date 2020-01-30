import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../ThemeContext.jsx'
import Button from '../components/Button.jsx'
import Navbar from '../components/Navbar.jsx'

const Home = (props) => {
  const { theme } = useContext(ThemeContext)

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
    gridRow: '2 / 4',
    justifyContent: 'space-around'
  }

  const titleHolder = {
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

  return (
    <div id='home_grid'>
      <div style={titleHolder}>
        <div style={titleContainerStyle}>
          <div>THE</div>
          <h1 style={titleStyle}>NAME GAME</h1>
        </div>
        <div style={circleStyle} />
      </div>
      <div style={buttonHolderStyle}>
        <Link to='/WhoIs'>
          <Button text='Play' />
        </Link>
        <Link to='/Leaderboard'>
          <Button text='Leaderboard' />
        </Link>
        <Button text='Flashcards' />
      </div>
      <Navbar />
    </div>
  )
}

export default Home
