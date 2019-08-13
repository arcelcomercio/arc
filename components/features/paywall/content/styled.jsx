import styled, { ThemeProvider } from 'styled-components'
import { devices } from '../_dependencies/devices'
import ButtonComponent from '../_children/button'

const Content = styled.div`
  width: 1120px;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

export const Button = styled(ButtonComponent)`
  background-color: #ffebdd;
  padding: 0 15px;
  text-decoration: none;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  &:hover {
    background-color: #f6e1d2;
  }
  span {
    display: flex;
    align-items: center;
    color: #555;
    svg {
      margin-left: 10px;
    }
  }
  @media (${devices.mobile}) {
    position: fixed;
    top: 15%;
    right: 5%;
    z-index: 2;
    max-width: 200px;
  }
`

export { Content, ThemeProvider }
