import React from 'react'
import Select from 'react-select'
import '../../assets/css/style.css'

function DestinationList ({ data, onUpdateState, onSubmitVal }) {
  const handlePlanet = (value, destination, planetIndex) => {
    const planetName = value.name
    let updatedPlanets
    const updatedState = data.map((item, index) => {
      if (index === planetIndex) {
        // if (item.showVehicles)
        item.showVehicles = true
        item.time = 0
        // disable the vehicle based on the speed and distance
        item.vehicles.forEach((elem) => {
          !elem.total_no || value.distance > elem.max_distance
            ? (elem.isDisable = true)
            : (elem.isDisable = false)
        })
        // Don't show the selected planet in the next destination
        updatedPlanets = item.planets.map((planet) => {
          planet.name === planetName
            ? (planet.isSelected = true)
            : (planet.isSelected = false)
          return planet
        })
        item.planets = JSON.parse(JSON.stringify(updatedPlanets))
      }
      if (item.destination >= destination) {
        item.vehicles.forEach((item) => {
          item.count = 0
        })
      }
      if (item.destination !== destination && item.destination > planetIndex) {
        const deSelectedPlanets = updatedPlanets.filter((item) => !item.isSelected)
        item.planets = JSON.parse(JSON.stringify(deSelectedPlanets))
      }
      return item
    })
    onUpdateState(updatedState)
  }

  const handleVehicle = (e, planetIndex, destination) => {
    const vehicleName = e.target.value
    const planetDistance = data[planetIndex].planets.filter((item) => item.isSelected)[0].distance
    const updatedState = data.map(item => {
      // disable the select options
      if (item.destination === destination + 1 && destination <= 4) {
        item.isSelectBtn = true
      }
      // Activate the submit button once destination4's vehicle selected
      if (destination === 4) {
        onSubmitVal(true)
      }
      if (destination === item.destination) {
        item.vehicles.forEach((ele) => {
          ele.name === vehicleName
            ? (ele.checked = true)
            : (ele.checked = false)
        })
      }
      // Calaculate the time and no.of total vehicles left
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
          }
        })
      }
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
                        elem.isDisable
                          ? 'destination__vehicle--disable'
                          : 'destination__vehicle--active'
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
