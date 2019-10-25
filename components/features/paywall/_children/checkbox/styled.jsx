import styled, { css } from 'styled-components'

export const Label = styled.label`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    ${theme.breakpoints.down('xs')} {
      flex-direction: column-reverse;
    }
  `}
`

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 8px;
  border: 2px solid gray;
  border-radius: 2px;
  transition: all 300ms;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  ${({ checked }) =>
    checked &&
    css`
      background-color: #0179af;
      border: solid 2px ${checked ? '#0179af' : 'gray'};
    `}
  ${({ hasError }) =>
    hasError &&
    css`
      background-color: #0179af;
      background-color: rgba(218, 0, 0, 0.2);
      border: solid 2px #db0000;
      svg {
        stroke: rgba(218, 0, 0, 0.2);
      }
    `}}
`

export const Svg = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
