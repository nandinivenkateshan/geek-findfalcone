import React, { useState, useEffect } from 'react'
import './find-falcone.css'
import Select from 'react-select'

function FindFalcone () {
  const [planets, setPlanets] = useState()

  const [data, setData] = useState([
    { destination: 1, disableVal: false },
    { destination: 2, disableVal: false },
    { destination: 3, disableVal: false },
    { destination: 4, disableVal: false }
  ])

  useEffect(() => {
    getPlanets()
    getVehicles()
  }, [])

  const getPlanets = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/planets')
    const result = await response.json()
    const updatedResult = result.map(item => {
      item.value = item.name
      item.label = item.name
      return item
    })
    const updatedData = data.map(item => {
      item.planets = updatedResult
      return item
    })
    setData(updatedData)
  }

  const getVehicles = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/vehicles')
    const result = await response.json()
    const updatedData = data.map(item => {
      item.vehicles = result
      return item
    })
    setData(updatedData)
    console.log('result', result)
  }

  const handleSelectDest = (value, destination, indexOfSelectedPlanet) => {
    const planetName = value.name
    console.log('destname', planetName, 'destination', destination, 'indexofseelcted', indexOfSelectedPlanet)
    
    // Display the vehicles
    data.map(item => {
      if (item.destination === destination) {
        item.disableVal = true
      }
    })


    // Planets name selection
    const deSelectedDest = data.filter(item => item.destination !== destination)

    const deSelectedPlanets = deSelectedDest.map(item => {
      return item.planets.filter(item => item.name !== planetName)
    })

    const newData = deSelectedDest.map((item, index) => {
      item.planets = deSelectedPlanets[index]
      return item
    })

    const selectedData = data[indexOfSelectedPlanet]
    newData.splice(indexOfSelectedPlanet, 0, selectedData)
    setData(newData)
    
  }

  return (
    <section className='findFalcone'>
      <h1 className='findFalcone__header'> Finding Falcone !</h1>
      <p className='findFalcone__sub-heading'>Select planets you want to search in </p>
      {console.log('data', data)}
      <form className='findFalcone__form'>
        {data.map((item, index) => {
          return (
            <article className='findFalcone__form__item' key={item.destination}>
              <h4>Destination  {item.destination}</h4>
              <Select
                options={item.planets}
                onChange={value => handleSelectDest(value, item.destination, index)}
                className='findFalcone__form__item_selectBtn'
              />
              {item.disableVal && item.vehicles.map(item => {
                return (
                  <p key={item.name}>
                    <input type='radio' />
                    <label>{item.name}</label>
                    <label>({item.total_no})</label>
                  </p>)
              })}
            </article>
          )
        })}
        <h4>Time Taken:0</h4>
      </form>

    </section>
  )
}

export default FindFalcone
