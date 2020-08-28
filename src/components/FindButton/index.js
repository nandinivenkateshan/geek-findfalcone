import React, { useState, useContext, useEffect } from 'react'
import '../../assets/css/style.css'
import { DataContext } from '../Context'
import { fetchGet,fetchPost, fetchToken } from '../../helpers'
import { BASE_URL } from '../../config'

function Button ({onNetwork}) {
    const { state, dispatch } = useContext(DataContext)
    const [token,setToken] = useState('')

    useEffect (() => {
        getToken()
    },[])

    const getToken = async () => {
        const result= await fetchToken(`${BASE_URL}/toke`)
        if (result.error) {
          onNetwork(result.error)
          return
        }
        if (result.netErr) {
          onNetwork('Network Error:  Failed to Fetch token')
          return
        }
        setToken(result.token)
      }

      const handleSubmit = async (e) => {
        // e.preventDefault()
        let path
        const planetNames = []
        const vehicleNames = []
        state.map(item => {
          item.planets.map(ele => {
            if (ele.isSelected) {
              planetNames.push(ele.name)
            }
          })
          item.vehicles.map(ele => {
            if (ele.checked) {
              vehicleNames.push(ele.name)
            }
          })
        })

        const value = {
          token,
          planet_names: planetNames,
          vehicle_names: vehicleNames
        }
        const result = await fetchPost(`${BASE_URL}/find`, value)
        // if (result.netErr) {
        //   onNetwork('Network Error in finding falcone')
        //   return
        // }
        const totalTime = state.reduce((acc,cv) => ({time:acc.time + cv.time}))
        if (result.status) {
          path = `/find?status=${result.status}&&name=${result.planet_name}&&time=${totalTime.time}`
        }
        window.open(path)
      } 

    


    return (
        <button className='find-button' disabled={!state[3].time} onClick={handleSubmit}>Find Falcone</button>
    )
}

export default Button