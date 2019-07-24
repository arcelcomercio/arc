import styled, { css } from 'styled-components'
import { devices } from '../../_dependencies/devices'

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 29px;
  width: 100%;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

export const Input = styled.input`
  flex: 1;
  font-size: 14px;
  line-height: 22px;
  border: 0;
  width: 100%;
  ${({ transform }) =>
    css`
      text-transform: ${transform};
    `}
`

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding: 13px;
  border-radius: 4px;
  border: 1px solid #aaaaaa;
  flex: 1;
  width: 100%;
  /* width: ${({ width }) => width || '250px'}; */
  box-sizing: border-box;
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #db0000;
    `}
  @media (${devices.mobile}) {
    width: 100%;
  }
`

const Label = styled.label`
  position: absolute;
  transform: translate3d(0, 50%, 0);
  bottom: 50%;
  left: 1rem;
  color: #bbbbbb;
  pointer-events: none;
  padding: 5px;
  will-change: transform, font-size;
  transition: transform 250ms, font-size 250ms, left 250ms;
  ${({ hasError }) =>
    hasError &&
    css`
      color: #db0000;
    `}
  ${({ prefix }) =>
    prefix &&
    css`
      left: 5rem;
    `}
  ${({ focus }) =>
    focus &&
    css`
      transform: translate3d(0, -50%, 0);
      left: 1rem;
      bottom: inherit;
      top: inherit;
      font-size: 12px;
      background-color: #fff;
    `}
`

export { Label, Wrap, FormGroup }

// .__label.__focus{
// transform: translate3d(0, -50%, 0);
// left: 1rem;
// bottom: inherit;
// top: inherit;
// font-size: 12px;
// background-color: #fff;

// }

// .__prefix{
// left: 5rem;
// }
