import styled, { css } from 'styled-components'

const Wrap = styled.div`
  ${({ theme }) => css`
    flex-wrap: wrap;
    width: 100%;
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
    min-width: 300px;
    max-width: 300px;
    ${theme.breakpoints.down('md')} {
      min-width: 280px;
      max-width: 280px;
    }
    ${theme.breakpoints.down('sm')} {
      min-width: 300px;
      max-width: 300px;
    }
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
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NH08L3N0eWxlPjwvZGVmcz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDQuOTV2MTBIMHoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xLjQxIDQuNjdsMS4wNy0xLjQ5IDEuMDYgMS40OUgxLjQxek0zLjU0IDUuMzNMMi40OCA2LjgyIDEuNDEgNS4zM2gyLjEzeiIvPjwvc3ZnPg==) no-repeat 100% 50%;
  border-radius: 0;
  padding: 5px 10px;
  appearance: none;
`

export { Wrap, Form, Title, WrapTitle }
