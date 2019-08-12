import styled, { createGlobalStyle } from 'styled-components'
import { devices } from '../../../_dependencies/devices'


const WizardNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  position: relative;
  align-items: center;
`

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  max-width: 470px;
  @media (${devices.mobile}) {
    max-width: 100vw;
  }
`

const Right = styled.div`
  position: absolute;
  right: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StepName = styled.span`
  margin-top: 14px;
`

const StepCircle = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  color: #bbb;
`

const StepNumber = styled.span`
  color: #bbbbbb;
  font-size: 16px;
  font-weight: 700;
`

const GlobalStyle = createGlobalStyle`
  .nav-step-active{
    font-weight: 700;
  }
`
export {
  WizardNav,
  Wrap,
  Right,
  Content,
  StepName,
  StepCircle,
  StepNumber,
  GlobalStyle,
}
