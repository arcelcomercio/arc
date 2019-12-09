/* eslint-disable no-use-before-define */
import styled, { css } from 'styled-components'
import { spacing } from '@material-ui/system'

export const Subscribed = styled.a`
  ${({ theme, width, event, fullWidth }) => css`
    display: flex;
    width: ${width};
    max-width: 930px;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 30px;
    align-items: flex-end;
    position: relative;
    ${spacing}
    ${fullWidth &&
      css`
        flex: 1;
        ${SubscribedText} {
          margin-left: 40px;
          letter-spacing: 0.72px;
          @media (max-width: 850px) {
            margin-left: 0px;
            letter-spacing: 0px;
          }
        }
      `}
    ${theme.breakpoints.only('sm')} {
      width: ${event ? '100%' : '50%'};
    }
    ${theme.breakpoints.down('xs')} {
      width: calc(100% - 40px);
      /* margin-top: 40px; */
      margin-left: 0px;
    }
  `}
`

export const SubscribedText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.16);
  line-height: 1.44;
`

export const SubscribedContent = styled.div`
  ${({ theme, backgroundColor, color, minPadding }) => css`
    padding: 20px;
    display: flex;
    flex: 1;
    align-items: center;
    max-height: 50px;
    justify-content: space-between;
    font-size: 16px;
    color: ${color};
    background-color: ${backgroundColor};
    ${theme.breakpoints.down('sm')} {
      padding: ${minPadding ? '20px' : '40px 20px'};
    }
    ${theme.breakpoints.down('xs')} {
      padding: 18px 20px;
      max-height: 100px;
      box-sizing: content-box;
      border-radius: 4px;
      font-size: 16px;
    }
  `}
`
export const Small = styled.span`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: 300;
    line-height: 1.86;
    ${theme.breakpoints.down('xs')} {
      font-size: 12px;
    }
  `}
`

export const Shadow = styled.div`
  ${({ theme }) => css`
    width: 100%;
    left: 0;
    position: absolute;
    height: 50px;
    z-index: -2;
    background-color: #000;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    ${theme.breakpoints.down('xs')} {
      display: none;
    }
  `}
`
