import styled from 'styled-components'
import TextMask from 'react-text-mask'
import { device } from '../../../_styles/breakpoints'

export const WrapperBlock = styled.div`
  position: relative;
  width: 100%;
`

export const Subsdetail = styled.div`
  width: 100%;
  display: inline-block;
  vertical-align: top;
  background: ${props => (props.nobackground ? 'none' : ' #f4f4f4')};
  column-count: ${props => (props.nocolumn ? '0' : props.column)};
  line-height: 30px;
  font-size: 14px;
  padding: ${props => (props.nopadding ? '0px' : '10px 20px')};
  border-radius: 4px;
  margin-bottom: 20px;
  & .pass {
    font-size: 30px;
    vertical-align: middle;
    letter-spacing: 4px;
    line-height: 0px;
  }
  & .details-left,
  & .details-right {
    display: inline-block;
    vertical-align: top;
  }
  & .details-left {
    background: #444444;
    color: white;
    padding: 20px 20px;
    width: 40%;
    border-radius: 4px 0px 0px 4px;
    @media ${device.mobile} {
      width: 100%;
    }
  }
  & .details-right {
    padding: 30px 20px;
    width: 60%;
    color: #444444;
    @media ${device.mobile} {
      width: 100%;
    }
    & ul > li {
      padding-left: 30px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAYNJREFUOBGFUsFxgzAQBEEDqSDgBuIOogH/43QQXnmGdOBUELsC55mn/Qcjd0AaICqBArDJrgeIkB3nZsSduN3T3kmuY5mUMvB9/wW/Jda0S5fw2yzLFt1+cP4QIYjjeOm6LslO27ZfiLfwNXyAtTGxfez2AcglQHfYb5umSZVSus/ZPoqiJ2Dv8zxPTgWMk98uyTQLkCyEWFPh4XCQbtfzN0DscW6C7dgmQ2UtPM9LCaRsm2DuL5GZF1iScvqeZ7OZZMK0v8jECA4OS3PDduAKzGTNPe0amfnRNVIFCAmHhCK8yr05MPZMEg1KN3APgvIR3PInbbfbfRyPxwSqRtM2ycSBF5DLGSisaScf4W8RAnhVNplYtg6oGq4R4A0exuOpwj+fXj5uLvS01nUYhjeUPJlMnKqq9tf4IC+Qf8aBq6IoPs+eMpVA9itkawAHo2y8mXccNMfP4dENBYg0njS3JYppBiAFcFMsDm+FVlPGtFEB/uhOIkB2gyKJN6WgbGkr+wHP1//N8PmHWQAAAABJRU5ErkJggg==');
      background-repeat: no-repeat;
      background-position: 0 4px;
      margin-bottom: 10px;
    }
  }
`

export const Fieldset = styled.fieldset`
  display: block;
  border: 0px;
  padding: 20px 0px;
  line-height: 0px;
  margin: 20px 0 0 0;
  & .cont-table {
    @media ${device.mobile} {
      width: 300px;
      overflow: auto;
      margin: 0 auto;
    }
  }
  & legend {
    font-weight: bold;
    font-size: 14px;
  }
  & .left,
  & .right {
    display: inline-block;
    vertical-align: middle;
    background: none;
  }
  & .left {
    text-align: left;
    width: 70%;
  }
  & .right {
    text-align: right;
    width: 30%;
  }
`

export const Notice = styled.div`
  background: #f4f4f4;
  color: #000000;
  font-size: 14px;
  line-height: 28px;
  padding: 10px 25px;
  border-radius: 4px;
  display: flex;
  width: 100%;
  margin-top: 20px;
  & :first-child {
    margin-right: 10px;
    margin-top: 5px;
    width: 100px;
    @media ${device.desktop} {
      width: 50px;
    }
  }
`

export const Input = styled.input`
  /* border: 1px solid #aaaaaa;
  padding: 5px 20px;
  height: 50px;
  border-radius: 4px;
  margin: 0px 10px;
  font-size: 14px;
  width: 25%; */
`

