import styled, { css } from 'styled-components'

const Wrap = styled.div`
  ${({ theme }) => css`
    flex-wrap: wrap;
    width: 530px;
    display: flex;
    justify-content: space-between;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
    }
  `}
`

const Title = styled.span`
  line-height: 16px;
  font-size: 16px;
  font-weight: 700;
`

const WrapTitle = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 30px;
  justify-content: flex-start;
  width: 100%;
`

const Form = Component => {
  return styled(Component)`
    ${({ theme }) => css`
      display: flex;
      flex-direction: column;
      align-items: center;
      ${theme.breakpoints.down('xs')} {
        padding: 30px;
      }
    `}
  `
}

export const WrapField = styled.div`
  ${({ theme }) => css`
    min-width: 250px;
    max-width: 250px;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
      max-width: 100%;
    }
  `}
`

export const Select = styled.select`
  background-color: #fff;
  border: 0;
  min-width: 40px;
  user-select: none;
`

export { Wrap, Form, Title, WrapTitle }
