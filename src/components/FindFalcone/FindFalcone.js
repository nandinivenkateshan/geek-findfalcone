import React, { useState, useEffect } from 'react'
import './find-falcone.css'
import Select from 'react-select'

function FindFalcone () {
  const [data, setData] = useState([
    { destination: 1, isDisablePlanet: false, showVehicle: false, time: 0 },
    { destination: 2, isDisablePlanet: true, showVehicle: false, time: 0 },
    { destination: 3, isDisablePlanet: true, showVehicle: false, time: 0 },
    { destination: 4, isDisablePlanet: true, showVehicle: false, time: 0 }
  ])

  const [totalTime, setTime] = useState(0)
  const [submitBtn, setSubmitBtn] = useState(true)
  const [token, setToken] = useState()

  useEffect(() => {
    getPlanets()
    getVehicles()
    getToken()
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

  const getToken = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/token', {
      method: 'POST',
      headers: {
        accept: 'application/json'
      }
    })
    const result = await response.json()
    setToken(result.token)
  }

  const handleSelectDest = (value, destination, indexOfSelectedPlanet) => {
    const planetName = value.name
    let deSelectedPlanets

    const updatedData = data.map((item, index) => {
      if (index === indexOfSelectedPlanet) {
        item.showVehicle = true
        item.time = 0
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
      if (item.destination !== destination && item.destination > indexOfSelectedPlanet) {
        const val = deSelectedPlanets.filter(item => !item.isSelected)
        item.planets = JSON.parse(JSON.stringify(val))
      }
      return item
    })
    setData(updatedData)
  }

  const handleRadio = (e, indexOfSelectedPlanet, destination) => {
    const vehicleName = e.target.value.split('.')[0]
    const time = []
    const planetDistance = data[indexOfSelectedPlanet].planets.filter(item => item.isSelected)[0].distance
    const updatedData = data.map(item => {
      if (item.destination === destination + 1 && destination <= 4) {
        item.isDisablePlanet = false
      }
      if (destination === 4) {
        setSubmitBtn(false)
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
            if (item.destination === destination) {
              const distance = planetDistance / elem.speed

              item.time = distance
            }
          }
          if (elem.name !== vehicleName && elem.count) {
            elem.total_no += 1
            elem.count -= 1
            if (item.destination === destination) {

            }
          }
        })
      }
      return item
    })

    data.map(item => {
      time.push(item.time)
      return time
    })
    const totalTime = time.reduce((acc, cv) => {
      return acc + cv
    }, 0)
    console.log('total', totalTime)
    setTime(totalTime)
    setData(updatedData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const planet_names = []
    const vehicle_names = []
    data.map(item => {
      item.planets.map(ele => {
        if (ele.isSelected) {
          planet_names.push(ele.name)
        }
      })
      item.vehicles.map(ele => {
        if (ele.checked) {
          vehicle_names.push(ele.name)
        }
      })
    })

    const value = {
      token,
      planet_names,
      vehicle_names
    }
console.log(value,'value')
    const response = await window.fetch('https://findfalcone.herokuapp.com/find', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    console.log('lase response', await response.json())
  }

  return (
    <section className='findFalcone'>
      <p className='findFalcone__sub-heading'>Select planets you want to search in </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <section className='findFalcone__form'>
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
                          type='radio' value={`${elem.name}.${item.destination}`}
                          name={`vehicle${item.destination}`}
                          onChange={(e) => handleRadio(e, index, item.destination)}
                        />
                        <label htmlFor={elem.name + item.destination}>{elem.name}</label>
                        <label>({elem.total_no})</label>
                      </p>)
                  })}
                </div>
              </article>
            )
          })}
          <h4>Time Taken {totalTime}</h4>
        </section>
        <button className='findFalcone__btn' disabled={submitBtn}>Find Falcone !</button>
      </form>

    </section>
  )
}

export default FindFalcone
