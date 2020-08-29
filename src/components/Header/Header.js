import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
background:#736d5f;
box-shadow: 2px 2px 2px #c4c3c0;
`

const Heading = styled.h1`
text-align:center;
color:#f5f2eb;
text-shadow:2px 2px 2px red;
`
const Aside = styled.aside`
display:flex;
justify-content: flex-end;
}
`
const StyledLink = styled.button`
font-size:14px;
padding:20px;
border: none;
background:none;
cursor:pointer;
color: #f5f2eb;
font-weight:bold;
text-shadow:2px 2px 2px red;
`
const GeekLink = styled.a`
font-size:15px;
padding:20px;
text-decoration: none;
color:#f5f2eb;
font-weight:bold;
text-shadow:2px 2px 2px red;
`

function Header () {
  const handleReset = () => {
    window.location.reload()
  }

  return (
    <StyledHeader>
      <Aside>
        <StyledLink to='' onClick={handleReset}>Reset</StyledLink>
        <GeekLink href='https://www.geektrust.in/' target='new'>Geektrust Home</GeekLink>
      </Aside>
      <Heading> Finding Falcone !</Heading>
    </StyledHeader>
  )
}

export default Header
