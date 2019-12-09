import React from 'react'
import styled from 'styled-components'

const StyledSvg = styled.svg`
  font-size: ${({ theme }) => theme.typography.pxToRem(35)};
`

function CustomIcon() {
  return (
    <StyledSvg width="24" height="24" viewBox="0 0 24 24">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </StyledSvg>
  )
}

export default CustomIcon
