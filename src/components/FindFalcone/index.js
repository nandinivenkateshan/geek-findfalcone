import React, { useState, useEffect } from 'react'
import DestinationList from '../DestinationList'
import Time from '../Time'
import FindButton from '../FindButton'
import '../../assets/css/style.css'
import { getReq, postReq } from '../../helpers'
import { BASE_URL } from '../../config'

function FindFalcone ({ onNetwork }) {
  const [state, setState] = useState([
    { destination: 1, isSelectBtn: true, showVehicles: false, time: 0 },
    { destination: 2, isSelectBtn: false, showVehicles: false, time: 0 },
    { destination: 3, isSelectBtn: false, showVehicles: false, time: 0 },
    { destination: 4, isSelectBtn: false, showVehicles: false, time: 0 }
  ])
  const [isSubmit, setSubmit] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    getToken()
    getPlanets()
    getVehicles()
  }, [])

  const getToken = async () => {
    const result = await postReq(`${BASE_URL}/token`)
    if (result.error) {
      onNetwork(result.error)
      return
    }
    if (result.netErr) {
      onNetwork('Network Error')
      return
    }
    setToken(result.token)
  }

  const getPlanets = async () => {
    const result = await getReq(`${BASE_URL}/planets`)
    if (result.netErr) {
      onNetwork('Network Error')
      return
    }
    result.forEach(item => {
      item.value = item.name
      item.label = item.name
      item.isSelected = false
    })
    updateData('planets', result)
  }

  const getVehicles = async () => {
    const result = await getReq(`${BASE_URL}/vehicles`)
    if (result.netErr) {
      onNetwork('Network Error')
      return
    }
    result.forEach(item => {
      item.isDisable = ''
      item.count = 0
      item.checked = false
    })
    updateData('vehicles', result)
  }

  const updateData = (key, val) => {
    const updatedState = state.map((item) => {
      item[key] = JSON.parse(JSON.stringify(val))
      return item
    })
    setState(updatedState)
  }

  const handleUpdatedState = val => setState(val)

  const handleFindBtn = val => setSubmit(val)

  return (
    <section className='falcone falcone-main'>
      <article className='falcone-heading'>
        <h1 className='falcone-main__heading'>
          Select Planets you want to search in
        </h1>
        <Time data={state} />
      </article>
      <article className='falcone-content'>
        <DestinationList
          data={state}
          onUpdateState={val => handleUpdatedState(val)}
          onSubmitVal={val => handleFindBtn(val)}
        />

        <FindButton
          isSubmit={isSubmit}
          data={state}
          token={token}
          handleNetwork={val => onNetwork(val)}
        />
      </article>
    </section>
  )
}

export default FindFalcone
