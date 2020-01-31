import React, { useState } from 'react'
import { db } from '../firebase.js'
import Navbar from '../components/Navbar.jsx'
import Button from '../components/Button.jsx'

const Leaderboard = (props) => {
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
    console.log(scores)
    return (
      <div>
        <div>
          <h2>High Scores</h2>
          <div>
            {
              scores.map((entry) => {
                return (
                  <div key={entry.date}>{entry.name + ' ' + entry.score + ' ' + entry.date}</div>
                )
              })
            }
          </div>
        </div>
        <Navbar />
      </div>
    )
  }
}

export default Leaderboard
