import styled, { css } from 'styled-components'
import _Markdown from '../../../../../_children/markdown'

import Checkbox from '../../../../../_children/checkbox'
import ErrorComponent from '../../../../../_children/error'

export const WrapForm = styled.div`
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      padding: 18px 30px;
    }
  `}
`

export const Error = styled(ErrorComponent)`
  max-width: 100%;
  box-sizing: border-box;
  padding: 40px;
`

export const Cards = styled.div`
  ${({ theme }) => css`
    display: flex;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
      justify-content: space-around;
    }
  `}
`

export const Security = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    color: ${theme.palette.success.main};
    font-weight: 700;
    margin-bottom: 20px;
    ${theme.breakpoints.down('xs')} {
      justify-content: center;
    }
  `}
`

export const TextSecurity = styled.span`
  margin-left: 10px;
  font-size: 14px;
`

export const WrapCards = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin: 40px 0;
    justify-content: space-between;
    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
    }
  `}
`

export const TextCard = styled.div`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: 700;
    margin-right: 20px;
    ${theme.breakpoints.down('xs')} {
      margin: 0 0 30px;
    }
  `}
`

export const WrapInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
    }
  `}
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
  font-size: 14px;
  line-height: 24px;
`

export const WrapSubmit = styled.div`
  display: flex;
  justify-content: center;
`

export const Agreement = styled(_Markdown)`
  ${({ theme }) => css`
    & a {
      color: ${theme.palette.secondary.main};
    }
  `}
`
Agreement.defaultProps = {
  linkTarget: '_blank',
}

export const RadioCondition = styled(Checkbox)``
RadioCondition.defaultProps = { radio: true }

export const AgreementCheckbox = styled(Checkbox)`
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      flex-direction: row;
      margin: 0;
    }
  `}
`
