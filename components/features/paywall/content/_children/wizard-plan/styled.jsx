import styled from 'styled-components'
import { devices } from '../../../_dependencies/devices'

export const WizardPlan = styled.div`
  display: flex;
  justify-content: center;
`

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  max-width: 930px;
  height: 360px;
  @media (${devices.mobile}) {
    flex-direction: column;
    height: auto;
  }
`

export const WrapPlan = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
  @media (${devices.mobile}) {
    margin: 0;
  }
`

export const Plans = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`

export const PlanTitle = styled.div`
  font-size: 16px;
  margin: 12px 0;
  font-weight: 700;
`
