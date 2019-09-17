import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 245px;
  height: 138px;
  position: relative;
  cursor: pointer;
  user-select: none;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
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

const Cover = styled.div`
  width: 100%;
  height: 138px;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
  display: ${props => (props.checked ? 'none' : 'block')};
`

const Image = styled.div`
  width: 100%;
  height: 138px;
  background-image: url(${props => props.image});
`

const Name = styled.div`
  background: ${props => (props.checked ? '#d64445' : 'transparent')};
  width: 150px;
  color: white;
  padding: 10px 0px;
  text-align: center;
  position: relative;
  font-weight: bold;
  z-index: 2;
  font-size: 18px;
  line-height: 20px;
  margin: -90px auto 0 auto;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 2px solid white;
  background: ${props => (props.checked ? '#0179af' : '#cccccc')};
  border-radius: 50%;
  transition: all 150ms;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0.3rem black;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const Checkbox = ({ className, checked, disabled, name, ...props }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <CheckboxContainer checked={checked} className={className}>
    <Image {...props} />
    <Cover checked={checked} />
    <Name checked={checked}>{name}</Name>
    <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
