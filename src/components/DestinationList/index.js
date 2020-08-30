import React from 'react'
import Select from 'react-select'
import '../../assets/css/style.scss'

function DestinationList ({ data, onUpdateState, onSubmitVal }) {
  const LAST_DESTINATION = 4
  const resetCurDestVehicles = (vehicles, destination) => {
    let vehicleName = ''
    vehicles.forEach(elem => {
      if (elem.checked) {
        document.getElementById(`${elem.name + destination}`).checked = false
        elem.checked = false
        elem.total_no += 1
        vehicleName = elem.name
      }
    })
    return vehicleName
  }

  const updateVehiclesStatus = (vehicles, planetDistance) => {
    vehicles.forEach((elem) => {
      !elem.total_no || planetDistance > elem.max_distance
        ? (elem.isDisable = true)
        : (elem.isDisable = false)
    })
  }

  const updatePlanetsStatus = (planets, planetName) => {
    return planets.map(planet => {
      planet.name === planetName
        ? (planet.isSelected = true)
        : (planet.isSelected = false)
      return planet
    })
  }

  const setNextDestVehicles = (item, vehicleName) => {
    item.vehicles.forEach(elem => {
      if (vehicleName === elem.name) {
        elem.total_no += 1
        item.isSelectBtn = false
      }
    })
  }

  const stringify = val => JSON.parse(JSON.stringify(val))

  const setPlanetsToNextDest = planets => stringify(planets.filter(item => !item.isSelected))

  const calcSpeedAndVehiclesLeft = (item, vehicleName, destination, planetDistance) => {
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
      }
    })
  }

  const handlePlanet = (value, destination, planetIndex) => {
    const planetName = value.name
    let updatedPlanetsStatus
    let vehicleName = ''
    const updatedState = data.map((item, index) => {
      if (index === planetIndex) {
        item.showVehicles = true
        item.time = 0
        if (item.showVehicles) vehicleName = resetCurDestVehicles(item.vehicles, destination)
        updateVehiclesStatus(item.vehicles, value.distance)
        updatedPlanetsStatus = updatePlanetsStatus(item.planets, planetName)
        item.planets = stringify(updatedPlanetsStatus)
      }
      // Reset count value
      if (item.destination >= destination) {
        item.vehicles.forEach(item => {
          item.count = 0
        })
      }
      if (item.destination > destination) setNextDestVehicles(item, vehicleName)
      if (item.destination !== destination && item.destination > planetIndex) item.planets = setPlanetsToNextDest(updatedPlanetsStatus)
      if (item.destination < destination) {
        item.isSelectBtn = false
        item.vehicles.forEach(elem => {
          elem.isPrevVehicle = 'true'
        })
      }
      onSubmitVal(false)
      return item
    })
    onUpdateState(updatedState)
  }

  const handleVehicle = (e, planetIndex, destination) => {
    const vehicleName = e.target.value
    const planetDistance = data[planetIndex].planets.filter((item) => item.isSelected)[0].distance
    const updatedState = data.map(item => {
      // Activate next select Btn the select options
      if (item.destination === destination + 1 && destination <= LAST_DESTINATION) {
        item.isSelectBtn = true
      }
      // Activate the submit button once destination4's vehicle selected
      if (destination === LAST_DESTINATION) onSubmitVal(true)
      if (destination === item.destination) {
        item.vehicles.forEach(ele => {
          ele.name === vehicleName
            ? (ele.checked = true)
            : (ele.checked = false)
        })
      }
      if (item.destination >= destination) calcSpeedAndVehiclesLeft(item, vehicleName, destination, planetDistance)
      return item
    })
    onUpdateState(updatedState)
  }

  return (
    <section className='destination destination-list'>
      {data.map((item, index) => {
        return (
          <article key={item.destination}>
            <p className='destination__heading'>
              Destination {item.destination}
            </p>
            <Select
              isDisabled={!item.isSelectBtn}
              options={item.planets}
              onChange={(value) => handlePlanet(value, item.destination, index)}
              className='destination__select__btn'
            />

            <div>
              {item.showVehicles &&
                item.vehicles.map((elem) => {
                  return (
                    <p
                      key={elem.name + item.destination}
                      className={
                        (elem.isDisable
                          ? 'destination__vehicle--disable'
                          : 'destination__vehicle--active') + ' ' +
                          (elem.isPrevVehicle ? 'destination__prevVehicle--disable' : null)
                      }
                    >

                      <input
                        id={elem.name + item.destination}
                        type='radio'
                        value={elem.name}
                        name={`vehicle${item.destination}`}
                        onChange={(e) =>
                          handleVehicle(e, index, item.destination)}
                      />
                      <label
                        htmlFor={elem.name + item.destination}
                        className='destination__vehicle__label'
                      >
                        {elem.name}
                      </label>
                      <label>({elem.total_no})</label>
                    </p>
                  )
                })}
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default DestinationList
