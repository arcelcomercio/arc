import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

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
  background-image: url('https://perufront.com/images/bg-students.png');
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
export const Close = styled.button`
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  outline: none;
  right: 0;
`
