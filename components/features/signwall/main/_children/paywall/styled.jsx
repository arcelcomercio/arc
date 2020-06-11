import styled from 'styled-components'
import { device } from '../../../_dependencies/breakpoints'

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const ContMiddle = styled.div`
  display: block;
  height: 100%;
  min-height: 510px;
  @media ${device.tablet} {
    display: table;
    width: 100%;
  }
`

export const FirstMiddle = styled(Base)`
  width: 100%;
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
  background: ${props => (props.arcSite === 'gestion' ? '#8f071f' : '#232323')};
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
  background-color: #fff;
  @media ${device.desktop} {
    width: 100%;
    display: table-cell;
  }
`

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 180px;
  outline: none;
  right: 10px;
  cursor: pointer;
  z-index: 1;
  padding: 10px;
  @media ${device.desktop} {
    top: 10px;
  }
`

export const ContPaywall = styled.div`
  position: relative;
  width: 100%;
  padding: 12px 20px;
  min-height: 170px !important;
  @media ${device.desktop} {
    margin-top: 25%;
    padding: 40px;
  }
  p {
    width: 100%;
    color: #ffffff;
    text-align: center;
  }
  img {
    margin-top: 25px;
    min-height: 25px;
    width: auto;
    @media ${device.desktop} {
      margin-top: 40px;
    }
  }
  p {
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 10px;
    @media ${device.desktop} {
      line-height: 32px;
      font-size: 18px;
    }
  }
`

export const Title = styled.h3`
  color: #ffffff;
  text-align: center;
  font-size: 30px;
  font-family: ${props => props.f};
  text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.49);
  font-weight: 600;
  @media ${device.desktop} {
    font-size: 58px;
  }
`
