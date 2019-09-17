import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

// eslint-disable-next-line import/prefer-default-export
export const WrapperBlock = styled.div`
  position: relative;
  width: 100%;
  & .left {
    width: 100%;
    display: flex;
    justify-content: space-between;
    vertical-align: top;
    margin-bottom: 10px;
    @media ${device.desktop} {
      display: inline-block;
      width: 20%;
    }
    & > h3 {
      font-size: 18px;
      line-height: 28px;
      color: black;
      font-weight: bold;
      @media ${device.tablet} {
        font-size: 20px;
      }
    }
    & > button {
      color: #0179af;
      font-size: 12px;
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
      padding: 0px;
      @media ${device.tablet} {
        font-size: 10px;
      }
    }
  }
  & .right {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    background: ${props => (props.nobackground ? 'none' : ' #f4f4f4')};
    column-count: 1;
    line-height: 30px;
    font-size: 14px;
    padding: ${props => (props.nopadding ? '0px' : '10px 20px')};
    border-radius: 4px;
    @media ${device.desktop} {
      width: 80%;
      column-count: ${props => (props.nocolumn ? '0' : props.column)};
    }
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
      width: 100%;
      border-radius: 4px 4px 0px 0px;
      @media ${device.desktop} {
        border-radius: 4px 0px 0px 4px;
        padding: 45px 20px;
        width: 40%;
      }
    }
    & .details-right {
      padding: 20px 20px;
      width: 100%;
      color: #444444;
      @media ${device.desktop} {
        width: 60%;
        padding: 30px 20px;
      }
    }
    & .small {
      font-size: 10px;
    }

    & .container-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    & .item,
    & .add-item {
      width: 158px;
      height: 90px;
      margin: 0 0 15px 0;
      position: relative;
      @media ${device.desktop} {
        width: 180px;
        height: 101px;
      }
    }

    & .item {
      & img {
        width: 100%;
      }
      & .title {
        background-color: #d64445;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAANCAYAAAC3mX7tAAAAAXNSR0IArs4c6QAAAdlJREFUOBGtVN1RwkAQ3i/kSeNoB5hnRwY7gA7oQOhAK9AOxArECrAD6ACM4/h46UAc4jjjJLfuJhwmIpEH74G72/t2v/35CKhmJeYxJqBZA9npiYkXfi3SkYBGQbM1qMVueVyapw5AE+j70kRTuXAFy41LQjYTqxJcMMgEnA0Qni0quC2XxER9Im4zeQ8AF0SJeRaDPSr7BJTO39F4ZUY3P1NjSmDeZ9v9i0xIRtKuHsjvaFwlKsfeOGtWbGbrBDRAEj8aTWwDLAbFLuNoLLj5h3k5Voy2LokjhrRNSqNDNdYupvsgbI1EIEPpcV+zDcKTufPRwBk+x9KBt4Cynqu6mBFPfFDjmrnaNudc3n3y4+LujwjpOVE2k8wHBflzO8WnzAFHEu8MYWtR9tVzLoafRnfP5U1+z2WezxLpBIxLJsRE9gEexiKY/ko0svGwXO26IhdU97z3yG5KtqartkyiVazwHbbZUPLtHoSn08IWCVk6FXyltRsVaQbqoEvVoqoDeQteVeJICsTvv7mIpDIir+fi+NKeC3heRQx7Nr3VYYpapLe2zbBX2q5dSDRwMbdIMhVZi4jUln8ZrLUbleljvoAbyJ92VxLn9k1Gd2rbTiCP//atY377AkisCvuj2qe8AAAAAElFTkSuQmCC');
        background-repeat: no-repeat;
        background-position: 10px 8px;
        padding: 5px 10px 5px 40px;
        color: #f4e0d2;
        font-size: 12px;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 20px 0 0 0;
        line-height: 18px;
      }
    }

    & .add-item {
      text-align: center;
      border: 2px #818181 dashed;
      color: #818181;
      font-size: 14px;
      line-height: 18px;
      font-weight: bold;
      cursor: pointer;
      & .icon-plus {
        display: block;
        border: 3px solid gray;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        line-height: 25px;
        font-size: 30px;
        margin: 5px auto;
      }
    }
  }
`

// export const Wrapper = styled.div`
//   position: relative;
//   width: 100%;
//   background: #ffffff;
//   border-radius: 4px;
//   box-shadow: 0 0 0.3rem #dadada;
//   margin-left: 20px;
//   padding: 25px 40px;
//   & > .space {
//     height: 50px;
//   }
// `