export const InputMask = styled(TextMask)`
  display: block;
  margin: 0;
  color: #333333;
  width: 100%;
  font-weight: inherit;
  border-radius: 0.4rem;
  border: 1px solid #cccccc;
  font-size: 14px;
  box-sizing: border-box;
  padding: 12px 20px;
  line-height: inherit;
  appearance: none;
  cursor: text;
  outline: none;
  height: 45px;
  background: white;

  @media ${device.tablet} {
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    flex-shrink: 1;
  }

  &[disabled] {
    opacity: 0.3;
  }
  &[type='text'],
  &[type='email'],
  &[type='password'] {
    box-shadow: 0 0 0 30px white inset !important;
  }
  &::placeholder {
    color: #b0bec5;
  }
  &:focus {
    outline: none;
  }
  &:placeholder-shown + .form-group__label {
    visibility: hidden;
    z-index: -1;
  }
  &:not(:placeholder-shown) + .form-group__label,
  &:focus:not(:placeholder-shown) + .form-group__label {
    visibility: visible;
    z-index: 1;
    opacity: 1;
    transform: translate3d(0, -14px, 0) scale(0.8);
    transition: transform 300ms, visibility 0ms, z-index 0ms;
  }
`

export const Group = styled.div`
  display: block;
  @media ${device.desktop} {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
  }
  & .subtitle {
    font-size: 14px;
    height: 40px;
    line-height: 20px;
    @media ${device.desktop} {
      height: 20px;
    }
  }
  @media ${device.desktop} {
    & label {
      margin: 0 10px;
    }
  }
`
export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 30px;
  display: inline-block;
  width: ${props =>
    props.width === '30' || props.width === '20' ? '50' : '100'}%;
  @media ${device.tablet} {
    width: 45%;
    margin: 0px 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  @media ${device.desktop} {
    width: ${props => props.width}%;
    &:first-child {
      margin-left: 0px;
    }
    &:last-child {
      margin-right: 0px;
    }
  }
  & label {
    display: block;
    position: absolute;
    left: 14px;
    top: 14px !important;
    color: #cccccc;
    background: white;
    font-size: 16px !important;
    padding: 0px 7px;
    opacity: 0;
    height: 10px !important;
    border-radius: 20px;
    transform: translate3d(0, 50%, 0) scale(1);
    transform-origin: 0 0;
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      visibility 0ms 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      z-index 0ms 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  & input {
    display: block;
    margin: 0;
    color: #333333;
    width: 100%;
    font-weight: inherit;
    border-radius: 0.4rem;
    border: 1px solid #cccccc;
    font-size: 14px;
    box-sizing: border-box;
    padding: 12px 20px;
    line-height: inherit;
    appearance: none;
    cursor: text;
    outline: none;
    height: 45px;
    background: white;

    @media ${device.tablet} {
      display: flex;
      flex-basis: 100%;
      flex-grow: 1;
      flex-shrink: 1;
    }

    &[disabled] {
      opacity: 0.3;
    }
    &[type='text'],
    &[type='email'],
    &[type='password'] {
      box-shadow: 0 0 0 30px white inset !important;
    }
    &::placeholder {
      color: #b0bec5;
    }
    &:focus {
      outline: none;
    }
    &:placeholder-shown + .form-group__label {
      visibility: hidden;
      z-index: -1;
    }
    &:not(:placeholder-shown) + .form-group__label,
    &:focus:not(:placeholder-shown) + .form-group__label {
      visibility: visible;
      z-index: 1;
      opacity: 1;
      transform: translate3d(0, -14px, 0) scale(0.8);
      transition: transform 300ms, visibility 0ms, z-index 0ms;
    }
  }
`

export const Block = styled.div`
  width: 100%;
  display: block;
  text-align: ${props => (props.ar ? 'right' : 'left')};
  border-top: ${props => (props.bt ? '1px solid #e8e8e8' : '0px')};
  padding-top: ${props => (props.pt ? `${props.pt}px` : '0px')};
`

export const Msgcvv = styled.div`
  display: inline-flex;
  margin-top: -10px;
  & svg {
    width: 50px;
  }
  & small {
    width: 180px;
    line-height: 14px;
    font-size: 12px;
    @media ${device.desktop} {
      width: 130px;
    }
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
