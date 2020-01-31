import React, { useState, useEffect, useContext, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import GameBox from '../components/Gamebox/GameBox.jsx'
import Navbar from '../components/Navbar.jsx'
import ThemeContext from '../ThemeContext.jsx'
import KeyboardEventHandler from 'react-keyboard-event-handler'

const WhoIs = (props) => {
  const { theme } = useContext(ThemeContext)

  /// STYLING ///
  const whoIsPageStyle = {
    backgroundColor: theme.baseColor
  }

  const triangle = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: `200px solid ${theme.secondaryColor}`,
    borderRight: '100vw solid transparent',
    display: theme.name === 'high_contrast' ? 'none' : 'inherit'
  }

  /// STATE ///
  const [people, setPeople] = useState([])
  const [currentFive, setCurrentFive] = useState([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const timeLeftRef = useRef(timeLeft)
  timeLeftRef.current = timeLeft // access current value regardless of context
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null)
  const [startGame, setStartGame] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(-1)

  /// GAME METHODS ///
  const runGame = (e) => {
    const peopleQueue = JSON.parse(JSON.stringify(people))
    setCurrentFive(people.slice(0, 5))
    peopleQueue.splice(0, 5)
    setPeople(peopleQueue)
    setTimeLeft(15)
    startTimer()
  }

  const startTimer = () => {
    clearInterval(window.timer)
    window.timer = window.setInterval(() => {
      setTimeLeft(timeLeftRef.current - 1)
    }, 1000)
  }

  // Advance games if no selection made
  useEffect(() => {
    if (timeLeft === 0) {
      runGame()
      setRound(round + 1)
    }
  }, [timeLeft])

  // Select correct answer from choices
  useEffect(() => {
    if (currentFive.length > 0) {
      const randomIndex = Math.floor(Math.random() * 5)
      console.log(randomIndex)
      setCurrentEmployeeId(currentFive[randomIndex].id)
    }
  }, [currentFive])

  // Load Data
  useEffect(() => {
    axios.get('https://willowtreeapps.com/api/v1.0/profiles')
      .then(({ data }) => {
        return copyAndShuffleObjectArray(data)
      })
      .then((shuffledData) => {
        setPeople(shuffledData)
        setStartGame(true)
      })
  }, [])

  useEffect(() => {
    runGame()
  }, [startGame])

  const checkResponse = (id) => {
    if (id === currentEmployeeId) {
      setScore(score + timeLeft)
    } else {
      setScore(score - 5)
    }
    runGame()
    setRound(round + 1)
  }

  if (!people) return (<div>Loading...</div>)
  if (round === 15) {
    return <Redirect
      push to={{
        pathname: '/Leaderboard',
        state: { score: score }
      }}
    />
  }

  const keyPressHandler = (key, e) => {
    const nums = [1, 2, 3, 4, 5]
    const directions = ['left', 'right']

    if (nums.includes(Number(key))) {
      setSelectedProfile(+key)
    } else if (directions.includes(key)) {
      if (key === 'left') {
        if (selectedProfile <= 0) {
          setSelectedProfile(4)
        } else {
          setSelectedProfile(selectedProfile - 1)
        }
      } else if (key === 'right') {
        if (selectedProfile === 4) {
          setSelectedProfile(0)
        } else {
          setSelectedProfile(selectedProfile + 1)
        }
      }
    }

    if (key === 'space') {
      checkResponse(currentFive[selectedProfile].id)
    }
  }

  return (
    <div id='WhoIs_grid' style={whoIsPageStyle}>
      <KeyboardEventHandler
        handleKeys={['all']}
        onKeyEvent={(key, e) => keyPressHandler(key, e)}
      />
      <div>
        <div style={triangle} />
        <h1 className='floating_header'>Who is?</h1>
      </div>
      <GameBox
        selectedProfile={selectedProfile}
        currentEmployeeId={currentEmployeeId}
        people={currentFive}
        score={score}
        round={round}
        timeLeft={timeLeft}
        checkResponse={checkResponse.bind(this)}
      />
      <Navbar history={props.history} />
    </div>
  )
}

const copyAndShuffleObjectArray = (array) => {
  const copy = array.map(obj => JSON.stringify(obj))
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.map(str => JSON.parse(str))
}

export default WhoIs
