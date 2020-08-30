import React from 'react'
import '../../assets/css/style.scss'

function Time ({ data }) {
  const totalTime = data.reduce((acc, cv) => ({ time: acc.time + cv.time }))

  return (
    <h4 className='falcone__time'>Time: {totalTime.time}</h4>
  )
}

export default Time
