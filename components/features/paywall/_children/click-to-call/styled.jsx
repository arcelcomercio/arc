import styled, { css } from 'styled-components'
import ButtonComponent from '../button'

// eslint-disable-next-line import/prefer-default-export
export const Button = styled(ButtonComponent)`
  ${({ theme }) => css`
    background-color: ${theme.palette.terciary.light};
    padding: 15px 15px;
    box-sizing: border-box;
    text-decoration: none;
    box-shadow: theme.shadows[3];
    display: flex;
    width: auto !important;
    &:hover {
      background-color: ${theme.palette.terciary.light};
      box-shadow: theme.shadows[3];
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
    @media (max-width: 1024px) {
      position: fixed;
      bottom: 5%;
      left: 5%;
      z-index: 2;
    }
  `}
`
