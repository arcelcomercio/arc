import styled, { ThemeProvider } from 'styled-components'
import { devices } from '../_dependencies/devices'


const Content = styled.div`
  width: 1120px;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

export { Content, ThemeProvider }
