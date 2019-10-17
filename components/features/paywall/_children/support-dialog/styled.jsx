/* eslint-disable no-use-before-define */
import styled, { css } from 'styled-components'

export const DialogContent = styled.div`
  ${({ theme, backgroundColor, titleColor }) => css`
    display: flex;
    justify-content: center;
    max-width: 820px;
    height: 530px;
    border-radius: 4px;
    ${ContentWrapper} {
      background-color: ${backgroundColor};
    }
    ${Title}, ${Subtitle} {
      color: ${titleColor || theme.palette.common.blackboard};
    }
    position: relative;
  `}
`

export const ContentWrapper = styled.div`
  border-radius: 4px;
  width: 310px;
  padding: 40px;
`

export const Title = styled.div`
  ${({ theme }) => css`
    font-family: Open Sans;
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.15;
    letter-spacing: normal;
    text-align: left;
  `}
`

export const Subtitle = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.14;
  letter-spacing: normal;
  text-align: left;
`

export const Paragraph = styled.div`
  ${({ theme }) => css`
    font-family: Open Sans;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: ${theme.palette.common.blackboard};
  `}
`

export const LongMail = styled.span`
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      font-size: 12px;
    }
  `}
`
