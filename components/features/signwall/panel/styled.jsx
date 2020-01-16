import styled, { css } from 'styled-components'
import { device } from '../_dependencies/breakpoints'
import { fadeIn } from '../_dependencies/animations'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 0.3rem #dadada;
  margin-left: 0px;
  padding: 20px 10px;
  @media ${device.tablet} {
    margin-left: 10px;
    width: calc(100% - 10px);
    padding: 15px 20px;
  }
  @media ${device.desktop} {
    margin-left: 20px;
    width: calc(100% - 20px);
    padding: 30px 30px;
  }

  & .block-resume {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0px;
    }
  }

  & .space-40 {
    height: 40px;
    display: block;
  }

  & > .space {
    height: 50px;
  }

  & h4 {
    margin-bottom: 20px;
    font-weight: bold;
    line-height: 26px;
  }

  & .news-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 40px;
    justify-content: flex-start;
  }

  & .item {
    margin: 5px 5px;
    display: inline-block;
    width: calc(50% - 10px);
    text-align: center;
    @media screen and (min-width: 678px) {
      width: calc(50% - 10px);
      margin: 5px 5px;
    }
    @media ${device.desktop} {
      width: calc(33.3% - 40px);
      margin: 10px 20px;
    }
  }

  & .msg-success {
    ${fadeIn({ time: '1s' })}
    position: relative;
    display: block;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    background: #dbe9d8;
    padding: 20px 20px 20px 60px;
    margin-bottom: 10px;
    left: 0;
    color: #22810b;
    z-index: 12;
    & span {
      position: absolute;
      top: 6px;
      left: 20px;
      font-size: 32px;
    }
  }

  & .content-butom {
    text-align: right;
    padding: 40px 0px 0px 0px;
    width: 100%;
    position: relative;
  }
`

export const Button = styled.button`
  background: ${props => (props.link ? 'none' : '#0179af')};
  color: ${props => (props.link ? '#0179af' : 'white')};
  text-decoration: ${props => (props.link ? 'underline' : 'none')};
  font-size: ${props => (props.link ? '10px' : '14px')};
  min-width: 100px;
  height: 50px;
  padding: ${props => (props.link ? '0px' : '14px 20px')};
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
  line-height: 24px;
  border: 0px !important;
  cursor: pointer;

  @media ${device.mobile} {
    margin-bottom: 20px;
  }

  ${props =>
    props.typeBtn === 'border' &&
    css`
      background: white;
      color: #0179af;
      border: 1px solid #0179af !important;
    `}

  &:disabled {
    opacity: 0.7;
  }
`

export const Table = styled.table`
  width: 98%;
  line-height: 24px;
  font-size: 14px;
  border-collapse: collapse;
  margin: 0 auto;
  @media ${device.mobile} {
    width: 500px;
  }
  & thead {
    background: #f4f4f4;
    color: #000000;
    text-align: center;
    & tr > th {
      font-weight: normal;
      padding: 10px 5px;
    }
    & tr > th.left {
      text-align: left;
    }
  }
  & tbody > tr > td {
    padding: 20px 5px;
    border-bottom: 1px solid #e8e8e8;
  }
  & tbody > tr > td.center {
    text-align: center;
  }
`

export const Title = styled.h3`
  font-family: ${props => props.f};
  font-size: ${props => props.s}px;
  font-weight: bold;
  margin-top: 20px;
