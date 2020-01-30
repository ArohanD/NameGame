import React from 'react'

const Leaderboard = (props) => {

  if (props.location.state) {
    return (
      <div>
        {`The score was ${props.location.state.score}`}
      </div>
    )
  } else {
    return (
      <div>This is the leaderboard</div>
    )
  }
}

export default Leaderboard
