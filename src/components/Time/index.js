import React, { useContext } from 'react'
import '../../assets/css/style.css'
import { DataContext } from '../Context'

function Time () {
    const { state, dispatch } = useContext(DataContext)
    // state.map(item => )
    
    const totalTime = state.reduce((acc,cv) => ({time:acc.time + cv.time}))
    
    return (
    <h4 className='falcone__time'>Time: {totalTime.time}</h4>
    )
}

export default Time