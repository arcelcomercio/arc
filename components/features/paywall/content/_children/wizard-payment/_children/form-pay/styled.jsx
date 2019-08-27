import styled, { css } from 'styled-components'

import Checkbox from '../../../../../_children/checkbox'
import { devices } from '../../../../../_dependencies/devices'
import ErrorComponent from '../../../../../_children/error'

export const WrapForm = styled.div`
  @media (${devices.mobile}) {
    padding: 18px 30px;
  }
`

export const Error = styled(ErrorComponent)`
  max-width: 100%;
  box-sizing: border-box;
  padding: 40px;
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
  color: #249109;
  font-weight: 700;
  margin-bottom: 20px;
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
  justify-content: space-between;
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

export const Link = styled.a`
  color: #0179af;
`

export const RadioCondition = styled(Checkbox)``
RadioCondition.defaultProps = { radio: true }

export const AgreementCheckbox = styled(Checkbox)`
  @media (${devices.mobile}) {
    flex-direction: row;
    margin: 0;
  }
`
