import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
text-align: center;
font-size:20px
`
const StyledLink = styled.a`
text-decoration:none;
color:#0d0f0e;
`

function Footer () {
  return (
    <StyledFooter>
        <p>
        Coding Problem - <StyledLink href="https://www.geektrust.in/" target='new'>www.geektrust.in/finding-falcone</StyledLink>
        </p>
    </StyledFooter>
  )
}

export default Footer
