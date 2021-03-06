/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import TextMask from 'react-text-mask'
import styled from 'styled-components'

export const Cont = styled.div`
  background-color: inherit;
  display: inline-block;
  width: ${(props) => (props.width ? props.width : '100')}%;
  label,
  input,
  select {
    transition: all 0.2s;
    touch-action: manipulation;
    pointer-events: auto;
  }
  label {
    pointer-events: none;
    color: gray;
    background-color: white;
    width: fit-content;
    &.error {
      color: #ff2b2b;
    }
  }
  input,
  select {
    font-family: inherit;
    appearance: none;

    &:placeholder-shown + label {
      cursor: text;
      transform-origin: 0 0;
      transform: translate(1rem, 1.8rem) scale(0.95);
      margin: 0px;
      font-size: 15px;
    }

    &::placeholder {
      opacity: 0;
      font-size: 14px;
      transition: inherit;
    }

    &:focus::placeholder {
      opacity: 0.3;
    }

    &:not(:placeholder-shown) + label,
    &:-webkit-autofill + label,
    &:focus + label {
      transform-origin: 0 0;
      transform: translate(0.5rem, 0.58rem) scale(0.75);
      cursor: pointer;
      background-color: inherit;
      padding: 0px 10px;
      margin: 0px;
    }
  }

  @supports (-moz-appearance: none) {
    input,
    select {
      margin-top: 2px;
    }
    input:required:invalid {
      box-shadow: none;
    }
    input::placeholder {
      font-size: 14px;
    }
    input:placeholder-shown + label {
      cursor: text;
      transform-origin: 0 0;
      transform: translate(1rem, 1.8rem) scale(1.1);
    }
    label {
      font-size: 12px;
      margin-top: 0px;
    }
  }

  @supports (-ms-accelerator: true) or (-ms-ime-align: auto) {
    input,
    select {
      margin-top: 10px;
    }
    label {
      font-size: 12px;
      background: transparent;
      margin-bottom: -10px;
      margin-top: 10px;
      margin-left: 10px;
      position: absolute;
    }
  }
`

export const Field = styled.div`
  background-color: inherit;
  display: flex;
  flex-flow: column-reverse;
  position: relative;
  label {
    position: relative;
    z-index: 2;
  }
`

export const InputMask = styled(TextMask)`
  display: block;
`

InputMask.defaultProps = { guide: false }

export const ContMask = (props) => {
  const { error, children, nolabelerror } = props
  const { placeholder, name } = children.props
  return (
    <Cont>
      <Field>
        {children}
        <label htmlFor={name} className={error && 'error'}>
          {nolabelerror ? placeholder : error || placeholder}
        </label>
      </Field>
    </Cont>
  )
}

export const Input = (props) => {
  const { onChange, name, placeholder, clase, error, nolabelerror } = props
  return (
    <Cont>
      <Field>
        <input
          id={name}
          onBlur={onChange}
          className={`${clase || ''} ${error && 'error'}`}
          {...props}
        />
        <label htmlFor={name} className={error && 'error'}>
          {nolabelerror ? placeholder : error || placeholder}
        </label>
      </Field>
    </Cont>
  )
}

export const Select = (props) => {
  const {
    clase,
    width,
    onChange,
    name,
    placeholder,
    error,
    children,
    nolabel,
  } = props
  return (
    <Cont width={width}>
      <Field>
        <select
          id={name}
          onFocus={onChange}
          className={`${clase} ${error && 'error'}`}
          {...props}>
          {children}
        </select>
        {!nolabel && (
          <label htmlFor={name} className={error && 'error'}>
            {error || placeholder}
          </label>
        )}
      </Field>
    </Cont>
  )
}