// export const WrapperBlock = styled.div`
//   position: relative;
//   width: 100%;
//   & .left {
//     width: 25%;
//     display: inline-block;
//     vertical-align: top;
//     @media (max-width: 768px) {
//       width: 100%;
//     }
//     & > h3 {
//       font-size: 20px;
//       line-height: 28px;
//       color: black;
//       font-weight: bold;
//       @media (max-width: 768px) {
//         margin-bottom: 20px;
//       }
//     }
//     & > button {
//       color: #0179af;
//       font-size: 10px;
//       font-weight: bold;
//       text-decoration: underline;
//       cursor: pointer;
//       padding: 0px;
//     }
//   }
//   & .right {
//     width: 75%;
//     display: inline-block;
//     vertical-align: top;
//     background: ${props => (props.nobackground ? 'none' : ' #f4f4f4')};
//     column-count: ${props => (props.nocolumn ? '0' : props.column)};
//     line-height: 30px;
//     font-size: 14px;
//     padding: ${props => (props.nopadding ? '0px' : '10px 20px')};
//     border-radius: 4px;
//     @media (max-width: 768px) {
//       width: 100%;
//     }
//     & .pass {
//       font-size: 30px;
//       vertical-align: middle;
//       letter-spacing: 4px;
//       line-height: 0px;
//     }
//     & .details-left,
//     & .details-right {
//       display: inline-block;
//       vertical-align: top;
//     }
//     & .details-left {
//       background: #444444;
//       color: white;
//       padding: 45px 20px;
//       width: 40%;
//       border-radius: 4px 0px 0px 4px;
//     }
//     & .details-right {
//       padding: 30px 20px;
//       width: 60%;
//       color: #444444;
//     }
//     & .small {
//       font-size: 10px;
//     }

//     & .container-grid {
//       display: inline-block;
//     }

//     & .item,
//     & .add-item {
//       width: 188px;
//       height: 106px;
//       position: relative;
//       display: inline-block;
//       vertical-align: top;
//       margin: 0px 10px 20px 0px;
//       outline: none;
//       @media (max-width: 768px) {
//         width: 47%;
//       }
//     }

//     & .item {
//       background: #d64445;
//       & img {
//         width: 100%;
//       }
//       & .title {
//         background-color: #d64445;
//         background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAANCAYAAAC3mX7tAAAAAXNSR0IArs4c6QAAAdlJREFUOBGtVN1RwkAQ3i/kSeNoB5hnRwY7gA7oQOhAK9AOxArECrAD6ACM4/h46UAc4jjjJLfuJhwmIpEH74G72/t2v/35CKhmJeYxJqBZA9npiYkXfi3SkYBGQbM1qMVueVyapw5AE+j70kRTuXAFy41LQjYTqxJcMMgEnA0Qni0quC2XxER9Im4zeQ8AF0SJeRaDPSr7BJTO39F4ZUY3P1NjSmDeZ9v9i0xIRtKuHsjvaFwlKsfeOGtWbGbrBDRAEj8aTWwDLAbFLuNoLLj5h3k5Voy2LokjhrRNSqNDNdYupvsgbI1EIEPpcV+zDcKTufPRwBk+x9KBt4Cynqu6mBFPfFDjmrnaNudc3n3y4+LujwjpOVE2k8wHBflzO8WnzAFHEu8MYWtR9tVzLoafRnfP5U1+z2WezxLpBIxLJsRE9gEexiKY/ko0svGwXO26IhdU97z3yG5KtqartkyiVazwHbbZUPLtHoSn08IWCVk6FXyltRsVaQbqoEvVoqoDeQteVeJICsTvv7mIpDIir+fi+NKeC3heRQx7Nr3VYYpapLe2zbBX2q5dSDRwMbdIMhVZi4jUln8ZrLUbleljvoAbyJ92VxLn9k1Gd2rbTiCP//atY377AkisCvuj2qe8AAAAAElFTkSuQmCC');
//         background-repeat: no-repeat;
//         background-position: 10px 8px;
//         padding: 5px 10px 5px 40px;
//         color: #f4e0d2;
//         font-size: 12px;
//         position: absolute;
//         bottom: 0;
//         right: 0;
//         border-radius: 20px 0 0 0;
//         line-height: 18px;
//       }
//     }
//     & .add-item {
//       text-align: center;
//       border: 2px #818181 dashed;
//       color: #818181;
//       font-size: 14px;
//       line-height: 18px;
//       font-weight: bold;
//       padding: 5px 20px;
//       background: white;
//       cursor: pointer;
//       & .icon-plus {
//         display: block;
//         border: 3px solid gray;
//         border-radius: 50%;
//         width: 35px;
//         height: 35px;
//         line-height: 25px;
//         font-size: 30px;
//         margin: 5px auto;
//       }
//     }
//   }
// `
