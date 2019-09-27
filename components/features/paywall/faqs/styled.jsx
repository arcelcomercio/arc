import styled, { css } from 'styled-components'
import _ExpansionPanel from '@material-ui/core/ExpansionPanel'
import _ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import _ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import _Markdown from 'react-markdown'

export const Container = styled.div`
  background-color: #ffffff;
`

export const Separator = styled.div`
  background-color: #e8e8e8;
  height: 4px;
  margin-top: 40px;
  margin-bottom: calc(40px - 18px);
  border-top: 1px solid #bbbbbb;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 160px;
  text-align: center;
`

export const Title = styled.div`
  ${({ theme }) => css`
    font-family: Open Sans;
    font-size: 30px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.73;
    letter-spacing: normal;
    text-align: left;
    color: #444444;
    ${theme.breakpoints.down('xs')} {
      font-size: 20px;
      line-height: 1.1;
    }
  `}
`

export const ExpansionPanel = styled(_ExpansionPanel)`
  ${({ theme }) => css`
    &.MuiExpansionPanel-root {
      background-color: #ffebdd;
    }
    &.Mui-expanded {
      background-color: #ffffff;
    }
    padding: 0px 10%;
    ${theme.breakpoints.down('xs')} {
      padding: 0px 0px;
    }
  `}
`

export const ExpansionPanelSummary = styled(_ExpansionPanelSummary)`
  &.MuiExpansionPanelSummary-root {
  }
`

export const ExpansionPanelDetails = styled(_ExpansionPanelDetails)`
  &.MuiExpansionPanelDetails-root {
    display: flex;
    flex-direction: column;
  }
`

export const FaqMarkdown = styled(_Markdown)`
  ${({ theme }) => css`
    text-align: justify;
    ${props =>
      props.question
        ? css`
            font-size: 20px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 2.2;
            letter-spacing: normal;
            ${theme.breakpoints.down('xs')} {
              font-size: 18px;
            }
          `
        : css`
            font-size: 14px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 2;
            letter-spacing: normal;
          `};
    thead {
      border: none;
      text-align: center;
    }
    td {
      border: 1px solid #bbbbbb;
      padding: 12px;
      text-align: left;
    }
    table {
      border-collapse: collapse;
    }
  `}
`
