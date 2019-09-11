import styled from 'styled-components'
import { devices } from '../../../_dependencies/devices'
import ErrorComponent from '../../../_children/error'

export const WizardPlan = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  max-width: 930px;
  width: 100%;
  height: 360px;
  @media (${devices.mobile}) {
    flex-direction: column;
    height: auto;
    align-items: center;
  }
  @media ${devices.tablet} {
    flex-direction: column;
    height: auto;
    align-items: center;
    max-width: 639px;
  }
`

export const WrapPlan = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
  margin-top: 30px;
  @media (${devices.mobile}) {
    margin: 50px 0 0 0;
    max-width: calc(100% - 40px);
    width: 100%;
  }
  @media ${devices.tablet} {
    margin: 50px 0 0 0;
    max-width: calc(100% - 40px);
    width: 100%;
  }
`

export const Plans = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  @media (${devices.mobile}) {
    display: contents;
  }
`

export const PlanTitle = styled.div`
  font-size: 16px;
  margin: 12px 0;
  font-weight: 700;
`

export const Error = styled(ErrorComponent)`
  max-width: 930px;
  margin-bottom: 30px;
  box-sizing: border-box;
  text-transform: uppercase;
  font-size: 18px;
  line-height: 26px;
  @media (${devices.mobile}) {
    font-size: 14px;
    padding: 12px 30px;
    width: 90%;
  }
`

export const WelcomeSuscriptor = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
  background: #dbe9d8;
  color: #22810b;
  padding: 12px 0px;
  border-radius: 4px;
  max-width: 930px;
  width: 100%;
  line-height: 26px;
  box-sizing: border-box;
  text-transform: uppercase;
  @media (${devices.mobile}) {
    font-size: 14px;
    padding: 12px 30px;
    width: 90%;
  }
`

export const ContentBanner = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  max-width: 930px;
  width: 100%;
  @media (${devices.mobile}) {
    display: contents;
  }
  @media ${devices.tablet} {
    width: 95%;
  }
`