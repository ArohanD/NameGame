import React from 'react'
import * as Humaaans from 'react-humaaans'

const skinColors = ['#997659', '#B28B67', '#D4A181', '#D6B9A7']

// The Humaaans package can be separated into two sets of components, sitting and standing.
const sitting = []
const standing = []
Object.keys(Humaaans).forEach(key => {
  const Component = Humaaans[key]
  if (Component.toString().includes('Sitting')) {
    sitting.push(<Component height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />)
  } else if (Component.toString().includes('Standing')) {
    standing.push(<Component height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />)
  }
})

const MenuHumaaans = (props) => {
  const humaaansStyle = {
    gridRow: '3 / 4',
    gridColumn: '1 / 9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }

  return (
    <div style={humaaansStyle}>
      <div style={humaaansStyle}>
        {standing[generateRandomIndex(standing)]}
        <div style={{ transform: 'scale(-1, 1)' }}>
          {standing[generateRandomIndex(standing)]}
        </div>
      </div>
      <div style={humaaansStyle}>
        <div style={{ transform: 'scale(-1, 1)' }}>
          {sitting[generateRandomIndex(sitting)]}
        </div>
        {sitting[generateRandomIndex(sitting)]}
      </div>
    </div>
  )
}

function generateRandomIndex (array) {
  return Math.floor(Math.random() * array.length)
}

export default MenuHumaaans
