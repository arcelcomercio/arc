import styled, { css, createGlobalStyle } from 'styled-components'
import { devices } from '../../../_dependencies/devices'

const CardPrice = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  justify-content: space-between;
  width: 100%;
  color: #bbbbbb;
  font-weight: 700;
  ${({ active }) =>
    active &&
    css`
      color: #444444;
      transition: color 300ms;
    `}
`

const Frecuency = styled.div`
  font-size: 20px;
  justify-content: center;
  display: flex;
  margin: 24px 0 8px 0;
`

const Amount = styled.div`
  font-size: 60px;
  justify-content: center;
  display: flex;
  align-items: flex-end;
  line-height: 50px;
  padding: 24px 0;
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
  padding: 8px 60px;
  text-align: center;
  @media (${devices.mobile}) {
    padding: 8px 15px;
  }
`

const Content = styled.div`
  pointer-events: none;
`

const Footer = styled.div``

const Button = styled.button`
  border: 0;
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: center;
  font-size: 16px;
  padding: 24px 0;
  background-color: #e8e8e8;
  color: #bbbbbb;
  font-weight: 300;
  outline: none;
  transition: color 300ms, background-color 300ms;
  ${({ active }) =>
    active &&
    css`
      background-color: #0179af;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    `}
  :hover {
    background-color: #005e89;
    color: #fff;
  }
`

export {
  CardPrice,
  Frecuency,
  Amount,
  Currency,
  Description,
  Content,
  Footer,
  Button,
}

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
