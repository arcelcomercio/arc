import styled, { css } from 'styled-components'
import { devices } from '../_dependencies/devices'

const Button = styled.button`
  width: 100%;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
  justify-content: center;
  background-color: #0179af;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  line-height: 46px;
  border: 0;
  font-weight: 700;
  outline: 0;
  cursor: pointer;
  &:hover {
    background-color: #005e89;
    color: #fff;
  }
  &:disabled {
    background-color: #e8e8e8;
    color: #bbbbbb;
    cursor: initial;
  }
  @media (${devices.mobile}) {
    width: 100%;
  }
`

export default Button
