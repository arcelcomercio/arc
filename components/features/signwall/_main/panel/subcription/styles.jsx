import styled from 'styled-components'

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
  }
  & .details-right {
    padding: 30px 20px;
    width: 60%;
    color: #444444;
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
  }
`
export const Input = styled.input`
  border: 1px solid #aaaaaa;
  padding: 5px 20px;
  height: 50px;
  border-radius: 4px;
  margin: 0px 10px;
  font-size: 14px;
  width: 25%;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child-child {
    margin-right: 0px;
  }
`
export const Group = styled.div`
  display: flex;
  box-sizing: border-box;
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
  padding-top: 10px;
  & svg {
    width: 50px;
  }
  & small {
    width: 120px;
    line-height: 14px;
    font-size: 12px;
  }
`
