import styled from 'styled-components'

import Panel from '../../../_children/panel'
import { devices } from '../../../_dependencies/devices'

export const WizardPayment = styled.div`
  display: flex;
  justify-content: space-between;
  @media (${devices.mobile}) {
    flex-direction: column-reverse;
    align-items: center;
  }

  @media ${devices.tablet} {
    flex-direction: column-reverse;
    align-items: center;
  }
`

export const PanelPayment = styled(Panel)`
  padding: 30px;
  box-sizing: border-box;
  @media (${devices.mobile}) {
    margin-top: 30px;
    padding: 18px 30px;
    box-sizing: border-box;
    max-width: 100vw;
  }
  @media ${devices.tablet} {
    margin-top: 30px;
    padding: 18px 30px;
    box-sizing: border-box;
  }
`
