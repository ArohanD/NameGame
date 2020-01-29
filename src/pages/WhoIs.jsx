import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import ThemeContext from '../ThemeContext.jsx'

const WhoIs = (props) => {
  const { theme } = useContext(ThemeContext)

  const whoIsPageStyle = {
    backgroundColor: theme.baseColor
  }

  const triangle = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: `200px solid ${theme.secondaryColor}`,
    borderRight: '100vw solid transparent'
  }

  const [people, setPeople] = useState([])
  const [currentFive, setCurrentFive] = useState([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const timeLeftRef = useRef(timeLeft)
  timeLeftRef.current = timeLeft
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null)
  const [startGame, setStartGame] = useState(false)

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

  useEffect(() => {
    if(timeLeft === 0) {
      runGame()
      setRound(round + 1)
    }
  }, [timeLeft])

  useEffect(() => {
    if (currentFive.length > 0) {
      const randomIndex = Math.floor(Math.random() * 5)
      console.log(randomIndex)
      setCurrentEmployeeId(currentFive[randomIndex].id)
    }
  }, [currentFive])

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
      console.log('correct')
      setScore(score + timeLeft)
    } else {
      console.log('incorrect')
      setScore(score - 5)
    }
    runGame()
    setRound(round + 1)
  }

  if (!people) return (<div>Loading...</div>)

  return (
    <div id='WhoIs_grid' style={whoIsPageStyle}>
      <div>
        <div style={triangle} onClick={() => runGame()} />
        <h1 className='floating_header'>Who is?</h1>
      </div>
      <GameBox
        currentEmployeeId={currentEmployeeId}
        people={currentFive}
        score={score}
        round={round}
        timeLeft={timeLeft}
        checkResponse={checkResponse.bind(this)}
      />
      <Navbar />
    </div>
  )
}

const GameBox = (props) => {
  const { theme } = useContext(ThemeContext)

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
    minWidth: '25%',
    height: '25%',
    backgroundColor: theme.primaryColor,
    color: '#F6F6F6',

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

  return (
    <div style={gameboxContainerStyle}>
      <h2>{currentEmployeeName || 'Loading...'}</h2>
      <div>
        <div style={boxStyle}>
          {
            props.people.map(person => {
              return <Profile
                key={person.id}
                person={person}
                checkResponse={props.checkResponse} />
            })
          }
          <div style={clockStyle}>{props.timeLeft + 's'}</div>
        </div>
        <p>Select the profile of your colleague named above.</p>
        <ProgressBar round={props.round} score={props.score} />
      </div>
    </div>
  )
}

const Profile = (props) => {
  const { theme } = useContext(ThemeContext)

  const imageContainerStyle = {
    width: '100px',
    height: '30%',
    border: `2px solid ${theme.primaryColor}`,
    borderRadius: '15%',
    margin: '2px'
  }
  const imageStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '15%',
    objectFit: 'cover'
  }
  const profile = props.person

  return (
    <div key={profile.id} style={imageContainerStyle}>
      {
        profile.id === 0 ? null
          : <img
            src={profile.headshot.url}
            style={imageStyle}
            onClick={() => props.checkResponse(profile.id)}
            />
      }
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

const copyAndShuffleObjectArray = (array) => {
  const copy = array.map(obj => JSON.stringify(obj))
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.map(str => JSON.parse(str))
}

export default WhoIs
