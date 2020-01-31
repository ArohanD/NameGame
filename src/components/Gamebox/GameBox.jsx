import React, { useContext, useState, useEffect } from 'react'
import ThemeContext from '../../ThemeContext.jsx'

const GameBox = (props) => {
  const { theme } = useContext(ThemeContext)

  /// STYLE ///
  const gameboxContainerStyle = {
    justifySelf: 'center',
    alignSelf: 'center',

    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  }

  const boxStyle = {
    border: `4px solid ${theme.primaryColor}`,
    height: '40vh',
    margin: '20px auto',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',

    position: 'relative'
  }

  const clockStyle = {
    position: 'absolute',
    right: 0,
    bottom: 0,
    minWidth: '75px',
    height: '25%',
    backgroundColor: theme.primaryColor,
    color: theme.name === 'high_contrast' ? '#000000' : '#F6F6F6',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em'
  }

  const findEmployeeName = () => {
    for (const employee of props.people) {
      if (employee.id === props.currentEmployeeId) {
        return employee.firstName + ' ' + employee.lastName
      }
    }
  }

  const currentEmployeeName = findEmployeeName()
  const fadeTimes = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
  const [fadeOrder, setFadeOrder] = useState(fadeTimes)
  useEffect(() => {
    setFadeOrder(shuffleArray(fadeTimes))
  }, [props.people])

  let fadeIndex = -1
  return (
    <div style={gameboxContainerStyle}>
      <h2>{currentEmployeeName || 'Loading...'}</h2>
      <div>
        <div style={boxStyle}>
          {
            props.people.map((person, i) => {
              if (props.currentEmployeeId !== person.id) fadeIndex++
              return (
                <Profile
                  highlight={props.selectedProfile === i}
                  key={person.id}
                  person={person}
                  checkResponse={props.checkResponse}
                  fadeAt={props.currentEmployeeId === person.id ? null : fadeOrder[fadeIndex]}
                  timeLeft={props.timeLeft}
                />
              )
            })
          }
          <div style={clockStyle}>{props.timeLeft + 's'}</div>
        </div>
        <p>Select the profile of your colleague named above. You can also use the LEFT and RIGHT arrow keys to make a selection, and SPACE to confirm.</p>
        <ProgressBar
          round={props.round}
          score={props.score}
        />
      </div>
    </div>
  )
}

const Profile = (props) => {
  const { theme } = useContext(ThemeContext)

  /// STYLE ///
  const [opacity, setOpacity] = useState(100)
  useEffect(() => {
    if (props.fadeAt && props.fadeAt.includes(props.timeLeft)) setOpacity(opacity - 33)
  }, [props.timeLeft])

  const wWidth = window.innerWidth
  const sideLength = wWidth > 900 ? wWidth / 7 : wWidth / 6
  const imageContainerStyle = {
    width: sideLength,
    height: sideLength,
    minWidth: '100px',
    minHeight: '30%',
    border: props.highlight ? `4px solid ${theme.secondaryColor}` : `2px solid ${theme.primaryColor}`,
    borderRadius: '15%',
    margin: '2px'
  }

  const imageStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '15%',
    objectFit: 'cover',
    opacity: opacity + '%',
    transition: 'opacity 1s linear'
  }

  const profile = props.person

  return (
    <div key={profile.id} style={imageContainerStyle}>
      {
        profile.id === 0 ? null
          : <img
            tabindex='0'
            src={profile.headshot.url}
            style={imageStyle}
            onClick={() => props.checkResponse(profile.id)}
            />
      }
    </div>
  )
}

const ProgressBar = (props) => {
  /// STYLE ///
  const progressContainer = {
    margin: '20px',
    width: '80vw',
    display: 'flex',
    justifyContent: 'space-around'
  }

  return (
    <div style={progressContainer}>
      <div>
        <h2>{props.score}</h2>
        <p>points</p>
      </div>
      <div>
        <h2>{`${15 - props.round}/15`}</h2>
        <p>remaining</p>
      </div>
    </div>
  )
}

const shuffleArray = (array) => {
  const copy = array.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default GameBox
