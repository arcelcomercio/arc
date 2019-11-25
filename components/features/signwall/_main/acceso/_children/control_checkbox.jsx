/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from 'styled-components'
import { Text, Link } from './styles'

const TERMS =
  'https://ecoid.pe/terminos_y_condiciones/108f85a3d8e750a325ced951af6cd758a90e73a34'
const PRIVA =
  'https://ecoid.pe/politica_privacidad/108f85a3d8e750a325ced951af6cd758a90e73a34'

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
    & .error {
      border: 1px solid red;
    }
  }
`

export const CheckBox = props => {
  const { checked, type, value, onChange, valid, error } = props
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <CheckContainer>
      <input
        type={type}
        name="termsConds"
        checked={checked}
        value={value}
        onChange={onChange}
        required={valid}
        error={error}
      />

      <Text c="gray" lh="20" s="13" className="mt-20 mb-10">
        Al crear la cuenta acepto los
        <Link
          href={TERMS}
          target="_blank"
          c="blue"
          fw="bold"
          className="ml-10 mr-10 inline">
          Términos y Condiciones
        </Link>
        y
        <Link
          href={PRIVA}
          target="_blank"
          c="blue"
          fw="bold"
          className="ml-10 inline">
          Políticas de Privacidad
        </Link>
      </Text>

      <span className={error && 'error'}>{error}</span>

      <span className="checkmark" />
    </CheckContainer>
  )
}
