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

  return (
    <div className='humaaans'>
      <div className='humaaans'>
        {standing[generateRandomIndex(standing)]}
        <div className='mirror'>
          {standing[generateRandomIndex(standing)]}
        </div>
      </div>
      <div className='humaaans'>
        <div className='mirror'>
          {sitting[generateRandomIndex(sitting)]}
        </div>
        {sitting[generateRandomIndex(sitting)]}
      </div>
    </div>
  )
}

function generateRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

export default MenuHumaaans
