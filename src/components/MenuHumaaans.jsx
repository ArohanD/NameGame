import React from 'react'
import { Standing13, Sitting1, Standing3, Sitting6 } from 'react-humaaans'

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
        <Standing13
          height={100}
        />
        <div style={{ transform: 'scale(-1, 1)' }}>
          <Standing3
            height={100}
            hairColor='#000000'
            skinColor='#FDA7DC'
            shoeColor='#0000EE'
            pantColor='#FF44EA'
            shirtColor='#FFAB11'
            coatColor='#FF0E11'
            hatColor='#FFFFEE'
          />
        </div>
      </div>
      <div style={humaaansStyle}>
        <div style={{ transform: 'scale(-1, 1)' }}>
          <Sitting1
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
          />
        </div>
        <Sitting6
          height={100}
        />
      </div>
    </div>
  )
}

export default MenuHumaaans
