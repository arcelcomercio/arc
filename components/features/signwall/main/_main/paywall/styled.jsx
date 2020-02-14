import styled from 'styled-components'
import { device } from '../../../_dependencies/breakpoints'

export const ContMiddle = styled.div`
  display: block;
  height: 100%;
  min-height: 510px;
`

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const FirstMiddle = styled(Base)`
  width: 100%;
  height: 200px;
  display: block;
  position: relative;
  overflow: hidden;
  & img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    min-height: 200px;
    display: block;
    object-fit: cover;
    margin-top: -100px;
  }
  @media ${device.desktop} {
    width: 50%;
    height: 100%;
    display: inline-block;
    & img {
      margin-top: 0px;
      min-height: 510px;
    }
  }
`

export const SecondMiddle = styled(Base)`
  background-color: #fff;
  width: 100%;
  position: relative;
  @media ${device.desktop} {
    width: 50%;
  }
`

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 210px;
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
  position: absolute;
  top: 0%;
  width: 100%;
  padding: 20px;
  min-height: 150px !important;
  @media ${device.tablet} {
    min-height: 120px !important;
  }
  @media ${device.desktop} {
    top: 25%;
    background-color: none;
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
