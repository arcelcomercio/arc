import React from 'react'
import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 25%;
  height: 80px;
  position: relative;
  cursor: pointer;
  user-select: none;
  @media ${device.tablet} {
    width: 100px;
    height: 40px;
    margin-right: 15px;
    &:last-child {
      margin-right: 0px;
    }
  }
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Image = styled.div`
  width: 100%;
  height: 40px;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: 50% 0px;
  @media ${device.tablet} {
    background-position: 30px 0px;
  }
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 2px solid white;
  background: ${props => (props.checked ? '#0179af' : '#cccccc')};
  border-radius: 4px;
  transition: all 150ms;
  position: absolute;
  top: none;
  bottom: 10px;
  left: 40%;
  z-index: 10;
  @media ${device.tablet} {
    top: 8px;
    left: 0px;
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0.3rem black;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const Radiobox = ({ className, checked, disabled, ...props }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <CheckboxContainer checked={checked} className={className}>
    <Image {...props} />
    <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Radiobox
