import React, { useContext, useState, useEffect } from 'react'
import ThemeContext from '../../ThemeContext.jsx'

const GameBox = (props) => {
  const { theme } = useContext(ThemeContext)

  const clockStyle = {
    '--backgroundColor': theme.primaryColor,
    '--textColor': theme.name === 'high_contrast' ? '#000000' : '#F6F6F6'
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
    <div id='gamebox'>
      <h2>{currentEmployeeName || 'Loading...'}</h2>
      <div>
        <div id='profileHolder' style={{ '--borderColor': theme.primaryColor }}>
          {
            props.people.map((person, i) => {
              if (props.currentEmployeeId !== person.id) fadeIndex++
              return (
                <Profile
                  highlight={props.selectedProfile === i}
                  last={i === props.people.length - 1}
                  key={person.id}
                  person={person}
                  checkResponse={props.checkResponse}
                  fadeAt={props.currentEmployeeId === person.id ? null : fadeOrder[fadeIndex]}
                  timeLeft={props.timeLeft}
                />
              )
            })
          }
          <div id='gameClock' style={clockStyle}>{props.timeLeft + 's'}</div>
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
  const profile = props.person

  /// STYLE ///
  const [opacity, setOpacity] = useState(100)
  useEffect(() => {
    if (props.fadeAt && props.fadeAt.includes(props.timeLeft)) setOpacity(opacity - 33)
  }, [props.timeLeft])

  const imageContainerStyle = {
    border: props.highlight ? `4px solid ${theme.secondaryColor}` : `2px solid ${theme.primaryColor}`
  }

  return (
    <div
      key={profile.id}
      style={imageContainerStyle}
      className={props.last ? 'profile lastProfile cyProfile' : 'profile cyProfile'}
    >
      {
        profile.id === 0 ? null
          : <img
            tabIndex='0'
            src={profile.headshot.url}
            style={{ '--opacityMod': opacity + '%' }}
            onClick={() => props.checkResponse(profile.id)}
          />
      }
    </div>
  )
}

const ProgressBar = (props) => {
  return (
    <div id='progressItems'>
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
