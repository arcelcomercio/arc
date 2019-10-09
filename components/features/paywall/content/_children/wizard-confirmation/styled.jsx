import styled, { css } from 'styled-components'
import _Markdown from '../../../_children/markdown'

import ProgressComponent from '../../../_children/progress'
import { Panel as PanelComponent } from '../../../_children/panel/styled'

export const Title = styled(_Markdown)`
  ${({ theme }) => css`
    font-size: 30px;
    font-weight: 700;
    font-family: ${theme.palette.secondary.main};
    text-align: center;
  `}
`

export const Subtitle = styled(_Markdown)`
  ${({ theme, large }) => css`
    display: inline;
    margin: 30px 0;
    padding: 0 50px;
    text-align: center;
    box-sizing: border-box;
    max-width: 480px;
    line-height: ${large ? '24px' : '1.71'};
    font-size: ${large ? '20px' : '14px'};
    color: ${theme.palette.common.blackboard};
    ${theme.breakpoints.down('xs')} {
      padding: 0;
    }
  `}
`

export const Image = styled.img`
  ${({ theme }) => css`
    width: 360px;
    object-fit: cover;
    height: 100%;

    ${theme.breakpoints.down('xs')} {
      display: none;
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 40px 100px;
    align-items: center;
    flex: 1;
    ${theme.breakpoints.down('xs')} {
      padding: 30px;
    }
    ${theme.breakpoints.only('sm')} {
      min-height: 500px;
    }
  `}
`

export const CardSummary = styled.div`
  ${({ theme }) => css`
    border-radius: 4px;
    background-color: ${theme.palette.background.default};
    padding: 30px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 20px;
  `}
`

export const Item = styled.div`
  font-size: 14px;
  margin-bottom: 17px;
`

export const Small = styled.div`
  ${({ theme }) => css`
    font-size: 14px;
    line-height: 26px;
    color: ${theme.palette.common.blackboard};
  `}
`

export const WrapButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
  position: relative;
`
export const WrapIcon = styled.div`
  ${({ theme }) => css`
    width: 86px;
    height: 46px;
    border-radius: 4px;
    background-color: ${theme.palette.secondary.main};
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`
export const ContentBenefice = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin: 10px 0;
    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
      align-items: center;
    }
  `}
`

export const WrapText = styled.div`
  ${({ theme }) => css`
    color: ${theme.palette.common.blackboard};
    margin-left: 12px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    ${theme.breakpoints.down('xs')} {
      margin: 25px 20px;
    }
  `}
`

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Notice = styled(_Markdown)`
  ${({ theme }) => css`
    display: inline
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    ${theme.breakpoints.down('xs')} {
      text-align: center;
    }
  `}
`

export const Picture = styled.picture`
  ${({ theme }) => css`
    height: 100%;
    ${theme.breakpoints.only('sm')} {
      display: none;
    }
  `}
`

export const DetailTitle = styled.div`
  font-size: 16px;
  line-height: 2.14;
  margin-bottom: 15px;
`

export const Names = styled.span`
  text-transform: capitalize;
`
export const Progress = styled(ProgressComponent)`
  position: absolute;
  bottom: -7px;
`
export const Panel = styled(PanelComponent)`
  ${({ theme }) => css`
    ${theme.breakpoints.only('sm')} {
      flex-direction: column-reverse;
      align-items: center;
    }
  `}
`
