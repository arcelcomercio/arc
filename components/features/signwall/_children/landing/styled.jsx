import styled from 'styled-components'
import { device } from '../../_dependencies/breakpoints'

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const ContMiddle = styled.div`
  display: block;
  height: 100%;
  min-height: 520px;
  @media ${device.tablet} {
    display: table;
    width: 100%;
  }
`

export const FirstMiddle = styled(Base)`
  width: 100%;
  display: none;
  position: relative;
  overflow: hidden;
  height: 100%;
  @media ${device.desktop} {
    width: 50%;
    display: table-cell;
    background: url(${props => props.pathSourcePNG});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`

export const SecondMiddle = styled(Base)`
  width: 100%;
  position: relative;
  background-color: #ffffff;
  @media ${device.desktop} {
    width: 50%;
    display: table-cell;
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
