import React from 'react'
import styled, { css } from 'styled-components'

const Select = styled.select`
  padding: 16px !important;
  width: 100%;
  border-radius: 4px !important;
  border: 1px solid #aaaaaa;
  box-sizing: border-box;
  height: 51px;
  background-color: #fff;
  font-family: Open Sans;
  font-size: 12px;
  user-select: none;
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NH08L3N0eWxlPjwvZGVmcz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDQuOTV2MTBIMHoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xLjQxIDQuNjdsMS4wNy0xLjQ5IDEuMDYgMS40OUgxLjQxek0zLjU0IDUuMzNMMi40OCA2LjgyIDEuNDEgNS4zM2gyLjEzeiIvPjwvc3ZnPg==) no-repeat 100% 50%;
  border-radius: 0;
  padding: 5px 10px;
  appearance: none;
  ${props =>
    props.value
      ? css`
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          color: black;
        `
      : css`
          font-family: Open Sans;
          font-size: 12px;
          color: #cccccc;
        `};
  ${({ error }) =>
    error &&
    css`
      border-color: #db0000;
      color: #db0000;
    `}
  & option[value=''] {
    display: none;
  }
  & option {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 22px;
    color: black;
  }
`

const Error = styled.span`
  color: #db0000;
  margin-top: 5px;
  display: block;
  position: absolute;
`

const Wrapper = styled.div`
  margin-bottom: 35px;
`

export default ({ children, field, form: { touched, errors }, ...props }) => {
  const error = touched[field.name] && errors[field.name]
  return (
    <Wrapper>
      <Select error={error} {...field} {...props}>
        {children}
      </Select>
      <Error>{error}</Error>
    </Wrapper>
  )
}
