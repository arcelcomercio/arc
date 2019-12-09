import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

// eslint-disable-next-line import/prefer-default-export
export const ContMiddle = styled.div`
  display: block;
  height: 100%;
  min-height: 520px;
`

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const FirstMiddle = styled(Base)`
  width: 50%;
  height: 100%;
  display: none;
  & img {
    display: none;
  }
  @media ${device.desktop} {
    display: inline-block;
    & img {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
`

export const SecondMiddle = styled(Base)`
  width: 100%;
  position: relative;
  /* top: 50%;
  transform: translateY(-50%); */
  @media ${device.desktop} {
    width: 50%;
  }
`
export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 10px;
  outline: none;
  right: 10px;
  cursor: pointer;
  z-index: 1;
  padding: 10px;
`
