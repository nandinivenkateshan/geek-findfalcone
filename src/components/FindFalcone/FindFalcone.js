import React, { useState, useEffect } from 'react'
import './find-falcone.css'
import Select from 'react-select'

function FindFalcone () {
  const [planets, setPlanets] = useState()

  const [data, setData] = useState([
    { destination: 1, isPlanet: false, isVehicle: false },
    { destination: 2, isPlanet: true, isVehicle: false },
    { destination: 3, isPlanet: true, isVehicle: false },
    { destination: 4, isPlanet: true, isVehicle: false }
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
      return item
    })

    const updatedData = data.map(item => {
      item.planets = updatedResult
      return item
    })
    console.log('updated dara', updatedData)
    setData(updatedData)
  }

  const getVehicles = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/vehicles')
    const result = await response.json()
    result.forEach(item => {
      item.isDisable = ''
    })
    const updatedData = data.map(item => {
      item.vehicles = result
      return item
    })
    setData(updatedData)
    console.log('result', result)
  }

  const handleSelectDest = (value, destination, indexOfSelectedPlanet) => {
    const planetName = value.name
    console.log('value', value, 'destination', destination, 'indexOfSelectedPlanet', indexOfSelectedPlanet)
    console.log(data[indexOfSelectedPlanet].isVehicle)
    const y = data.map((item, index) => {
      if (index === indexOfSelectedPlanet) {
        item.isVehicle = true
        item.vehicles.forEach(elem => {
          if (!elem.total_no || value.distance > elem.max_distance) {
            elem.isDisable = true
          } else {
            elem.isDisable = false
          }
        })
        return item
      }
      return item
    })
    setData(y)
    console.log('yyyy', y)
    // console.log('destname', planetName, 'destination', destination, 'indexofseelcted', indexOfSelectedPlanet)

    // Display the vehicles
    // data.map(item => {
    //   if (item.destination === destination) {
    //     item.disableVal = true
    //   }
    // })

    // Planets name selection
    // const deSelectedDest = data.filter(item => item.destination !== destination)

    // const deSelectedPlanets = deSelectedDest.map(item => {
    //   return item.planets.filter(item => item.name !== planetName)
    // })

    // const newData = deSelectedDest.map((item, index) => {
    //   item.planets = deSelectedPlanets[index]
    //   return item
    // })

    // const selectedData = data[indexOfSelectedPlanet]
    // newData.splice(indexOfSelectedPlanet, 0, selectedData)
    // setData(newData)
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
              {/* <select onChange={(e) =>handleSelectDest(e,item.destination,index)}>
              <option value="" disabled selected hidden>Select</option>
              {item.planets && item.planets.map(item=> {
                 return (
                    <option>{item.name}</option>
                )
              })}
               </select> */}
              <Select
                isDisabled={item.isPlanet}
                options={item.planets}
                onChange={value => handleSelectDest(value, item.destination, index)}
                className='findFalcone__form__item_selectBtn'
              />

              {item.isVehicle && item.vehicles.map(item => {
                return (
                  <p key={item.name} className={item.isDisable ? 'vehicle-disable' : ''}>
                    <input type='radio' value={item.name} name='vehicle' disabled={item.isDisable} />
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
