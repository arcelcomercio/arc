import styled from 'styled-components'
import { device } from '../../../_dependencies/breakpoints'

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const ContMiddle = styled.div`
  display: block;
  height: 100%;
  min-height: 290px;
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
  background: ${props => (props.arcSite === 'gestion' ? '#8f071f' : '#232323')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media ${device.tablet} {
    width: 50%;
    display: table-cell;
    background: url(${props => props.pathSourcePNG});
  }
`

export const SecondMiddle = styled(Base)`
  width: 100%;
  position: relative;
  /* display: block; */
  background: ${props => (props.arcSite === 'gestion' ? '#fff6f0' : '#f4f4f4')};
  @media ${device.tablet} {
    width: 50%;
    display: table-cell;
  }
`

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 150px;
  outline: none;
  right: 5px;
  cursor: pointer;
  z-index: 1;
  padding: 10px;
  @media ${device.tablet} {
    top: 10px;
    right: 10px;
  }
`

export const ContPaywall = styled.div`
  position: relative;
  width: 100%;
  padding: 12px 20px;
  min-height: 140px !important;
  @media ${device.tablet} {
    min-height: 120px !important;
    position: absolute;
    padding: 25px 10px;
  }
  p {
    width: 100%;
    color: #ffffff;
    text-align: center;
  }
  .logo {
    margin-top: 15px;
    max-width: 212px;
    @media ${device.tablet} {
      margin-top: 25px;
    }
  }
  p {
    font-size: 14px;
    line-height: 26px;
    margin-bottom: 5px;
    @media ${device.desktop} {
      line-height: 24px;
      font-size: 14px;
    }
  }
  .list-benefits {
    line-height: 22px;
    margin-top: 20px;
    display: none;
    @media ${device.tablet} {
      display: block;
    }
    li {
      color: white;
      font-size: 12px;
      padding-left: 30px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAANlJREFUKFOFkWFxAlEMhL9VADioA8ABdUAdgILiAFAADooDJNxVQcHBOYAqCLNMHvOAYcifm5fbTTa7oqqImAHfwCjbv5ImNUZ+REQfaIABsAUOCeokdYmZSGoLwYAzMJXk713l5h/gU/lYWcYb8FzSzgRP30mylFeTr2D/NCG8KnWbbFmHSsYNfEfwQQnypg1gmTdwRNit5knSq8kRsQBm5eglMC5HR8RHsbOy/Q9Y17aegK9HpzKjvTOSNKqDa4HeQ3BO3FL+AQd3vhJKpX4Dhtk7ekCx1L0LPSp8cMmgIaUAAAAASUVORK5CYII=');
      background-repeat: no-repeat;
      background-position: 8px 5px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
`

export const Title = styled.h3`
  color: #ffffff;
  text-align: center;
  font-size: 24px;
  font-family: ${props => props.f};
  text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.49);
  font-weight: 600;
  @media ${device.desktop} {
    font-size: 26px;
  }
`
