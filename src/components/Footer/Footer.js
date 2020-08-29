import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
margin-top:20px;
text-align: center;
font-size:15px;
background:#fcf7ed;
box-shadow: 1px 2px 4px grey;
`
const StyledLink = styled.a`
text-decoration:none;
color:#82030f;
opacity:0.9;

`
const StyledPara = styled.p`
margin:30px;
font-weight: bold;
color:#82030f;
`

function Footer () {
  return (
    <StyledFooter>
      <StyledPara>
        <span>Coding Problem -</span> <StyledLink href='https://www.geektrust.in/' target='new'>www.geektrust.in/finding-falcone</StyledLink>
      </StyledPara>
    </StyledFooter>
  )
}

export default Footer
