/* eslint-disable no-use-before-define */
import styled, { css } from 'styled-components'

const WizardNav = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  position: relative;
  align-items: center;
`

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  max-width: 470px;
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      max-width: 100vw;
    }
  `}
`

const Right = styled.div`
  position: absolute;
  right: 0;
`

const Content = styled.div`
  ${({ active, theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-height: 60px;
    ${theme.breakpoints.down('xs')} {
      &:after {
        margin-right: -90px;
      }
    }
    ${active
      ? css`
          font-weight: ${theme.typography.fontWeightHeavy};
          ${StepCircle} {
            background-color: ${theme.palette.primary.main};
          }
          ${StepNumber} {
            color: ${theme.palette.primary.contrastText};
          }
        `
      : css`
          ${theme.breakpoints.down('xs')} {
            ${StepName} {
              display: none;
            }
          }
        `}
  `}
  &:after {
    display: inline-block;
    content: '';
    border-top: 1px solid ${props => props.theme.palette.divider};
    width: 20px;
    transform: translateY(-1rem);
    margin-right: -120px;
  }
  &:last-child:after {
    border-top: 0px solid ${props => props.theme.palette.divider};
    content: '';
  }
`

const StepName = styled.span`
  margin-top: 14px;
  position: absolute;
  top: 50%;
`

const StepCircle = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.action.disabledBackground};
  color: ${props => props.theme.palette.action.disabled};
`

const StepNumber = styled.span`
  font-size: 16px;
  font-weight: ${props => props.theme.typography.fontWeightHeavy};
`

export { WizardNav, Wrap, Right, Content, StepName, StepCircle, StepNumber }
