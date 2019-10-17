import styled, { css } from 'styled-components'
import { spacing } from '@material-ui/system'
import Btn from '../../../../../_children/button'

const CardPrice = styled.div`
  ${({ theme, elevation }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1 1;
    justify-content: space-between;
    width: 100%;
    box-shadow: ${theme.shadows[elevation]}
    color: ${theme.palette.common.blackboard};
    font-weight: ${theme.typography.fontWeightHeavy};
    position: relative;
  `}
`

const Frecuency = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: center;
  ${spacing}
`

export const Amount = styled.div`
  ${({ theme }) => css`
    font-size: 60px;
    color: ${theme.palette.common.blackboard};
    justify-content: center;
    display: flex;
    align-items: flex-end;
    line-height: 50px;
    padding: 10px 0;
    font-weight: 700;
    ${theme.breakpoints.down('xs')} {
      font-size: 40px;
    }
  `}
`

const Currency = styled.span`
  font-size: 26px;
  line-height: 26px;
`

const Period = styled.span`
  font-size: 16px;
  line-height: 20px;
`

const Description = styled.div`
  ${({ theme }) => css`
    font-size: 16px;
    justify-content: center;
    display: flex;
    font-weight: ${props => (props.bold ? 'bold' : '300')};
    padding: 5px 60px;
    text-align: center;
    color: rgb(68, 68, 68);
    &:last-child {
      padding: 0px 40px 20px 40px;
    }
    ${theme.breakpoints.down('xs')} {
      padding: 8px 15px;
    }
  `}
`

const Content = styled.div`
  pointer-events: none;
`

export const Footer = styled.div``

export const Button = styled(Btn)`
  ${({ theme, active }) => css`
    background-color: ${theme.palette.fade(
      theme.palette.action.disabled,
      theme.palette.tonalOffset / 2
    )};
    color: ${theme.palette.action.disabled};
    font-size: 16px;
    height: 70px;
    border-radius: 0 0 5px 5px;
    font-weight: 300;
    transition: color 300ms, background-color 300ms, font-weight 300ms;
    ${active &&
      css`
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.contrastText};
        font-weight: 700;
        cursor: pointer;
      `}
  `}
`

const Header = styled.div`
  ${({ theme }) => {
    const { invert } = theme.palette
    return css`
      background: ${invert(theme.palette.secondary.main)};
      color: ${theme.palette.secondary.contrastText};
      padding: 10px;
      border-radius: 5px;
      width: 80%;
      margin-left: 10%;
      text-align: center;
      box-sizing: border-box;
      margin-top: -15px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
      position: absolute;
      font-weight: bold;
    `
  }}
`

export { CardPrice, Frecuency, Currency, Period, Description, Content, Header }
