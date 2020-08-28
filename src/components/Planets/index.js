import React from 'react'
import Select from 'react-select'
import '../../assets/css/style.css'


function Planets({data, onSelect, onSubmit}) {

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
    // setData(updatedData)
    onSelect(updatedData)
    console.log('updated data', updatedData)
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
        onSubmit(false)
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
    
    onSelect(updatedData)
  }

    return (
      <section className='planets'>
     { data.map ((item,index) => {
        return <article key={item.destination}>
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
      })
    }
       </section>
        )   
}

export default Planets