import styled, { css } from 'styled-components'
import TextMask from 'react-text-mask'
import { devices } from '../../_dependencies/devices'

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 35px;
  width: 100%;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

export const InputMask = styled(TextMask)`
  flex: 1;
  font-size: 14px;
  line-height: 22px;
  border: 0;
  width: 100%;
  max-width: 100%;
  ${({ transform }) =>
    css`
      text-transform: ${transform};
    `}
`
InputMask.defaultProps = { guide: false }

export const Input = styled.input`
  flex: 1;
  font-size: 14px;
  line-height: 22px;
  border: 0;
  width: 100%;
  max-width: 100%;
  ${({ transform }) =>
    css`
      text-transform: ${transform};
    `}
`

export const TextArea = styled.textarea`
  flex: 1;
  font-size: 14px;
  line-height: 22px;
  border: 0;
  width: 100%;
  max-width: 100%;
  ${props =>
    !props.resizable
      ? css`
          resize: none;
        `
      : css``}
  ${({ transform }) =>
    css`
      text-transform: ${transform};
    `}
`

export const Wrap = styled.div`
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
  ${({ multiline }) =>
    multiline &&
    css`
      bottom: 50%;
    `}
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
      left: 10px;
      bottom: inherit;
      top: inherit;
      font-size: 12px;
      background-color: #fff;
    `}
`

export const Error = styled.span`
  color: #db0000;
  margin-top: 5px;
  display: block;
  position: absolute;
  bottom: -20px;
`

export const Prefix = styled.div`
  display: flex;
  align-items: center;
`

export const WrapInput = styled.div`
  display: flex;
  flex: 1;
`

export { Label, FormGroup }

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
