/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components'

const Content = styled.div`
  ${({ theme }) => css`
    width: 1120px;
    margin-bottom: 30px;
    ${theme.breakpoints.up('xl')} {
      min-height: 900px;
    }
    ${theme.breakpoints.down('xs')} {
      width: 100%;
    }
  `}
`

export { Content }
