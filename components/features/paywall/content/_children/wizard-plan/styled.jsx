import styled, { css } from 'styled-components'
import _Markdown from '../../../_children/markdown'
import ErrorComponent from '../../../_children/error'

export const WizardPlan = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Wrap = styled.div`
  ${({ theme, col }) => css`
    display: flex;
    justify-content: ${col ? 'center' : 'space-between'};
    flex: 1;
    max-width: 930px;
    width: 100%;
    height: ${col ? '420' : '360'}px;
    ${theme.breakpoints.down('sm')} {
      flex-direction: column;
      height: auto;
      align-items: center;
    }
    ${theme.breakpoints.only('sm')} {
      max-width: 639px;
    }
  `}
`

export const WrapPlan = styled.div`
  ${({ theme, col }) => css`
    display: flex;
    flex-direction: column;
    flex: ${col ? 'none': '1'};
    margin-left: 20px;
    margin-top: 30px;
    position: relative;
    ${theme.breakpoints.down('sm')} {
      margin: 50px 0 0 0;
      max-width: calc(100% - 40px);
      width: 100%;
    }
  `}
`

export const Plans = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex: 1;
    justify-content: space-between;
    ${theme.breakpoints.down('xs')} {
      display: contents;
    }
  `}
`

export const Error = styled(ErrorComponent)`
  ${({ theme }) => css`
    max-width: 930px;
    margin-bottom: 30px;
    box-sizing: border-box;
    text-transform: uppercase;
    font-size: 18px;
    line-height: 26px;
    ${theme.breakpoints.down('xs')} {
      font-size: 14px;
      padding: 12px 30px;
      width: 90%;
    }
  `}
`

export const Markdown = styled(_Markdown)`
  ${({ theme }) => css`
    font-size: 18px;
    text-align: center;
    margin-bottom: 50px;
    background: ${theme.palette.success.light};
    color: ${theme.palette.success.main};
    padding: 12px 0px;
    border-radius: 4px;
    max-width: 930px;
    width: 100%;
    line-height: 26px;
    box-sizing: border-box;
    text-transform: uppercase;
    ${theme.breakpoints.down('xs')} {
      font-size: 14px;
      padding: 12px 30px;
      width: 90%;
    }
  `}
`

export const ContentBanner = styled.div`
  ${({ theme }) => css`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    max-width: 930px;
    width: 100%;
    ${theme.breakpoints.down('xs')} {
      display: contents;
    }
    ${theme.breakpoints.only('sm')} {
      width: 95%;
    }
  `}
`

export const Cintillo = styled.div`
  ${({ theme }) => css`
    background: #e05e2f;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin-top: -28px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
    position: relative;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 30px;
    ${theme.breakpoints.only('xs')} {
      font-size: 16px;
      padding: 10px 40px;
    }
  `}
`
