import styled, { css } from 'styled-components'
import { device } from '../../_dependencies/breakpoints'

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

export const Title = styled.h4`
  color: ${props => (props.c ? props.c : '#000000')};
  font-family: ${props => (props.primaryFont ? props.primaryFont : 'inherit')};
  font-size: ${props => props.s - 2}px;
  font-weight: bold;
  line-height: 28px;
  @media ${device.tablet} {
    font-size: ${props => props.s - 3}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.s}px;
  }
`
export const Text = styled.p`
  color: ${props => changeColor(props.c)};
  font-size: ${props => props.s}px;
  line-height: ${props => (props.lh ? props.lh : '18')}px;
  font-weight: ${props => (props.fw ? props.fw : 'normal')};
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  @media ${device.mobile} {
    & .sub-paragraph {
      display: inline-block;
    }
  }
  & .sub-paragraph .price {
    display: inline-block;
    min-width: 30px;
  }
`
export const Form = styled.form`
  width: 100%;
  background-color: inherit;
  padding: ${props => (props.npadding ? '0px' : '10px 25px')};
  box-sizing: border-box;
  display: block;
  ${props =>
    props.typeDialog === 'premium' &&
    css`
      padding: 10px 20px !important;
    `}

  @media ${device.tablet} {
    padding: ${props => (props.npadding ? '0px' : '50px 35px')};
  }

  @media screen and (min-width: 768px) {
    padding: ${props => (props.npadding ? '0px' : '20px 80px')};
  }

  @media ${device.desktop} {
    padding: ${props => (props.npadding ? '0px' : '20px 50px')};

    ${props =>
      props.typeDialog === 'premium' &&
      css`
        padding: 20px !important;
      `}
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  input,
  select,
  button,
  textarea {
    border: 1px solid #bbbbbb;
    width: 100%;
    height: 45px;
    padding: 5px 10px;
    font-size: 14px;
    appearance: none;
    outline: none;
    border-radius: 4px;
  }

  & textarea{
    height: 65px;
    resize: none;
  }

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
  & .mt-40 {
    margin-top: 40px;
  }
  & .mb-20 {
    margin-bottom: 20px;
  }
  & .ml-5 {
    margin-left: 5px;
  }
  & .mr-5 {
    margin-right: 5px;
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
  & .justify {
    text-align: justify;
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
  & .only-mobile-tablet {
    display: none;
    @media screen and (max-width: 1023px) {
      display: block;
    }
  }
  & .note-premium{
    padding: 0px;
    @media ${device.tablet} {
      padding: 0px 40px 0px 40px;
    }
    @media ${device.desktop} {
      padding: 0px 34px 0px 34px;
    }
  }
`
export const Button = styled.button`
  background: ${props => (props.color ? props.color : '#0179af')};
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: 0px !important;
  &:disabled {
    opacity: 0.7;
  }
`
export const ButtonCall = styled.button`
  background: #f7c600
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABZ0lEQVRIie3TP0scURQF8J+LEFRMFSFtQC1ECz9AYqOQtMk3EFKlE9PY2NtIFBIk+Q75AAqBiIUQBCWga5r4r9tooZa6KeauPHF2dtfdTg9cZu55554z780Mj+gApvAVZVxElYObbMd4COuoJnUelXI/Mdiq+QTOwmAX03iWrA8EtxeaU7xs1nw4Bqr4hB68x3dUcIktfMRTLIX2n2zXDbEWA9/wHJvRL2LO7ePZxQt8if5HI/OJEP5FP35Ff4VxdMdO0pA/suM7iP5VUcByiGbwITFZTjQlLERobX0es3G/VBSwE6IRbMT9KvpytGP4jH3ZUY2GfrsooBKiXtmLXsGTooEEfTFbqSeYxHWIxBOR7WQ9R5/HV8PjXY0oJYsr6Er633FNQ1PU47tkn/dNk6bn8a3gjkepjrBjSAOOO+h7kke+waH8c20Wtf/ibRseTQXcoPseBo1w1KLnnYCiOsTrdgIeIP4DEkVzjBCABR8AAAAASUVORK5CYII=');
  background-repeat: no-repeat;
  background-position: 60px center;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  border: 0px !important;
  font-size: 18px;
  font-weight: normal;
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
  color: ${props => props.c};
  text-decoration: underline;
  font-size: ${props => props.s}px;
  display: inline-block;
  font-weight: ${props => (props.fw ? props.fw : 'normal')};
  cursor: pointer;
`

export const ContPaywall = styled.div`
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: #444444;
  line-height: 20px;
  position: relative;
  .cont-price-detail {
    margin-top: 20px;
    @media ${device.tablet} {
      margin-top: 35px;
    }
    @media ${device.desktop} {
      margin-top: 30px;
    }
    .price,
    .detail-price,
    .price-middle,
    .detail-price-middle {
      display: inline-block;
      vertical-align: initial;
    }
    .price {
      font-size: 65px;
      font-weight: 600;
      width: 40%;
      text-align: center;
      letter-spacing: -2px;
      @media ${device.tablet} {
        /* text-align: left; */
        font-size: 58px;
      }
      @media ${device.desktop} {
        /* text-align: left; */
        font-size: 56px;
      }
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
    .price-middle {
      width: 50%;
      h3 {
        font-size: 42px;
        text-align: center;
        font-weight: bold;
        font-family: inherit;
      }
    }
    .detail-price-middle {
      width: 50%;
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
  background: ${props => (props.type === 'warning' ? '#f9d8a7' : '#ff2b2b')};
  color: ${props => (props.type === 'warning' ? '#925700' : '#fff')};
  font-family: Libre Franklin, sans-serif;
  font-size: 12px;
  padding: 10px 10px;
  border-radius: 4px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 16px;
  & button {
    display: block;
    padding: 0;
    height: auto;
    width: auto;
    border: 0px;
    font-weight: bold;
    font-size: 12px;
    background: inherit;
    color: #925700;
    cursor: pointer;
    text-decoration: underline;
    margin: 0 auto;
  }
  & span {
    display: block;
  }
`
