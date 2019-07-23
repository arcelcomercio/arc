import styled, { css } from 'styled-components'
import { devices } from '../../../../../_dependencies/devices'

export const WrapForm = styled.div`
  @media (${devices.mobile}) {
    padding: 18px 30px;
  }
`

export const Cards = styled.div`
  display: flex;
  @media (${devices.mobile}) {
    width: 100%;
    justify-content: space-around;
  }
`

export const Security = styled.div`
  display: flex;
  align-items: center;
  color: #d6a730;
  font-weight: 700;
  @media (${devices.mobile}) {
    justify-content: center;
  }
`

export const TextSecurity = styled.span`
  margin-left: 10px;
`

export const WrapCards = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
  @media (${devices.mobile}) {
    flex-direction: column;
  }
`

export const TextCard = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-right: 20px;
  @media (${devices.mobile}) {
    margin: 0 0 30px;
  }
`

export const WrapInputs = styled.div`
  display: flex;
  justify-content: space-between;
  @media (${devices.mobile}) {
    flex-direction: column;
  }
`

export const WrapInput = styled.div`
  ${({ 'min-width': minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
  ${({ 'max-width': maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
`

export const Span = styled.div`
  padding: 20px 0;
  display: block;
`

export const WrapSubmit = styled.div`
  display: flex;
  justify-content: center;
`
