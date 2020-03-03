import styled, { css } from 'styled-components'
import { spacing, sizing, flexbox, typography } from '@material-ui/system'

import Markdown from '../_children/markdown'

export const Portal = styled.div`
  ${({ theme, backgroundColor }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
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

export const Review = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding-top: 25px;
    padding-bottom: 40px;
    flex-direction: column;
    width: 100%;
    background: url(${theme.images.backgroundReview});
    background-position-x: center;
    background-position-y: bottom;
    background-size: cover;
    z-index: -1;
    ${theme.breakpoints.down('xs')} {
      padding-bottom: 0px;
    }
  `}
`

export const ReviewComment = styled.div`
  display: flex;
  align-self: center;
  max-width: 825px;
  margin: 0px 40px;
  flex-direction: column;
  font-family: Open Sans;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.84;
  letter-spacing: 2.25px;
  color: #ffffff;
`

export const Comment = styled.div`
  ${({ theme }) => css`
    font-family: Open Sans;
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.84;
    letter-spacing: 2.25px;
    text-align: right;
    color: #ffffff;
    margin-bottom: 10px;
    ${theme.breakpoints.down('xs')} {
      font-size: 19px;
      line-height: 1.64;
    }
  `}
`

export const ReviewCaption = styled.div`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 1.28px;
    text-align: right;
    color: #ffffff;
    ${theme.breakpoints.down('xs')} {
      font-size: 12px;
      line-height: 1.64;
    }
  `}
`

export const ReviewVideo = styled.video`
  ${({ theme }) => css`
    align-self: center;
    width: 600px;
    margin-top: 40px;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
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
    padding-left: 20px;
    background: ${props =>
      props.primary
        ? props.backgroundColor || theme.palette.primary.main
        : theme.palette.common.blackboard};
    cursor: pointer;
    color: ${({ primary }) =>
      primary
        ? theme.palette.primary.contrastText
        : theme.palette.common.white};
    min-width: 300px;
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
  width: 100%;
  box-sizing: border-box;
  & span:first-child {
    font-weight: normal;
  }
  & strong:first-child {
    font-weight: 700;
  }
  ${typography}
`
