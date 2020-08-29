import React from 'react'
import '../../assets/css/style.css'

function Time ({ data }) {
  const totalTime = data.reduce((acc, cv) => ({ time: acc.time + cv.time }))

  return (
    <h4 className='falcone__time'>Time: {totalTime.time}</h4>
  )
}

export default Time
