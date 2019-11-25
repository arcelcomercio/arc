import React from 'react'
import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'
import { Facebook, Google, Mail } from '../../common/iconos'
import { Button } from './styles'

export const ButtonStyleSocial = styled(Button)`
  font-size: 16px;
  position: relative;
  & svg {
    position: absolute;
    left: ${props => (props.brand === 'facebook' ? '10px' : '0px')} !important;
    top: ${props => (props.brand === 'facebook' ? '10px' : '0px')} !important;
  }
  height: 48px !important;
  display: inline-block;
  vertical-align: top;
  padding: 0px 10px 0px 45px !important;
  background: ${props =>
    props.brand === 'facebook' ? '#4267b2' : '#4285f4'} !important;
  border: 1px solid
    ${props => (props.brand === 'facebook' ? '#4267b2' : '#4285f4')} !important;
  margin-right: ${props =>
    props.size === 'middle' && props.brand === 'facebook'
      ? '10px'
      : '0px'} !important;
  margin-left: ${props =>
    props.size === 'middle' && props.brand === 'google'
      ? '10px'
      : '0px'} !important;
  width: calc(
    ${props => (props.size === 'full' ? '100% - 0px' : '50% - 10px')}
  ) !important;
  text-transform: capitalize;
  margin-bottom: ${props => (props.size === 'full' ? '15px' : '0px')};
  font-size: 18px !important;
  font-weight: normal;
  @media ${device.tablet} {
    padding: 0px ${props => (props.size === 'full' ? '30px' : '10px')} 0px 45px;
  }
`

export const ButtonStyleEmail = styled(Button)`
  background: #f2f2f2;
  color: #818181;
  font-weight: normal;
  border-bottom: 2px solid #d4d4d4;
  margin-bottom: 40px;
  & svg {
    margin-right: 10px;
  }
`

export const ButtonSocial = props => {
  const { brand, size } = props
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ButtonStyleSocial type="button" brand={brand} size={size}>
      {brand === 'facebook' ? <Facebook /> : <Google />}
      {brand}
    </ButtonStyleSocial>
  )
}

export const ButtonEmail = props => {
  const { size, onClick } = props
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ButtonStyleEmail type="button" size={size} onClick={onClick}>
      <Mail />
      Ingresa con tu usuario
    </ButtonStyleEmail>
  )
}
