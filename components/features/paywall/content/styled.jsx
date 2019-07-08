import styled from 'styled-components'
import { devices } from '../_dependencies/devices'

const Content = styled.div`
  width: 1120px;
  @media (${devices.mobile}) {
    width: calc(100% - 40px);
  }
`
export { Content }
