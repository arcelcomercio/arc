/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import styled from 'styled-components'
import TextMask from 'react-text-mask'

export const Cont = styled.div`
  display: inline-block;
  width: ${props => (props.width ? props.width : '100')}%;
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
      transform: translate(1rem, 2rem) scale(0.95);
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
    &:focus + label {
      transform-origin: 0 0;
      transform: translate(0.5rem, 0.5rem) scale(0.75);
      cursor: pointer;
      background: white;
      padding: 0px 10px;
    }
  }
  @supports (-ms-accelerator: true) or (-ms-ime-align: auto) {
    input,
    select {
      margin-top: 20px;
    }
    label {
      font-size: 12px;
      background: white;
      margin-bottom: -10px;
      padding-left: 10px;
      padding-right: 10px;
      margin-top: 10px;
      margin-left: 10px;
      position: absolute;
    }
  }
`

export const Field = styled.div`
  display: flex;
  flex-flow: column-reverse;
`

export const InputMask = styled(TextMask)`
  display: block;
`

InputMask.defaultProps = { guide: false }

export const ContMask = props => {
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

export const Input = props => {
  const { onChange, name, placeholder, clase, error, nolabelerror } = props
  return (
    <Cont>
      <Field>
        <input
          id={name}
          onFocus={onChange}
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

export const Select = props => {
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
