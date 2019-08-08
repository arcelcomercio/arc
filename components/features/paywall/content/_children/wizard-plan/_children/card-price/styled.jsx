import styled, { css } from 'styled-components'
import { devices } from '../../../../../_dependencies/devices'
import Btn from '../../../../../_children/button'

const CardPrice = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 1;
  justify-content: space-between;
  width: 100%;
  color: #444444;
  font-weight: 700;
`

const Frecuency = styled.div`
  font-size: 20px;
  justify-content: center;
  display: flex;
  margin: 24px 0 8px 0;
`

export const Amount = styled.div`
  font-size: 60px;
  justify-content: center;
  display: flex;
  align-items: flex-end;
  line-height: 50px;
  padding: 24px 0;
  @media (${devices.mobile}) {
    font-size: 40px;
  }
`

const Currency = styled.span`
  font-size: 26px;
  line-height: 26px;
`

const Description = styled.div`
  font-size: 12px;
  justify-content: center;
  display: flex;
  font-weight: 300;
  padding: 10px 60px 20px;
  text-align: center;
  @media (${devices.mobile}) {
    padding: 8px 15px;
    min-height: 68px;
  }
`

const Content = styled.div`
  pointer-events: none;
`

export const Footer = styled.div``

export const Button = styled(Btn)`
  color: #444;
  background-color: #e8e8e8;
  font-size: 16px;
  height: 70px;
  border-radius: 0 0 5px 5px;
  font-weight: 300;
  transition: color 300ms, background-color 300ms, font-weight 300ms;
  ${({ active }) =>
    active &&
    css`
      background-color: #0179af;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    `};
`

export { CardPrice, Frecuency, Currency, Description, Content }

// .card-price--active{
// color: #444444;
// transition: color 300ms;
// }

// .card-price--active .card-price__buy{
//     background-color: #0179af;
//     color: #FFF;
//     font-weight: 700;
//     cursor: pointer;

// }
