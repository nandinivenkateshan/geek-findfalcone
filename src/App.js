import React, { useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import FindFalcone from './components/FindFalcone'
import './assets/css/App.css'
import NetworkErr from './components/Status/NetworkErr'

function App () {
  const [networkErr, setNetworkErr] = useState('')
  const handleNetwork = val => {
    setNetworkErr(val)
  }
  return (
    <main className='app'>
      {
        networkErr
          ? <NetworkErr err={networkErr} />
          : (
            <>
              <Header />
              <FindFalcone onNetwork={val => handleNetwork(val)} />
              <Footer />
            </>)
      }

    </main>
  )
}

export default App