`

export const ResumeDates = styled.div`
  width: 100%;
  position: relative;
  color: black;

  .title-dates {
    display: inline-block;
    vertical-align: top;
    min-height: auto;
    width: 100%;
    @media ${device.desktop} {
      width: 20%;
    }

    h2 {
      margin: 0px;
    }

    .title {
      font-weight: bold;
      line-height: 26px;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  .link {
    font-weight: bold;
    color: #0179af;
    text-decoration: underline;
    padding: 15px 0px;
    font-size: 12px;
    text-transform: uppercase;
    background: none;
    border: 0px;
    outline: none;
    cursor: pointer;
  }

  .cont-note {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    @media ${device.desktop} {
      width: 75%;
    }
    .note-subs {
      color: #444444;
      font-size: 14px;
      padding: 10px 0px;
      @media ${device.desktop} {
        font-size: 11px;
      }
    }
  }

  .cont-plan {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    .first-plan,
    .last-plan {
      width: 100%;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      padding: 10px;
      @media ${device.desktop} {
        width: 50%;
      }
    }
    .first-plan {
      color: #444444;
      padding: 5% 10%;
      text-align: center;
      @media ${device.desktop} {
        padding: 20% 10%;
      }
      p {
        font-size: 14px;
        line-height: 30px;
      }
    }
    .last-plan {
      @media ${device.desktop} {
        padding: 0px 0px;
        border-left: 1px solid #bbbbbb;
      }
    }
  }

  .cont-dates,
  .cont-subs {
    background: #e8e8e8;
    padding: 20px 15px;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    font-size: 14px;
    line-height: 30px;

    display: inline-block;
    vertical-align: top;
    min-height: auto;

    @media ${device.desktop} {
      width: 80%;
      min-height: 190px;
    }
    .pass {
      font-size: 30px;
      vertical-align: middle;
      letter-spacing: 4px;
    }
    .first-dates,
    .last-dates {
      display: inline-block;
      vertical-align: top;
      p:first-child {
        text-transform: capitalize;
      }
      p {
        margin: 0px;
      }
    }
    .first-dates,
    .last-dates {
      width: 100%;
      @media ${device.desktop} {
        width: 50%;
      }
    }
  }

  .cont-subs {
    padding: 0px;
    min-height: auto;
    @media ${device.desktop} {
      min-height: 150px;
    }
    .first-subs,
    .last-subs {
      display: inline-block;
      vertical-align: top;
      p {
        margin: 0px;
      }
    }
    .first-subs {
      background: #444444;
      color: white;
      padding: 40px 25px;
      width: 100%;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 20px;
      min-height: auto;
      border-radius: 8px 8px 0px 0px;
      @media ${device.desktop} {
        border-radius: 8px 0px 0px 8px;
        min-height: 150px;
        width: 40%;
      }
    }
    .last-subs {
      padding: 30px 40px;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      @media ${device.desktop} {
        min-height: 150px;
        width: 60%;
      }
      .btn-subs {
        background: #0179af;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin-top: 18px;
        border: 0px;
        cursor: pointer;
      }
      h3 {
        font-weight: bold;
        font-size: 16px;
      }
      p {
        color: #444444;
        font-size: 14px;
        text-align: left;
      }
      ul {
        text-align: left;
        font-size: 14px;
        line-height: 24px;
        li {
          padding-left: 30px;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAYNJREFUOBGFUsFxgzAQBEEDqSDgBuIOogH/43QQXnmGdOBUELsC55mn/Qcjd0AaICqBArDJrgeIkB3nZsSduN3T3kmuY5mUMvB9/wW/Jda0S5fw2yzLFt1+cP4QIYjjeOm6LslO27ZfiLfwNXyAtTGxfez2AcglQHfYb5umSZVSus/ZPoqiJ2Dv8zxPTgWMk98uyTQLkCyEWFPh4XCQbtfzN0DscW6C7dgmQ2UtPM9LCaRsm2DuL5GZF1iScvqeZ7OZZMK0v8jECA4OS3PDduAKzGTNPe0amfnRNVIFCAmHhCK8yr05MPZMEg1KN3APgvIR3PInbbfbfRyPxwSqRtM2ycSBF5DLGSisaScf4W8RAnhVNplYtg6oGq4R4A0exuOpwj+fXj5uLvS01nUYhjeUPJlMnKqq9tf4IC+Qf8aBq6IoPs+eMpVA9itkawAHo2y8mXccNMfP4dENBYg0njS3JYppBiAFcFMsDm+FVlPGtFEB/uhOIkB2gyKJN6WgbGkr+wHP1//N8PmHWQAAAABJRU5ErkJggg==');
          background-repeat: no-repeat;
          background-position: 0px 4px;
          color: #444444;
          font-size: 14px;
        }
      }
    }
  }
`
