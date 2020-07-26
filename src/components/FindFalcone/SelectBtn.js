import React from 'react'
import './find-falcone.css'

function SelectBtn () {
    return (
        <form className='form' >
        <input list="planets" name="planets" className='form__input' placeholder="select"/>
        <datalist id="planets">
        <option value="nandni"/>
        </datalist>  
      </form>
    )
}
export default SelectBtn