import styled from 'styled-components'
import { device } from './_styles/breakpoints'

// eslint-disable-next-line import/prefer-default-export
const handleBackColor = color => {
  switch (color) {
    case 'elcomercio':
      return '#000000'
    case 'gestion':
      return '#f4e0d2'
    default:
      return 'white'
  }
}

const handleTextColor = color => {
  switch (color) {
    case 'elcomercio':
      return '#f7c600'
    case 'gestion':
      return '#8f071f'
    case 'peru21':
    case 'peru21g21':
      return '#0c70bf'
    case 'ojo':
      return '#007d33'
    default:
      return 'black'
  }
}

const handleBorderColor = color => {
  switch (color) {
    case 'elcomercio':
    case 'gestion':
    case 'trome':
      return '#444444'
    case 'elcomerciomag':
      return '#000000'
    case 'peru21':
    case 'peru21g21':
      return '#0c70bf'
    case 'depor':
      return '#ffffff'
    case 'ojo':
      return '#007d33'
    default:
      return 'transparent'
  }
}

// eslint-disable-next-line import/prefer-default-export
export const ButtonSignwall = styled.button`
  font-size: 14px;
  background-color: ${props => handleBackColor(props.site)};
  color: ${props => handleTextColor(props.site)};
  cursor: pointer;
  border-radius: 50%;
  border: 0px;
  width: 34px;
  height: 34px;
  padding: 6px;
  outline: none;
  display: flex;
  &:hover {
    text-decoration: none;
  }
  @media ${device.desktop} {
    border-radius: 4px;
    width: auto;
    padding: 8px 10px;
    background: white;
    line-height: 16px;
    border: 1px solid ${props => handleBorderColor(props.site)};
    color: ${props => handleBorderColor(props.site)};
    /* color: ${props =>
      props.site === 'peru21' || props.site === 'peru21g21'
        ? '#0c70bf'
        : '#444444'}; */
  }
  & > i {
    text-transform: uppercase;
    font-style: normal;
    font-family: sans-serif;
    display: inline-block;
    font-weight: 400;
    line-height: 0.75;
    margin: 0 auto;
    width: auto;
    @media ${device.desktop} {
      display: none;
    }
  }
  & > span {
    display: none;
    font-family: initial;
    font-weight: 700;
    text-transform: capitalize;
    @media ${device.desktop} {
      display: block;
    }
  }
`
