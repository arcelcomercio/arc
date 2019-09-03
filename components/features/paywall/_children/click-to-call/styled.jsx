import styled from 'styled-components'
import ButtonComponent from '../button'
import { devices } from '../../_dependencies/devices'

// eslint-disable-next-line import/prefer-default-export
export const Button = styled(ButtonComponent)`
  background-color: #555;
  padding: 15px 15px;
  box-sizing: border-box;
  text-decoration: none;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  width: auto !important;
  &:hover {
    background-color: #555;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  span {
    display: flex;
    line-height: 0px;
    align-items: center;
    color: #fff;
    span {
      margin-right: 10px;
      @media (${devices.mobile}) {
        display: none;
        margin-right: 0px;
      }
    }
  }
  @media (${devices.mobile}) {
    position: fixed;
    bottom: 5%;
    left: 5%;
    z-index: 2;
  }
`
