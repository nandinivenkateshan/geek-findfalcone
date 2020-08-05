import React, { useState, useEffect } from 'react'
import './find-falcone.css'
import Select from 'react-select'

function FindFalcone () {
  const [planets, setPlanets] = useState()

  const [data, setData] = useState([
    { destination: 1 },
    { destination: 2 },
    { destination: 3 },
    { destination: 4 }
  ])

  const getPlanets = async () => {
    const response = await window.fetch('https://findfalcone.herokuapp.com/planets')
    const result = await response.json()
    const y = result.map(item => {
      item.value = item.name
      item.label = item.name
      return item
    })
    console.log('y', y)
    const updatedVal = data.map(item => {
      item.planets = y
      return item
    })

    console.log('daat', updatedVal)

    setData(updatedVal)
  }
  useEffect(() => {
    getPlanets()
  }, [])

  const handleSelectDest = (value, destination, indexOfSelected) => {
    const destName = value.name
    console.log('destname', destName)
    const deSelectedDest = data.filter(item => item.destination !== destination)

    const deSelectedNames = deSelectedDest.map(item => {
      return item.planets.filter(item => item.name !== destName)
    })

    const newData = deSelectedDest.map((item, index) => {
      item.planets = deSelectedNames[index]
      return item
    })

    const selectedData = data[indexOfSelected]
    newData.splice(indexOfSelected, 0, selectedData)
    setData(newData)
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
                options={item.planets}
                onChange={value => handleSelectDest(value, item.destination, index)}
              />

              {/* <select
                name='planets' className='form__input'
                placeholder='Select'
                onChange={(e) => handleSelectDest(e, item.destination, index)}
              >
                <option value='none' selected disabled hidden>
                    Select
                </option>
                {item.planets ? item.planets.map(item => {
                  return <option key={item.name} placeholder='Select'>{item.name}</option>
                }) : null}
              </select> */}

              {/* <input
                list='planets' name='planets' className='form__input'
                placeholder='Select'
                onChange={(e) => handleSelectDest(e, item.destination, index)}
              />
              <datalist id='planets'>
                {item.planets ? item.planets.map(item => {
                  console.log('name', item.name)
                  return <option value={item.name} key={item.name} />
                }) : null}
              </datalist> */}
            </article>
          )
        })}
        <h4>Time Taken:0</h4>
      </form>

    </section>
  )
}

export default FindFalcone
