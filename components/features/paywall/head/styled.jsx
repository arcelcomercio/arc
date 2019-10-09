import styled, { css } from 'styled-components'

const Head = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Content = styled.div`
  ${({ backgroundColor, theme }) => css`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    max-width: 1120px;
    height: 100%;
    background-color: ${backgroundColor || theme.palette.primary.main};
  `}
`

const WrapLogin = styled.div`
  ${({ backgroundColor, theme }) => css`
    background-color: ${backgroundColor || theme.palette.terciary.main};
    height: 100%;
    color: #fff;
    align-items: center;
    display: flex;
    max-width: 300px;
    width: 100%;
    justify-content: center;
    ${theme.breakpoints.down('xs')} {
      max-width: 150px;
    }
  `}
`

const LoginButton = styled.button`
  background: none;
  color: white;
  border: 0px;
  padding: 10px;
  text-decoration: underline;
  cursor: pointer;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Username = styled.span`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  text-transform: capitalize;
  & span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: bold;
  }
`

const Background = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
`

const Left = styled.div`
  ${({ backgroundColor, theme }) => css`
    flex: 1;
    background-color: ${backgroundColor || theme.palette.primary.main};
  `}
`

const Right = styled.div`
  ${({ backgroundColor, theme }) => css`
    flex: 1;
    background-color: ${backgroundColor || theme.palette.terciary.main};
  `}
`
const Img = styled.img`
  ${({ theme }) => css`
    max-height: 30px;
    margin: 0 20px;
    ${theme.breakpoints.down('xs')} {
      max-height: 26px;
    }
  `}
`

const WrapIcon = styled.span`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WrapLogo = styled.span`
  ${({ theme }) => css`
    display: inline-grid;
    ${theme.breakpoints.down('xs')} {
      margin-left: 20px;
      width: 150px;
      overflow: hidden;
    }
  `}
`

export {
  Head,
  Content,
  WrapLogin,
  WrapLogo,
  WrapIcon,
  LoginButton,
  Username,
  Background,
  Left,
  Right,
  Img,
}
