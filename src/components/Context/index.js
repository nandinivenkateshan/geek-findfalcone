import React, { createContext, useReducer, useState, useEffect } from 'react'
import { fetchGet,fetchPost, fetchToken } from '../../helpers'
import {showV, showR } from '../Reducers/Reducers'
import { BASE_URL } from '../../config'
import { act } from 'react-dom/test-utils'
import { showVehicles } from '../Reducers/Actions'

 const DataContext = createContext()

 const reducer = (state,action) => {
   switch(action.type) {
     case 'SHOW_VEHICLES' : return showV(state,action)
     case 'SHOW_RADIO': return showR(state,action)
     default: return state
   }
 }

 const DataContextProvider = ({ children }) => {
    const [initialState,setState] = useState([
        { destination: 1, showPlanets: true, showVehicles: false, time: 0 },
        { destination: 2, showPlanets: false, showVehicles: false, time: 0 },
        { destination: 3, showPlanets: false, showVehicles: false, time: 0 },
        { destination: 4, showPlanets: false, showVehicles: false, time: 0 }
      ]
      )

      useEffect(() => {  
        getPlanets()
        getVehicles()
      }, [])
    
      const updateData = (key,val) => {
        const updatedData = initialState.map(item => {
          item[key] = JSON.parse(JSON.stringify(val))
          return item
        })
        setState(updatedData)
      }
  
      const getPlanets = async () => {
        const result = await fetchGet(`${BASE_URL}/planets`)
        // if (result.netErr) {
        //   onNetwork('Network Error:  Failed to Fetch Planets') 
        //   return
        // }
        const updatedResult = result.map((item, index) => {
          item.value = item.name
          item.label = item.name
          item.isSelected = false
          return item
        })
        updateData('planets',updatedResult)
      }
    
      const getVehicles = async () => {
        const result = await fetchGet(`${BASE_URL}/vehicles`)
        // if (result.netErr) {
        //   onNetwork('Network Error:  Failed to Fetch Vehicles')
        //   return
        // }
        result.forEach(item => {
          item.isDisable = ''
          item.count = 0
          item.checked = false
        })
        updateData('vehicles',result)
      }
    

const [state,dispatch] = useReducer(reducer,initialState)

    return( 
        <DataContext.Provider value={{state,dispatch}}> {children} </DataContext.Provider>
    )
}


export { DataContext, DataContextProvider }
