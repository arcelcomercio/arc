import React from 'react'
import styled from 'styled-components'

export const CheckContainer = styled.label`
  font-size: 12px;
  text-align: left;
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  user-select: none;
  color: #8b8b8b;
  line-height: 20px;
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 5px;
    height: 5px;
    &:checked ~ .checkmark {
      background-color: #2196f3;
      border: 1px solid #2196f3;
    }
    &:checked ~ .checkmark:after {
      display: block;
    }
  }
  & .checkmark {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 1px solid #bbbbbb;
    border-radius: 4px;
    &:after {
      left: 6px;
      top: 3px;
      width: 5px;
      height: 10px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      content: '';
      position: absolute;
      display: none;
    }
    &.error {
      border: 1px solid #ff2b2b;
      margin-top: 0px;
    }
  }
  & span.error {
    color: #ff2b2b;
    line-height: 18px;
    display: block;
    margin-top: 5px;
  }
`

export const CheckBox = ({
  checked,
  value,
  name,
  onChange,
  valid,
  error,
  children,
}) => {
  return (
    <CheckContainer>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        required={valid}
        error={error}
      />

      {children}

      <span className={error && 'error'}>{error}</span>

      <span className={error ? 'error checkmark' : 'checkmark'} />
    </CheckContainer>
  )
}
