import styled, { css } from 'styled-components'
import ProgressComponent from '../../../_children/progress'
import { Panel as PanelComponent } from '../../../_children/panel/styled'

export const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  font-family: var(--font-secondary);
  text-align: center;
`

export const Subtitle = styled.span`
  margin: 30px 0;
  padding: 0 50px;
  text-align: center;
  box-sizing: border-box;
  max-width: 480px;
  line-height: ${props => (props.large ? '24px' : '1.71')};
  font-size: ${props => (props.large ? '20px' : '14px')};
  color: #444;
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      padding: 0;
    }
  `}
`

export const Image = styled.img`
  width: 360px;
  object-fit: cover;
  height: 100%;
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      display: none;
    }
  `}
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px 100px;
  align-items: center;
  flex: 1;
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      padding: 30px;
    }
    ${theme.breakpoints.only('sm')} {
      min-height: 500px;
    }
  `}
`

export const CardSummary = styled.div`
  border-radius: 4px;
  background-color: ${props => props.theme.palette.background.default};
  padding: 30px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
`

export const Item = styled.div`
  font-size: 14px;
  margin-bottom: 17px;
`

export const Small = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #444444;
`

export const WrapButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
  position: relative;
`
export const WrapIcon = styled.div`
  width: 86px;
  height: 46px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.secondary.main};
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ContentBenefice = styled.div`
  display: flex;
  margin: 10px 0;
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
      align-items: center;
    }
  `}
`

export const WrapText = styled.div`
  color: #444444;
  margin-left: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => css`
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

export const Span = styled.span`
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      text-align: center;
    }
  `}
`

export const Picture = styled.picture`
  height: 100%;
  ${({ theme }) => css`
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
