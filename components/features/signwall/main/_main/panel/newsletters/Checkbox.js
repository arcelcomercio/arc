import React from 'react'
import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 150px;
  height: 138px;
  position: relative;
  cursor: pointer;
  user-select: none;
  @media screen and (max-width: 320px) {
    width: 140px;
  }
  @media ${device.tablet} {
    width: 180px;
  }
  @media ${device.desktop} {
    width: 220px;
  }
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
  background: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.site === 'elcomercio'
      ? props.checked
        ? '#fecd26'
        : 'transparent'
      : props.checked
      ? '#d64445'
      : 'transparent'};
  color: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.site === 'elcomercio'
      ? props.checked
        ? 'black'
        : 'white'
      : props.checked
      ? 'white'
      : 'white'};
  /* color: ${props => (props.site === 'elcomercio' ? 'black' : 'white')}; */
  /* color: white; */
  width: 120px;
  padding: 10px 10px;
  text-align: center;
  position: absolute;
  font-weight: bold;
  z-index: 2;
  font-size: 16px;
  line-height: 20px;
  top: 0px;
  @media ${device.tablet} {
    margin: -100px auto 0 auto;
    width: 150px;
    position: relative;
    font-size: 18px;
  }
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

const Checkbox = ({ className, checked, disabled, name, site, ...props }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <CheckboxContainer checked={checked} className={className}>
    <Image {...props} />
    <Cover checked={checked} />
    <Name checked={checked} site={site}>
      {name}
    </Name>
    <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
