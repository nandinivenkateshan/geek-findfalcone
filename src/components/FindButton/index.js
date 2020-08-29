import React from 'react'
import '../../assets/css/style.css'
import { postReq } from '../../helpers'
import { BASE_URL } from '../../config'

function Button ({ handleNetwork, isSubmit, data, token }) {
  const handleSubmit = async (e) => {
    // e.preventDefault()
    let path
    const planetNames = []
    const vehicleNames = []
    data.map(item => {
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
    const result = await postReq(`${BASE_URL}/find`, value)
    if (result.netErr) {
      handleNetwork('Network Error in finding falcone')
      return
    }
    if (result.status) {
      const totalTime = data.reduce((acc, cv) => ({ time: acc.time + cv.time }))
      path = `/find?status=${result.status}&&name=${result.planet_name}&&time=${totalTime.time}`
    }
    window.open(path)
  }

  return (
    <button className={!isSubmit ?'submitBtn--disable' : 'submitBtn--active'} disabled={!isSubmit} onClick={handleSubmit}>Find Falcone</button>
  )
}

export default Button
