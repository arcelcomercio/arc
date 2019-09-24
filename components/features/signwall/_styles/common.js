import styled from 'styled-components'
import { device } from './breakpoints'
import { fadeIn } from './animations'

// eslint-disable-next-line import/prefer-default-export
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
  }

  & .news-list {
    /* text-align: center; */
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 40px;
    /* justify-content: space-between; */
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
      margin: 5px 20px;
    }
  }

  & .msg-success {
    ${fadeIn({ time: '1s' })}
    /* box-shadow: 0 10px 14px rgba(0, 0, 0, 0.2); */
    position: relative;
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
    /* @media ${device.desktop} {
      position: absolute;
      font-size: 10px;
      font-weight: bold;
      right: 60px;
    } */
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
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }
`

export const Table = styled.table`
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  border-collapse: collapse;
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
