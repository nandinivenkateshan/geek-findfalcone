import React, {useState,useEffect} from 'react'
import SelectBtn from './SelectBtn'
import './find-falcone.css'

function FindFalcone () {
  const [planets,setPlanets] = useState()
  const  getPlanets = async() =>  {
    const response = await window.fetch("https://findfalcone.herokuapp.com/planets")
    console.log('response',await response.json())
  }
  useEffect (() => {
    getPlanets()
  },[])

  return (
    <section className='findFalcone'>
         <h1 className="findFalcone__header"> Finding Falcone !</h1>
         <p className="findFalcone__sub-heading">Select planets you want to search in </p>
         <article className='findFalcone__selectBtns'>
         <SelectBtn />
         <SelectBtn />
         <SelectBtn />
         <SelectBtn />
         </article>
    </section>
  )
}

export default FindFalcone
