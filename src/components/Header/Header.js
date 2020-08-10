import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
text-align:center;
`
const Aside = styled.aside`
display:flex;
justify-content: flex-end;

`
const StyledLink = styled.button`
font-size:19px;
padding:20px;
border: none;
background:none;
cursor:pointer;
color: #3b403c;
`
const GeekLink = styled.a`
font-size:20px;
padding:20px;
text-decoration: none;
color:#3b403c;
`

function Header () {
  const handleReset = () => {
    window.location.reload()
  }

  return (
    <header>
      <Aside>
        <StyledLink to='' onClick={handleReset}>Reset</StyledLink>
        <GeekLink href='https://www.geektrust.in/' target='new'>Geektrust Home</GeekLink>
      </Aside>
      <Heading> Finding Falcone !</Heading>
    </header>
  )
}

export default Header
