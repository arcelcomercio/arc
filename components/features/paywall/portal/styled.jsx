import styled, { css } from 'styled-components'
import { spacing, sizing, flexbox, typography } from '@material-ui/system'

import Markdown from '../_children/markdown'

export const Portal = styled.div`
  ${({ theme, backgroundColor }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${theme.breakpoints.up('md')} {
      background: url(${theme.images.backgroundx1});
    }

    ${theme.breakpoints.down('sm')} {
      background: ${backgroundColor
        ? theme.palette.lighten(theme.palette.secondary.main, 0.8)
        : theme.palette.lighten(theme.palette.primary.main, 0.9)};
    }
  `}
`

export const PortalContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    max-width: 1120px;
    margin-top: 40px;
    align-self: center;
    width: 100%;
    ${theme.breakpoints.down('sm')} {
      flex-direction: column;
      min-width: auto;
      align-items: center;
    }
  `}
`

export const Footer = styled.div`
  ${({ theme }) => css`
    padding: 12px;
    opacity: 0.8;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    ${theme.breakpoints.down('sm')} {
      margin-top: 0px;
      padding: 20px 10px;
    }
  `}
`

export const FooterContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    max-width: 1120px;
    justify-content: center;
    width: 100%;
    position: relative;
    height: 100%;
    align-items: center;
    ${theme.breakpoints.down('xs')} {
      display: block;
      & a:first-child {
        margin-bottom: 20px;
      }
    }
  `}
`

export const LinkCorporate = styled.a`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 20px;
    padding-left: 40px;
    background: ${props =>
      props.primary
        ? theme.palette.primary.main
        : theme.palette.common.blackboard};
    cursor: pointer;
    color: ${({ primary }) =>
      primary
        ? theme.palette.primary.contrastText
        : theme.palette.common.white};
    min-width: 330px;
    height: 50px;
    border-radius: 4px;
    ${spacing}
    ${sizing}
    ${flexbox}
  `}
`

export const SubscribedText = styled(Markdown)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 50px;
  font-size: ${props => (props.primary ? '20' : '14')}px;
  font-weight: 700;
  width: 100%;
  box-sizing: border-box;
  & span:first-child {
    font-weight: 300;
  }
  ${typography}
`
