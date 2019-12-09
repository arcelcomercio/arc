import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

const changeColor = color => {
  switch (color) {
    case 'light':
      return '#818181'
    case 'gray':
      return '#444444'
    case 'black':
      return '#000000'
    case 'blue':
      return '#0179af'
    default:
      return '#444444'
  }
}

const changeSize = size => {
  return `${size}px`
}

export const Title = styled.h4`
  color: ${props => (props.cp ? '#8f071f' : '#000000')};
  font-size: ${props => changeSize(props.s)};
  font-weight: bold;
  line-height: 28px;
`
export const Text = styled.p`
  color: ${props => changeColor(props.c)};
  font-size: ${props => changeSize(props.s)};
  line-height: ${props => (props.lh ? props.lh : '18')}px;
  font-weight: ${props => (props.fw ? props.fw : 'normal')};
`
export const Form = styled.form`
  width: 100%;
  padding: 10px 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  /* Change the white to any color ;) */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  input,
  select,
  button {
    border: 1px solid #bbbbbb;
    width: 100%;
    height: 45px;
    padding: 5px 10px;
    font-size: 14px;
    appearance: none;
    outline: none;
    border-radius: 4px;
  }
  @media ${device.tablet} {
    padding: 10px 100px;
  }
  @media ${device.desktop} {
    padding: 20px 50px;
  }
  box-sizing: border-box;
  display: block;
  & input {
    box-sizing: border-box;
    cursor: text;
    line-height: 20px;
    @media ${device.tablet} {
      padding: 5px 20px;
    }
    &.error {
      border: 1px solid #ff2b2b;
    }
  }
  & select {
    cursor: text;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 10px;
    &.error {
      border: 1px solid #ff2b2b;
    }

    &:focus {
      background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    }

    @media ${device.tablet} {
      padding: 5px 15px;
    }
  }
  & .mt-10 {
    margin-top: 10px;
  }
  & .mb-10 {
    margin-bottom: 10px;
  }
  & .mt-20 {
    margin-top: 20px;
  }
  & .mb-20 {
    margin-bottom: 20px;
  }
  & .ml-10 {
    margin-left: 10px;
  }
  & .mr-10 {
    margin-right: 10px;
  }
  & .center {
    text-align: center;
  }
  & .bold {
    font-weight: bold;
  }
  & .right {
    text-align: right;
  }
  & .f-right {
    float: right;
  }
  & .text-sm {
    font-size: 12px;
  }
  & .block {
    display: block;
  }
  & .inline {
    display: inline;
  }
  & .sz-20 {
    font-size: 20px;
  }
  & .label {
    color: gray;
    font-size: 12px;
    margin-bottom: 5px;
  }
  & .group-inline {
    display: flex;
    justify-content: space-between;
  }
`

// export const Select = styled.select`
//   cursor: text;
//   background: transparent;
//   background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
//   background-repeat: no-repeat;
//   background-position-x: 100%;
//   background-position-y: 10px;

//   &:focus {
//     background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
//   }

//   @media ${device.tablet} {
//     padding: 5px 15px;
//   }
// `
export const Button = styled.button`
  background: #0179af;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: 0px !important;
  &:disabled {
    opacity: 0.7;
  }
`

export const ButtonBase = styled(Button)`
  width: auto !important;
  background: none;
  color: black;
  padding: 0px;
  height: auto;
  & svg {
    margin-right: 10px;
  }
`

export const Link = styled.a`
  color: ${props => changeColor(props.c)};
  text-decoration: underline;
  font-size: ${props => changeSize(props.s)};
  display: inline-block;
  font-weight: ${props => (props.fw ? props.fw : 'normal')};
  cursor: pointer;
`

export const ContPaywall = styled.div`
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  background: #ffffff;
  color: #444444;
  line-height: 20px;
  position: relative;
  .cont-price-detail {
    margin-top: 20px;
    .price,
    .detail-price {
      display: inline-block;
      vertical-align: initial;
    }
    .price {
      font-size: 4em;
      font-weight: 600;
      width: 40%;
      text-align: center;
      @media ${device.desktop} {
        text-align: left;
      }
      letter-spacing: -2px;
      i {
        font-size: 0.5em;
        font-weight: normal;
        letter-spacing: 0px;
        font-style: normal;
      }
    }
    .detail-price {
      width: 60%;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .title-line {
    font-weight: bold;
    font-size: 14px;
    position: relative;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    &:before {
      content: '';
      display: block;
      border-top: solid 1px gray;
      width: 100%;
      height: 2px;
      position: absolute;
      top: 50%;
      z-index: 0;
    }
    span {
      background: #ffffff;
      padding: 0 10px;
      position: relative;
      z-index: 1;
    }
  }
  .line-gestion {
    &:before {
      border-top: solid 1px #a98e7c !important;
    }
  }
  .line-elcomercio {
    &:before {
      border-top: solid 1px #c6b065 !important;
    }
  }
  .list-benefits {
    font-size: 14px;
    line-height: 24px;
    li {
      padding-left: 30px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAYNJREFUOBGFUsFxgzAQBEEDqSDgBuIOogH/43QQXnmGdOBUELsC55mn/Qcjd0AaICqBArDJrgeIkB3nZsSduN3T3kmuY5mUMvB9/wW/Jda0S5fw2yzLFt1+cP4QIYjjeOm6LslO27ZfiLfwNXyAtTGxfez2AcglQHfYb5umSZVSus/ZPoqiJ2Dv8zxPTgWMk98uyTQLkCyEWFPh4XCQbtfzN0DscW6C7dgmQ2UtPM9LCaRsm2DuL5GZF1iScvqeZ7OZZMK0v8jECA4OS3PDduAKzGTNPe0amfnRNVIFCAmHhCK8yr05MPZMEg1KN3APgvIR3PInbbfbfRyPxwSqRtM2ycSBF5DLGSisaScf4W8RAnhVNplYtg6oGq4R4A0exuOpwj+fXj5uLvS01nUYhjeUPJlMnKqq9tf4IC+Qf8aBq6IoPs+eMpVA9itkawAHo2y8mXccNMfP4dENBYg0njS3JYppBiAFcFMsDm+FVlPGtFEB/uhOIkB2gyKJN6WgbGkr+wHP1//N8PmHWQAAAABJRU5ErkJggg==');
      background-repeat: no-repeat;
      background-position: 0px 4px;
      margin-bottom: 10px;
    }
  }
`
export const Error = styled.div`
  background: #ff2b2b;
  color: #fff;
  font-family: Libre Franklin, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
`
