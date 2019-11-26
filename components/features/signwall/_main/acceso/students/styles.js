import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

const IMG = 'https://perufront.com/images/bg-students.png'

// eslint-disable-next-line import/prefer-default-export
export const ContMiddle = styled.div`
  display: block;
  height: 100%;
`

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const FirstMiddle = styled(Base)`
  background-image: url(${IMG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50%;
  height: 100%;
  display: none;
  background-size: 100%;
  @media ${device.desktop} {
    display: inline-block;
  }
`

export const SecondMiddle = styled(Base)`
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
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
