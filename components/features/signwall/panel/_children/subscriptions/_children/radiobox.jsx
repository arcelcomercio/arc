import React from 'react'
import styled from 'styled-components'
import { device } from '../../../../_dependencies/breakpoints'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: ${props => (props.full ? '100%' : '25%')};
  height: ${props => (props.full ? '40px' : '80px')};
  position: relative;
  cursor: pointer;
  user-select: none;
  > span {
    display: block;
    margin-left: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  @media ${device.tablet} {
    width: ${props => (props.full ? '100%' : '100px')};
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
  left: ${props => (props.full ? '8px' : '40%')};
  z-index: 2;
  @media ${device.tablet} {
    top: 8px;
    left: 0px;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const Message = styled.div`
  width: 100%;
  padding: 10px 25px;
  text-align: center;
  background: ${props =>
    props.success ? 'rgba(36, 145, 9, 0.1)' : 'rgba(219, 0, 0, 0.1)'};
  color: ${props => (props.success ? 'rgb(36, 145, 9)' : 'rgb(219, 0, 0)')};
  border-radius: 4px;
  font-size: 14px;
  display: block;
  line-height: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`

const Radiobox = ({ className, checked, disabled, ...props }) => (
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

const RadioboxSimple = ({ className, checked, disabled, name, ...props }) => (
  <CheckboxContainer full checked={checked} className={className}>
    <span>{name}</span>
    <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
    <StyledCheckbox full checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export { Radiobox, RadioboxSimple, Message }
