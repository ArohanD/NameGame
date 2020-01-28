import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext.jsx'
import Button from '../components/Button.jsx'

const Home = (props) => {
  const { theme } = useContext(ThemeContext)

  return (
    <div>
      <div>THE</div>
      <div>NAME GAME</div>
      <Button text='Play' />
      <Button text='Leaderboard' />
      <Button text='Flashcards' />
    </div>
  )
}

export default Home
