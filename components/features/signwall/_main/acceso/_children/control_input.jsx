/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styled, { css } from 'styled-components'
import { Input, Select } from './styles'

export const Cont = styled.div`
  display: inline-block;
  width: ${props => (props.w ? props.w : '100')}%;
  & label,
  input {
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
`

export const Field = styled.div`
  display: flex;
  flex-flow: column-reverse;
`

export const General = css`
  font-family: inherit;
  appearance: none;

  &:placeholder-shown + label {
    cursor: text;
    transform-origin: 0 0;
    transform: translate(1rem, 2rem) scale(0.95);
  }

  &::placeholder {
    opacity: 0;
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
`

export const InputLabel = styled(Input)`
  ${General}
  border: 1px solid ${props => (props.error ? '#ff2b2b' : '#bbbbbb')};
`

export const InputSelect = styled(Select)`
  width: calc(100% - ${props => (props.mr ? props.mr : '0')}px);
  ${General}
  border: 1px solid ${props => (props.error ? '#ff2b2b' : '#bbbbbb')};
`

export const InputForm = props => {
  const {
    t,
    n,
    ph,
    ac,
    c,
    w,
    ml,
    mr,
    valid,
    value,
    onChange,
    onFocus,
    error,
    nolabel,
    children,
  } = props

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Cont w={w}>
      <Field>
        {{
          select: (
            <InputSelect
              type={t}
              name={n}
              id={n}
              className={c}
              ml={ml}
              mr={mr}
              required={valid}
              defaultValue={value}
              onFocus={onFocus}
              onChange={onChange}
              error={error}>
              {children}
            </InputSelect>
          ),
        }[t] || (
          <InputLabel
            type={t}
            name={n}
            id={n}
            className={c}
            // min="2000-01-01" max="2019-12-31"
            autoComplete={ac}
            required={valid}
            value={value}
            onFocus={onFocus}
            onChange={onChange}
            error={error}
            placeholder={`Ingresar ${ph}`}
          />
        )}
        {!nolabel && (
          <label htmlFor={n} className={error && 'error'}>
            {error || ph}
          </label>
        )}
      </Field>
      {/* {error && <p className="label-error">{error}</p>} */}
    </Cont>
  )
}
