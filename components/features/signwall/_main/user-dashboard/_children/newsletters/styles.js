import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: #ffffff;
  /* border-radius: 4px;
  box-shadow: 0 0 0.3rem #dadada;
  margin-left: 20px;
  padding: 25px 40px; */
  & h4 {
    margin-bottom: 20px;
    font-weight: bold;
  }
  & .news-list {
    text-align: center;
  }
  & .item {
    margin: 5px 8px;
    display: inline-block;
  }
  & .msg-success {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 10px;
    font-weight: bold;
    color: #03d613;
    top: 7px;
    right: 10px;
    @media (max-width: 768px) {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 20px;
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
  background: #0179af;
  color: white;
  font-size: 14px;
  min-width: 200px;
  height: 50px;
  padding: 14px 20px;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
  line-height: 24px;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }
`
