import React, { useContext } from 'react'
import Select from 'react-select'
import { DataContext } from '../Context'
import { showVehicles,showRadio } from '../Reducers/Actions'
import '../../assets/css/style.css'
import Vehicles from '../Vehicles'

function Planets() {
  const { state, dispatch } = useContext(DataContext)
  const handleSelect = (value, destination, destinationIndex) => {
    dispatch(showVehicles({value,destination,destinationIndex}))
  }
  const handleRadio = (e, planetIndex, destination) => {
    const vehicle = e.target.value
     dispatch(showRadio({vehicle ,planetIndex, destination}))
  }

    return (
      <section className='planets'>
        {console.log('state',state)}
     { state.map ((item,index) => {
        return <article>
         <h5 className='planets--heading'>Destination {item.destination} </h5>
         <Select 
             isDisabled={!item.showPlanets}
             options={item.planets}
             onChange={value => handleSelect(value, item.destination, index)}
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