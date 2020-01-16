import styled from 'styled-components'
import { device } from '../../_dependencies/breakpoints'

export const Cont = styled.div`
  padding-bottom: 5%;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${device.desktop} {
    padding: 5%;
  }

  & .text-panel {
    font-size: 22px !important;
    line-height: 34px;
    margin: 0px;
  }

  & .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 25px;
  }

  & .item-text {
    font-weight: 400;
    font-size: 14px;
    margin: 8px 0px;
    color: black;
  }
  & .icon {
    width: 25%;
    display: flex;
    justify-content: center;
  }
  & .info {
    width: 75%;
  }
`

export const ItemTitle = styled.h3`
  color: ${props => props.mainColorTitle || 'blue'};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`

export const TitleContainer = styled.div`
  font-family: ${props => props.primaryFont};
  /* width: 83%; */
  width: 72%;
  text-align: center;
  & .title {
    font-size: 1.4rem;
    line-height: 30px;
    font-weight: bold;
  }
  /* &.organic {
    width: 67%;
  } */
`
