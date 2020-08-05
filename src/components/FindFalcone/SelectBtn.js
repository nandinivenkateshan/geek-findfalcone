import React from 'react'
import './find-falcone.css'

function SelectBtn (props) {
  console.log('props', props)
  return (
    <form className='form'>

      <input list='planets' name='planets' className='form__input' placeholder='select' />
      <datalist id='planets'>
          <option value='nandni' />
      </datalist>
    </form>
  )
}
export default SelectBtn
