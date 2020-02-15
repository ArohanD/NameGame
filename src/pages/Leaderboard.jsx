import React, { useState, useContext } from 'react'
import { db } from '../firebase.js'
import Navbar from '../components/Navbar.jsx'
import Button from '../components/Button.jsx'
import ThemeContext from '../ThemeContext.jsx'
import MenuHumaaans from '../components/MenuHumaaans.jsx'

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
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'

  }

  const titleStyle = {
    marginTop: '15vh'
  }

  const leaderboardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '10vh'
  }

  const humaaansPosition = {
    width: '100vw',
    position: 'fixed',
    bottom: '42px'
  }

  const submitStyle = {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  }

  const scoreFlex = {
    display: 'flex',
    flexDirection: 'column',
    height: '10vh',
    width: '80vw',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  }

  const submitFlex = {
    display: 'flex',
    flexDirection: 'column',
    height: '30vh',
    width: '80vw',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  }

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px'
  }

  /// STATE ///
  const [scores, setScores] = useState([])
  const [userName, setUserName] = useState('anon')

  const getScores = () => {
    db.collection('scores').orderBy('score', 'desc').get()
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
        <div style={submitStyle}>
          <h1>Well Done!</h1>
          <div style={scoreFlex}>
            <p>You've scored</p>
            <h1>{userScore}</h1>
            <p>points</p>
          </div>
          <div style={submitFlex}>
            <label style={labelStyle}>Leave your initials and submit to the leaderboard:
              <input onChange={(e) => parseInput(e)} />
            </label>
            <Button text='Submit Score' onClick={() => submitScore(userScore)} />
            <Button text='Leaderboard' onClick={() => getScores()} />
          </div>
        </div>
        <div style={humaaansPosition}>
          <MenuHumaaans />
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
          <h2 style={titleStyle}>High Scores</h2>
          <div className="cyLeaderBoard" style={leaderboardStyle}>
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
          <div style={humaaansPosition}>
            <MenuHumaaans />
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
  const result = cDate.getDate() + '/' + months[cDate.getMonth()] + '/' + cDate.getFullYear()
  return result
}

export default Leaderboard
