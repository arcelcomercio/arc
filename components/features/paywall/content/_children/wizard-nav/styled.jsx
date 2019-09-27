import styled, { createGlobalStyle } from 'styled-components'
import { devices } from '../../../_dependencies/devices'

const WizardNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
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
  position: relative;
  min-height: 60px;
  &:after{
    display: inline-block;
    content: "";
    border-top: 1px solid #818181;
    width: 20px;
    transform: translateY(-1rem);
    margin-right: -120px;
  }
  &:last-child:after{
    color: red;
    border-top: 0px solid #818181;
    content: "";
  }
  @media (${devices.mobile}) {
    &:after{
      margin-right: -90px;
    }
  }
`

const StepName = styled.span`
  margin-top: 14px;
  position: absolute;
  top: 50%;
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
