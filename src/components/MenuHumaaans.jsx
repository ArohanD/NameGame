import React from 'react'
import {
  Sitting1,
  Sitting2,
  Sitting3,
  Sitting4,
  Sitting5,
  Sitting6,
  Sitting7,
  Sitting8,
  Standing1,
  Standing2,
  Standing3,
  Standing4,
  Standing5,
  Standing6,
  Standing7,
  Standing8,
  Standing9,
  Standing10,
  Standing11,
  Standing12,
  Standing13,
  Standing14,
  Standing15,
  Standing16,
  Standing22
} from 'react-humaaans'

const skinColors = ['#997659', '#B28B67', '#D4A181', '#D6B9A7']
const sitting = [
  <Sitting1 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting2 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting3 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting4 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting5 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting6 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting7 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Sitting8 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />
]

const standing = [
  <Standing1 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing2 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing3 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing4 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing5 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing6 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing7 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing8 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing9 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing10 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing11 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing12 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing13 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing14 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing15 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing16 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />,
  <Standing22 height={100} skinColor={skinColors[generateRandomIndex(skinColors)]} />
]

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
        {/* <Standing13
          height={100}
        /> */}
        <div style={{ transform: 'scale(-1, 1)' }}>
          {/* <Standing3
            height={100}
            hairColor='#000000'
            skinColor='#FDA7DC'
            shoeColor='#0000EE'
            pantColor='#FF44EA'
            shirtColor='#FFAB11'
            coatColor='#FF0E11'
            hatColor='#FFFFEE'
          /> */}
          {standing[generateRandomIndex(standing)]}
        </div>
      </div>
      <div style={humaaansStyle}>
        <div style={{ transform: 'scale(-1, 1)' }}>
          {/* <Sitting1
            height={100}
            hairColor='#000000'
            skinColor='#FDA7DC'
            shoeColor='#0000EE'
            pantColor='#FF44EA'
            shirtColor='#FFAB11'
            coatColor='#FF0E11'
            objectColor='#FFA011'
            hatColor='#FFFFEE'
            wheelchairColor='#FFBBEE'
          /> */}
          {sitting[generateRandomIndex(sitting)]}
        </div>
        {/* <Sitting6
          height={100}
        /> */}
        {sitting[generateRandomIndex(sitting)]}
      </div>
    </div>
  )
}

function generateRandomIndex (array) {
  return Math.floor(Math.random() * array.length)
}

export default MenuHumaaans
