import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import queryString from 'query-string'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../../assets/css/App.css'

const FailedStatus = styled.p`
text-align: center;
font-size: 25px;
color:#bf1c19;
font-weight: bold;
`
const SuccesStatus = styled(FailedStatus)`
color:#0d4a12;
`
const SubHeading = styled.h3`
text-align:center;
color:#3f453f;
`

const Button = styled.button`
padding: 10px;
background: white;
color: #191a19;
display:block;
cursor:pointer;
margin: 80px auto;
font-size: 16px;
box-shadow: 3px 4px #b4b8b4;
`
const Span = styled.span`
color: #191a19;
`

function SuccessResponse (props) {
  const values = queryString.parse(props.location.search)
  const [isStartAgain, setStartAgain] = useState(false)
  const handleStart = () => {
    setStartAgain(true)
  }
  return (
    <main className='app'>
      <Header />
      <section>
        {values.status === 'success'
          ? (
            <>
              <SuccesStatus>Success! Congratulations on Finding Falcone.King Shan is almighty pleased.</SuccesStatus>
              <SubHeading>Time Taken:  <Span>{values.time}</Span></SubHeading>
              <SubHeading>Planet Found:  <Span>{values.name}</Span></SubHeading>
            </>)
          : <FailedStatus>Failed to find Falcone </FailedStatus>}

        <Button onClick={handleStart}>Start Again</Button>
      </section>
      {isStartAgain ? <Redirect to='/' /> : null}
      <Footer />
    </main>
  )
}

export default SuccessResponse
