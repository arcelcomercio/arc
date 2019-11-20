/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from 'styled-components'
import { Text, Link } from './styles'

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
  /* @media (--tablet) {
        margin-bottom: 0px;
        padding-left: 35px;
        font-size: 13px;
      } */
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    &:checked ~ .check-container__checkmark {
      background-color: #2196f3;
      border: 1px solid #2196f3;
    }
    &:checked ~ .check-container__checkmark:after {
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
      top: 2px;
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
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <CheckContainer>
      <input type="checkbox" name="termsConds" checked />

      <Text c="gray" lh="20" s="13" className="mt-20 mb-20">
        Al crear la cuenta acepto los
        <Link href="#" c="blue" fw="bold" className="ml-10 mr-10 inline">
          Términos y Condiciones
        </Link>
        y
        <Link href="#" c="blue" fw="bold" className="ml-10 inline">
          Políticas de Privacidad
        </Link>
      </Text>

      <span className="checkmark" />
    </CheckContainer>
  )
}
