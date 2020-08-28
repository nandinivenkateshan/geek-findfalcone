import React,{ useState, useEffect, useContext, createContext } from 'react'
import Destination from '../Planets'
import Time from '../Time'
import FindButton from '../FindButton'
import '../../assets/css/style.css'
import {DataContextProvider } from '../Context'

function FindFalcone ({onHandleNetwork}) {
    return (
        <section className='falcone falcone-main' >
            <h1 className='falcone-main__heading'>Select Planets you want to search in</h1>
            <DataContextProvider>
                <Destination />
                <Time />
                <FindButton onNetwork={val => onHandleNetwork(val)}/>
            </DataContextProvider>
        </section>
    )
}

export default FindFalcone
