import styled, { css } from 'styled-components'

export const Subscribed = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: ${props => (props.left ? '60%' : '40%')};
    margin-left: ${props => (props.right ? '20px' : '0px')};
    max-width: 930px;
    color: #fff;
    cursor: pointer;
    margin-top: 30px;
    align-items: flex-end;
    position: relative;
    ${theme.breakpoints.only('sm')} {
      width: 50%;
    }
    ${theme.breakpoints.down('xs')} {
      width: calc(100% - 40px);
      margin-top: 40px;
      margin-left: 0px;
    }
  `}
`

export const SubscribedText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.16);
  line-height: 1.44;
`

export const SubscribedContent = styled.div`
  ${({ theme }) => css`
    padding: 25px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    max-height: 50px;
    background: ${props => (props.red ? '#d64445' : '#444444')};
    font-size: 16px;
    ${theme.breakpoints.only('sm')} {
      padding: 40px 25px;
    }
    ${theme.breakpoints.down('xs')} {
      padding: 18px 20px;
      max-height: 100px;
      box-sizing: content-box;
      border-radius: 4px;
      font-size: 16px;
    }
  `}
`
export const Small = styled.span`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: 300;
    line-height: 1.86;
    ${theme.breakpoints.down('xs')} {
      font-size: 12px;
    }
  `}
`
export const Picture = styled.picture`
  display: flex;
`

export const Img = styled.img`
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      display: none;
    }
  `}
`

export const Shadow = styled.div`
  width: 100%;
  left: 0;
  position: absolute;
  height: 50px;
  z-index: -2;
  background-color: #000;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`
