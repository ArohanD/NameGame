import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import ThemeContext from '../ThemeContext.jsx'

const WhoIs = (props) => {
  const [people, setPeople] = useState(undefined)
  const { theme } = useContext(ThemeContext)

  const whoIsPageStyle = {
    backgroundColor: theme.baseColor
  }

  useEffect(() => {
    axios.get('https://willowtreeapps.com/api/v1.0/profiles')
      .then(({ data }) => {
        setPeople(data)
      })
  }, [])

  if (!people) return (<div>Loading...</div>)

  return (
    <div id='WhoIs_grid' style={whoIsPageStyle}>
      <div>
        <div></div>
        <h1>Who is?</h1>
      </div>
      <GameBox />
      <Navbar />
    </div>
  )
}

const GameBox = (props) => {
  const { theme } = useContext(ThemeContext)

  const gameboxContainerStyle = {
    justifySelf: 'center',
    alignSelf: 'center',

    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  }

  const boxStyle = {
    border: `1px solid ${theme.primaryColor}`,
    height: '40vh',
    margin: '20px auto'
  }

  const clockStyle = {

  }

  return (
    <div style={gameboxContainerStyle}>
      <h2>Matt Matterson</h2>
      <div>
        <div style={boxStyle} />
        <div style={clockStyle} />
        <p>Select the profile of your colleague named above.</p>
        <ProgressBar />
      </div>
    </div>
  )
}

const ProgressBar = (props) => {
  const progressContainer = {
    margin: '20px',
    width: '80vw',
    display: 'flex',
    justifyContent: 'space-around'
  }

  return (
    <div style={progressContainer}>
      <div>
        <h2>150</h2>
        <p>points</p>
      </div>
      <div>
        <h2>3/5</h2>
        <p>remaining</p>
      </div>
    </div>
  )
}

export default WhoIs
