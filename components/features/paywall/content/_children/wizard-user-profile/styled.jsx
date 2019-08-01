import styled from 'styled-components'
import Panel from '../../../_children/panel'
import { devices } from '../../../_dependencies/devices'

const WizardUserProfile = styled.div`
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

const PanelUserProfile = styled(Panel)`
  @media (${devices.mobile}) {
    margin-top: 30px;
  }
  @media ${devices.tablet} {
    margin-top: 30px;
    padding: 30px;
  }
`
export { WizardUserProfile, PanelUserProfile }
