/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styled from 'styled-components'

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
`

export const Field = styled.div`
  display: flex;
  flex-flow: column-reverse;
`

export const Input = ({
  type,
  name,
  required,
  placeholder,
  value,
  onChange,
  clase,
  error,
  autocomplete,
  autocapitalize,
}) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Cont>
      <Field>
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onChange}
          className={`${clase} ${error && 'error'}`}
          autoComplete={autocomplete}
          autoCapitalize={autocapitalize}
        />
        <label htmlFor={name} className={error && 'error'}>
          {error || placeholder}
        </label>
      </Field>
    </Cont>
  )
}

export const Select = ({
  type,
  name,
  width,
  clase,
  required,
  placeholder,
  value,
  onChange,
  error,
  children,
  nolabel,
}) => {
  return (
    <Cont width={width}>
      <Field>
        <select
          type={type}
          name={name}
          id={name}
          required={required}
          value={value}
          onFocus={onChange}
          onChange={onChange}
          className={`${clase} ${error && 'error'}`}>
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
