/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { device } from '../../../../_dependencies/breakpoints'

export const FormGrid = styled.form`
  padding: 10px;
  font-size: 14px;
  /* font-family: $signwall-secondary-font; */
  @media ${device.tablet} {
    padding: 0px;
    min-height: auto;
  }
  & .row {
    display: flex;
    position: relative;
    width: 100%;
    margin: 0rem 0%;
    min-height: 0.125rem;
  }

  & .btw {
    justify-content: space-between;
  }

  & .three {
    display: flex;
    flex-direction: column;
    @media ${device.desktop} {
      flex-direction: row;
    }
  }

  & .title {
    font-size: 16px;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: bold;
    color: black;
  }

  & button {
    border: 1px solid #bbbbbb;
    width: 100%;
    height: 45px;
    padding: 5px 10px;
    font-size: 14px;
    appearance: none;
    outline: none;
    border-radius: 4px;
  }
  & .center {
    text-align: center;
  }
`

export const FormGroup = styled.div`
  margin: 14px 0;
  margin-bottom: 15px;
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  @media ${device.desktop} {
    width: ${props => (props.full ? '100' : '33.3')}%;
    margin: 10px ${props => (props.full ? '0' : '5')}px;
  }
  @media ${device.tablet} {
    margin-bottom: 12px;
    &--unique {
      margin-right: 0;
    }
  }
  &:nth-last-child(1) {
    margin-right: 0px;
  }
  & .unique {
    margin-right: 0;
  }
  & .label {
    display: block;
    position: absolute;
    left: 14px;
    top: 7px;
    color: #cccccc;
    background: white;
    font-family: $signwall-secondary-font;
    font-size: 14px;
    font-weight: inherit;
    line-height: inherit;
    padding: 0px 7px;
    opacity: 0;
    border-radius: 20px;
    transform: translate3d(0, 50%, 0) scale(1);
    transform-origin: 0 0;
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      visibility 0ms 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      z-index 0ms 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  select::-ms-expand {
    display: none;
  }
  & .input {
    display: flex;
    margin: 0;
    color: #333333;
    width: 100%;
    font-family: $signwall-secondary-font;
    font-weight: inherit;
    border-radius: 0.4rem;
    border: 1px solid #cccccc;
    font-size: 1em;
    box-sizing: border-box;
    padding: 12px 20px;
    line-height: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    cursor: text;
    outline: none;
    height: 45px;
    background: white;
    flex-basis: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    @media ${device.tablet} {
      height: 50px;
    }
    &[disabled] {
      opacity: 0.3;
    }
    &[type='text'],
    &[type='email'],
    &[type='password'] {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
    &::placeholder {
      color: #b0bec5;
    }
    &:focus {
      outline: none;
    }
    &:placeholder-shown + .label {
      visibility: hidden;
      z-index: -1;
    }
    &:not(:placeholder-shown) + .label,
    &:focus:not(:placeholder-shown) + .label {
      visibility: visible;
      z-index: 1;
      opacity: 1;
      transform: translate3d(0, -14px, 0) scale(0.8);
      transition: transform 300ms, visibility 0ms, z-index 0ms;
    }
    &.error {
      border: 1px solid #ff2b2b;
    }
    &.input-minimal {
      background-image: linear-gradient(45deg, transparent 50%, gray 50%),
        linear-gradient(135deg, gray 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position: calc(100% - 20px) calc(1em + 6px),
        calc(100% - 15px) calc(1em + 6px), calc(100% - 2.5em) 0.5em;
      background-size: 5px 5px, 5px 5px, 0px 0em;
      background-repeat: no-repeat;
      padding-right: 30px;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      &:focus {
        background-image: linear-gradient(45deg, gray 50%, transparent 50%),
          linear-gradient(135deg, transparent 50%, gray 50%),
          linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 15px) 1.5em, calc(100% - 20px) 1.5em,
          calc(100% - 2.5em) 0.5em;
        background-size: 5px 5px, 5px 5px, 0px 0em;
        background-repeat: no-repeat;
        outline: 0;
      }
    }
  }
  & .combo {
    display: block;
    width: 100%;
    select,
    input {
      display: inline-block;
    }
    select {
      width: 40%;
    }
    select::-ms-expand {
      display: none;
    }
    input {
      width: 60%;
    }
  }
  & .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & span.error {
    color: #ff2b2b;
    font-size: 12px;
    line-height: 16px;
    display: block;
    padding-top: 5px;
  }
`
export const Message = styled.div`
  width: 100%;
  padding: 10px 25px;
  text-align: center;
  background: ${props =>
    props.success ? 'rgba(36, 145, 9, 0.1)' : 'rgba(219, 0, 0, 0.1)'};
  color: ${props => (props.success ? 'rgb(36, 145, 9)' : 'rgb(219, 0, 0)')};
  border-radius: 4px;
  font-size: 14px;
  display: block;
  line-height: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`
