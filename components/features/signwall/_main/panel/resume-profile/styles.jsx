import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

// eslint-disable-next-line import/prefer-default-export
export const WrapperBlock = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0px;
  }
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
        font-size: 18px;
      }
      @media ${device.desktop} {
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
  
  & .column{
    width: 100%;
    column-count: 1;
    @media ${device.desktop} {
      column-count: ${props => (props.nocolumn ? '0' : props.column)};
    }
  }

  & .right {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    background: ${props => (props.nobackground ? 'none' : ' #f4f4f4')};
    line-height: 30px;
    font-size: 14px;
    padding: ${props => (props.nopadding ? '0px' : '10px 20px')};
    border-radius: 4px;
    color: black;
    @media ${device.desktop} {
      width: 80%;
    }
    
    & .pass {
      font-size: 30px;
      vertical-align: sub;
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

    & .link{
      color: #0179af;
      font-size: 14px;
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
      padding: 0px;
    }

    & .small {
      font-size: 10px;
    }

    & .container-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    & .item,
    & .add-item {
      /* width: 158px;
      height: 90px; */
      margin: 5px 5px;
      position: relative;
      width:calc(50% - 10px);
      /* @media screen and (max-width: 320px) {
        width: 145px;
      } */
      background:#d64344;
      @media screen and (min-width: 568px) {
        width:calc(33.3% - 20px);
        margin: 10px 10px;
      }
      /* @media ${device.tablet} {
        width:calc(33.3% - 20px);
        margin: 10px 10px;
      } */
      /* @media ${device.desktop} {
        width: 180px;
        height: 101px;
        margin: 0 15px 15px 0;
      } */
    }

    & .item {
      & img {
        width: 100%;
      }
      & .title {
        background-color: #d64445;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAANCAYAAAC3mX7tAAAAAXNSR0IArs4c6QAAAdlJREFUOBGtVN1RwkAQ3i/kSeNoB5hnRwY7gA7oQOhAK9AOxArECrAD6ACM4/h46UAc4jjjJLfuJhwmIpEH74G72/t2v/35CKhmJeYxJqBZA9npiYkXfi3SkYBGQbM1qMVueVyapw5AE+j70kRTuXAFy41LQjYTqxJcMMgEnA0Qni0quC2XxER9Im4zeQ8AF0SJeRaDPSr7BJTO39F4ZUY3P1NjSmDeZ9v9i0xIRtKuHsjvaFwlKsfeOGtWbGbrBDRAEj8aTWwDLAbFLuNoLLj5h3k5Voy2LokjhrRNSqNDNdYupvsgbI1EIEPpcV+zDcKTufPRwBk+x9KBt4Cynqu6mBFPfFDjmrnaNudc3n3y4+LujwjpOVE2k8wHBflzO8WnzAFHEu8MYWtR9tVzLoafRnfP5U1+z2WezxLpBIxLJsRE9gEexiKY/ko0svGwXO26IhdU97z3yG5KtqartkyiVazwHbbZUPLtHoSn08IWCVk6FXyltRsVaQbqoEvVoqoDeQteVeJICsTvv7mIpDIir+fi+NKeC3heRQx7Nr3VYYpapLe2zbBX2q5dSDRwMbdIMhVZi4jUln8ZrLUbleljvoAbyJ92VxLn9k1Gd2rbTiCP//atY377AkisCvuj2qe8AAAAAElFTkSuQmCC');
        background-repeat: no-repeat;
        background-position: 10px 5px;
        padding: 5px 10px 5px 40px;
        color: #f4e0d2;
        font-size: 12px;
        position: absolute;
        bottom: 0;
        right: 0;
       
        line-height: 16px;
        width: 100%;
        @media ${device.desktop} {
          border-radius: 20px 0 0 0;
          width: 160px;
        }
      }
    }

    & .add-item {
      background:#ffffff;
      text-align: center;
      border: 2px #818181 dashed;
      color: #818181;
      font-size: 14px;
      line-height: 18px;
      font-weight: bold;
      padding: 10px;
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
