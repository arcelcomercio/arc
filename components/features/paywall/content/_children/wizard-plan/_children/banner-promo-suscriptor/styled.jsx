import styled from 'styled-components'
import { devices } from '../../../../../_dependencies/devices'

export const Subscribed = styled.div`
  display: flex;
  width: 100%;
  max-width: 930px;
  color: #fff;
  cursor: pointer;
  margin-top: 60px;
  align-items: flex-end;
  position: relative;
  @media (${devices.mobile}) {
    width: calc(100% - 40px);
    margin-top: 40px;
  }
`

export const SubscribedText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.16);
  line-height: 1.44;
`

export const SubscribedContent = styled.div`
  padding: 25px 50px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  max-height: 50px;
  background: #d64445;
  font-size: 18px;
  @media (${devices.mobile}) {
    padding: 18px 20px;
    max-height: 100px;
    box-sizing: content-box;
    border-radius: 4px;
    font-size: 16px;
  }
`
export const Small = styled.span`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.86;
  @media (${devices.mobile}) {
    font-size: 12px;
  }
`
export const Picture = styled.picture`
  display: flex;
`

export const Img = styled.img`
  @media (${devices.mobile}) {
    display: none;
  }
`

export const Shadow = styled.div`
  width: 100%;
  position: absolute;
  height: 50px;
  z-index: -2;
  background-color: #000;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`
