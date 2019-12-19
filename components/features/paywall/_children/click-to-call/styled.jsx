import styled, { css } from 'styled-components'
import {
  sizing,
  spacing,
  flexbox,
  positions,
  typography,
} from '@material-ui/system'

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.a`
  ${({ theme }) => css`
    background-color: ${theme.palette.terciary.light};
    padding: 15px 15px;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 700;
    box-shadow: ${theme.shadows[1]};
    display: flex;
    border-radius: 5px;
    &:hover {
      box-shadow: ${theme.shadows[3]};
    }
    span {
      display: flex;
      line-height: 0px;
      align-items: center;
      color: #fff;
      span {
        margin-right: 10px;
        @media (max-width: 1024px) {
          display: none;
          margin-right: 0px;
        }
      }
    }
    ${theme.breakpoints.down('sm')} {
      position: fixed;
      bottom: 5%;
      left: 5%;
      z-index: 2;
    }
    ${sizing}
    ${spacing}
    ${flexbox}
    ${typography}
    ${positions}
  `}
`
