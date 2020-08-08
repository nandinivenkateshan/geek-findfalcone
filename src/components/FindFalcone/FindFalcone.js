import React, { useState, useEffect } from 'react'
import './find-falcone.css'
import Select from 'react-select'

function FindFalcone () {
  const [data, setData] = useState([
    { destination: 1, isDisablePlanet: false, showVehicle: false },
    { destination: 2, isDisablePlanet: true, showVehicle: false },
    { destination: 3, isDisablePlanet: true, showVehicle: false },
    { destination: 4, isDisablePlanet: true, showVehicle: false }
  ])

  useEffect(() => {
    getPlanets()
    getVehicles()
  }, [])

  const getPlanets = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/planets')
    const result = await response.json()
    const updatedResult = result.map((item, index) => {
      item.value = item.name
      item.label = item.name
      item.isSelected = false
      return item
    })

    const updatedData = data.map(item => {
      item.planets = JSON.parse(JSON.stringify(updatedResult))
      return item
    })
    setData(updatedData)
  }

  const getVehicles = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/vehicles')
    const result = await response.json()
    result.forEach(item => {
      item.isDisable = ''
      item.count = 0
      item.checked = false
    })
    const updatedData = data.map(item => {
      item.vehicles = JSON.parse(JSON.stringify(result))
      return item
    })
    setData(updatedData)
  }

  const handleSelectDest = (value, destination, indexOfSelectedPlanet) => {
    const planetName = value.name
    let deSelectedPlanets
    const updatedData = data.map((item, index) => {
      if (index === indexOfSelectedPlanet) {
        item.showVehicle = true
        item.vehicles.forEach(elem => {
          if (!elem.total_no || value.distance > elem.max_distance) {
            elem.isDisable = true
          } else {
            elem.isDisable = false
          }
        })

        deSelectedPlanets = item.planets.map(planet => {
          if (planet.name === planetName) {
            planet.isSelected = true
          } else {
            planet.isSelected = false
          }
          return planet
        })
        item.planets = JSON.parse(JSON.stringify(deSelectedPlanets))
      }

      if (item.destination >= destination) {
        item.vehicles.forEach(item => {
          item.count = 0
        })
      }

      if (item.destination > indexOfSelectedPlanet) {
        const val = deSelectedPlanets.filter(item => !item.isSelected)
        item.planets = JSON.parse(JSON.stringify(val))
      }
      return item
    })
    setData(updatedData)
  }

  const handleRadio = (e, index, destination) => {
    const vehicleName = e.target.value.split('.')[0]
    const updatedData = data.map(item => {
      if (item.destination === destination + 1 && destination <= 4) {
        item.isDisablePlanet = false
      }

      if (destination === item.destination) {
        item.vehicles.forEach(ele => {
          if (ele.name === vehicleName) {
            ele.checked = true
          } else {
            ele.checked = false
          }
        })
      }

      if (item.destination >= destination) {
        item.vehicles.forEach(elem => {
          if (elem.name === vehicleName && !elem.count) {
            elem.total_no -= 1
            elem.count += 1
          }
          if (elem.name !== vehicleName && elem.count) {
            elem.total_no += 1
            elem.count -= 1
          }
        })
      }
      return item
    })
    setData(updatedData)
  }

  return (
    <section className='findFalcone'>
      <h1 className='findFalcone__header'> Finding Falcone !</h1>
      <p className='findFalcone__sub-heading'>Select planets you want to search in </p>

      <form className='findFalcone__form'>
        {data.map((item, index) => {
          return (
            <article className='findFalcone__form__item' key={item.destination}>
              <h4>Destination  {item.destination}</h4>
              <Select
                isDisabled={item.isDisablePlanet}
                options={item.planets}
                onChange={value => handleSelectDest(value, item.destination, index)}
                className='findFalcone__form__item_selectBtn'
              />
              <div>
                {item.showVehicle && item.vehicles.map(elem => {
                  return (
                    <p key={elem.name + item.destination} className={elem.isDisable ? 'vehicle-disable' : ''}>
                      <input
                        id={elem.name + item.destination}
                        type='radio' value={`${elem.name}.${item.destination}`} name={`vehicle${item.destination}`}

                        onChange={(e) => handleRadio(e, index, item.destination)}
                      />
                      <label for={elem.name + item.destination}>{elem.name}</label>
                      <label>({elem.total_no})</label>
                    </p>)
                })}
              </div>
            </article>
          )
        })}
        <h4>Time Taken:0</h4>
      </form>

    </section>
  )
}

export default FindFalcone
