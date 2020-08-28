import React,{ useState, useEffect } from 'react'
import Destination from '../Planets'
import Time from '../Time'
import FindButton from '../FindButton'
import '../../assets/css/style.css'
import { fetchGet, fetchToken } from '../../helpers'
import { BASE_URL } from '../../config'

function FindFalcone ({onNetwork}) {

    const [data, setData] = useState([
        { destination: 1, showPlanets: true, showVehicles: false, time: 0 },
        { destination: 2, showPlanets: false, showVehicles: false, time: 0 },
        { destination: 3, showPlanets: false, showVehicles: false, time: 0 },
        { destination: 4, showPlanets: false, showVehicles: false, time: 0 }
      ])
      const [submitBtn, setSubmitBtn] = useState(true)
      const [token, setToken] = useState('')
    
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

      const handleSelect = val => setData(val)
      const handleSubmit = val => {
          console.log('val in submit',val)
          setSubmitBtn(val)
      }


    return (
        <section className='falcone falcone-main' >
            <h1 className='falcone-main__heading'>Select Planets you want to search in</h1>
           
                <Destination data={data}  onSelect={val => handleSelect(val)} onSubmit={val => handleSubmit(val)} />
                <Time data={data} />
                <FindButton submitVal={submitBtn} data={data} token={token} handleNetwork={val => onNetwork(val)}/>
            
        </section>
    )
}

export default FindFalcone
