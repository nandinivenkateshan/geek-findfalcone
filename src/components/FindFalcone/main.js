import React, { useState, useEffect } from 'react'
import '../../assets/css/find-falcone.css'
import Select from 'react-select'
import { fetchGet,fetchPost, fetchToken } from '../../helpers'
import { BASE_URL } from '../../config'
 

function FindFalcone ({onNetwork}) {
  const [data, setData] = useState([
    { destination: 1, showPlanets: true, showVehicles: false, time: 0 },
    { destination: 2, showPlanets: false, showVehicles: false, time: 0 },
    { destination: 3, showPlanets: false, showVehicles: false, time: 0 },
    { destination: 4, showPlanets: false, showVehicles: false, time: 0 }
  ])
  const [totalTime, setTime] = useState(0)
  const [submitBtn, setSubmitBtn] = useState(true)
  const [token, setToken] = useState()

  useEffect(() => {
    getToken()
    getPlanets()
    getVehicles()
  }, [])

  const updateData = (key,val) => {
    const updatedData = data.map(item => {
      item[key] = JSON.parse(JSON.stringify(val))
      return item
    })
    setData(updatedData)
  }

 
  const getToken = async () => {
    const result= await fetchToken(`${BASE_URL}/token`)
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


  const getPlanets = async () => {
    const result = await fetchGet(`${BASE_URL}/planets`)
    if (result.netErr) {
      onNetwork('Network Error:  Failed to Fetch Planets') 
      return
    }
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
    if (result.netErr) {
      onNetwork('Network Error:  Failed to Fetch Vehicles')
      return
    }
    result.forEach(item => {
      item.isDisable = ''
      item.count = 0
      item.checked = false
    })
    updateData('vehicles',result)
  }

 
  const handleSelect = (value, destination, planetIndex) => {
    const planetName = value.name
    let deSelectedPlanets
    const updatedData = data.map((item, index) => { 
      
      if (index === planetIndex) {
        item.showVehicles = true
        item.time = 0
        // disable the vehicles based on the speed and distance
        item.vehicles.forEach(elem => {
          (!elem.total_no || value.distance > elem.max_distance) ? elem.isDisable = true : elem.isDisable = false
        })
        //Don't show the selected planet in the next destination
        deSelectedPlanets = item.planets.map(planet => {
          (planet.name === planetName) ? planet.isSelected = true : planet.isSelected = false
          return planet
        })
        item.planets = JSON.parse(JSON.stringify(deSelectedPlanets))
      }
      if (item.destination >= destination) {
        item.vehicles.forEach(item => {
          item.count = 0
        })
      }
      if (item.destination !== destination && item.destination > planetIndex) {
        const val = deSelectedPlanets.filter(item => !item.isSelected)
        item.planets = JSON.parse(JSON.stringify(val))
      }
      return item
    })
    setData(updatedData)
  }

  const handleRadio = (e, planetIndex, destination) => {
    const vehicleName = e.target.value
    const time = []
    const planetDistance = data[planetIndex].planets.filter(item => item.isSelected)[0].distance
    const updatedData = data.map(item => {
      // disable the select options 
      if (item.destination === destination + 1 && destination <= 4) {
        item.showPlanets = true
      }
      // Activate the submit button once destination4's vehicle selected
      if (destination === 4) {
        setSubmitBtn(false)
      }
      if (destination === item.destination) {
        item.vehicles.forEach(ele => {
          (ele.name === vehicleName) ? ele.checked = true : ele.checked = false
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
    data.map(item => {
      time.push(item.time)
      return time
    })
    // calculate the total time
    const totalTime = time.reduce((acc, cv) => acc + cv, 0)
    setTime(totalTime)
    setData(updatedData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    const result = await fetchPost(`${BASE_URL}/find`, value)
    if (result.netErr) {
      onNetwork('Network Error in finding falcone')
      return
    }
    if (result.status) {
      path = `/find?status=${result.status}&&name=${result.planet_name}&&time=${totalTime}`
    }
    window.open(path)
  }

  return (
    <main className='falcone falcone-main'>
    <p className='falcone-main__heading'>Select planets you want to search in </p>
    <form onSubmit={handleSubmit} className='form falcone__form'>
      <section className='form__content'>
        {data.map((item, index) => {
          return (
            <article key={item.destination}>
              <p className='form__content__heading'>Destination  {item.destination}</p>
              <Select
                isDisabled={!item.showPlanets}
                options={item.planets}
                 onChange={value => handleSelect(value, item.destination, index)}
                className='form__content__select'
              /> 
              <div>
                {item.showVehicles && item.vehicles
                .map(elem => { 
                  return (
                    <p key={elem.name + item.destination} 
                    className={elem.isDisable ? 'form__content__p--disable' : 'form__content__p--active'}>
                      <input
                        id={elem.name + item.destination}
                        type='radio' value={elem.name}
                        name={`vehicle${item.destination}`}
                        onChange={e => handleRadio(e, index, item.destination)}
                      />
                      <label htmlFor={elem.name + item.destination} className='form__content__p__label'>{elem.name}</label>
                      <label>({elem.total_no})</label>
                    </p>)
                })}
              </div>
            </article>
          )
        })}
        <h3 className='form__content__time'>Time Taken: {totalTime}</h3>
      </section>
      <button className='falcone__form__submit' disabled={submitBtn}>Find Falcone !</button>
    </form>
  </main>
  )
}

export default FindFalcone
