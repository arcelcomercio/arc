import styled from 'styled-components'
import { devices } from '../../../_dependencies/devices'

export const WizardPayment = styled.div`
  display: flex;
  justify-content: space-between;
  @media (${devices.mobile}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`
