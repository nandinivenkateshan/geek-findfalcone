
export const showV= (state,action) => {
    const {value,destination,destinationIndex} = action
    let deSelectedPlanets
const newState =  state.map((item,index) => {
        const value = action.value
        if (index === destinationIndex) {
            item.showVehicles = true
            item.time = 0
            item.vehicles.forEach(elem => {
                (!elem.total_no || value.distance > elem.max_distance) ? elem.isDisable = true : elem.isDisable = false
              })

              deSelectedPlanets = item.planets.map(planet => {
                (planet.name === value.name) ? planet.isSelected = true : planet.isSelected = false
                return planet
              })
              item.planets = JSON.parse(JSON.stringify(deSelectedPlanets))
        }

        if (item.destination >= destination) {
            item.vehicles.forEach(item => {
              item.count = 0
            })
          }
         
          if (item.destination !== destination && item.destination > destinationIndex) {
            const val = deSelectedPlanets.filter(item => !item.isSelected)
            item.planets = JSON.parse(JSON.stringify(val))
          }
        return item
    })
    return newState
}

export const showR = (state,action) => {
    const {vehicle,planetIndex, destination} = action
    const vehicleName = vehicle
    const time = []
    const planetDistance = state[planetIndex].planets.filter(item => item.isSelected)[0].distance
    const updatedData = state.map(item => {
      // disable the select options 
      if (item.destination === destination + 1 && destination <= 4) {
        item.showPlanets = true
      }
      // Activate the submit button once destination4's vehicle selected
    //   if (destination === 4) {
    //     setSubmitBtn(false)
    //   }
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
    console.log('updated data',updatedData)
    state.map(item => {
      time.push(item.time)
      return time
    })
    // calculate the total time
    const totalTime = time.reduce((acc, cv) => acc + cv, 0)
    state[1].totalTime= totalTime

    return updatedData
}