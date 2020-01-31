import React, { useState, useContext } from 'react'
import { db } from '../firebase.js'
import Navbar from '../components/Navbar.jsx'
import Button from '../components/Button.jsx'
import ThemeContext from '../ThemeContext.jsx'

const Leaderboard = (props) => {
  const { theme } = useContext(ThemeContext)

  /// STYLE ///
  const triangle = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: `200px solid ${theme.secondaryColor}`,
    borderLeft: '100vw solid transparent',
    display: theme.name === 'high_contrast' ? 'none' : 'inherit'
  }

  const pageStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'

  }

  const leaderboardStyle = {
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '10vh'
  }

  /// STATE ///
  const [scores, setScores] = useState([])
  const [userName, setUserName] = useState('anon')

  const getScores = () => {
    db.collection('scores').get()
      .then(response => {
        console.log('db call')
        const data = response.docs.map(doc => doc.data())
        setScores(data)
      })
  }

  const submitScore = (score) => {
    console.log(userName, score)
    db.collection('scores').add({
      name: userName,
      score: score,
      date: new Date()
    })
      .then(() => {
        getScores()
      })
  }

  const parseInput = (event) => {
    setUserName(event.target.value)
  }

  if (props.location.state && scores.length === 0) {
    const userScore = props.location.state.score
    return (
      <div>
        <div>
          <h1>Well Done!</h1>
          <p>You've scored</p>
          <h2>{userScore}</h2>
          <p>points</p>
        </div>
        <div>
          <input onChange={(e) => parseInput(e)} />
          <Button text='Submit Score' onClick={() => submitScore(userScore)} />
          <Button text='Leaderboard' onClick={() => getScores()} />
        </div>
        <Navbar history={props.history} />
      </div>
    )
  } else {
    if (scores.length === 0) getScores()
    return (
      <div>
        <div style={triangle} />
        <div style={pageStyle}>
          <h2>High Scores</h2>
          <div style={leaderboardStyle}>
            <div>
              {
                scores.map((entry, i) => {
                  return (
                    <ScoreRow key={i} row={entry} />
                  )
                })
              }
            </div>
          </div>
          <Navbar />
        </div>

      </div>
    )
  }
}

const ScoreRow = (props) => {
  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }

  const cellStyle = {
    width: '110px',
    margin: '5px'
  }

  const username = props.row.name
  const score = props.row.score
  const date = parseDate(props.row.date)

  return (
    <div key={props.row.date} style={rowStyle}>
      <div style={cellStyle}>{username}</div>
      <div style={cellStyle}>{score}</div>
      <div style={cellStyle}>{date}</div>
    </div>
  )
}

const parseDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const cDate = date.toDate()
  const result = cDate.getDate() + '/' + months[cDate.getMonth()] + '/' + cDate.getYear()
  return result
}

export default Leaderboard
