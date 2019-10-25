import styled, { css } from 'styled-components'

const Content = styled.div`
  ${({ theme }) => css`
    width: 1120px;
    margin-bottom: 30px;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
    }
  `}
`

export { Content }
