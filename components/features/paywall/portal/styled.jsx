import styled, { css } from 'styled-components'

export const Portal = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${theme.breakpoints.up('md')} {
      background: url(${theme.images.backgroundx1});
    }
  `}
`

export const PortalContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    max-width: 1120px;
    margin-top: 40px;
    align-self: center;
    width: 100%;
    ${theme.breakpoints.down('sm')} {
      flex-direction: column;
      min-width: auto;
      align-items: center;
    }
  `}
`

export const Footer = styled.div`
  height: 90px;
  opacity: 0.8;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`

export const FooterContent = styled.div`
  display: flex;
  max-width: 1120px;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 100%;
  align-items: center;
`

export const ClickToCallWrapper = styled.div`
  position: absolute;
  top: -25%;
  right: 0;
`

const LinkBase = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-decoration: none;
  font-weight: 700;
  border-radius: 0 0 5px 5px;
`

export const LinkCorporate = styled(LinkBase)`
  ${({ theme }) => css`
    background: #444444;
    color: #fff;
    min-width: 360px;
    height: 50px;
    border-radius: 4px;
    ${theme.breakpoints.down('sm')} {
      min-width: calc(100% - 40px);
    }
  `}
`

export const LinkSubscribe = styled(LinkBase)`
  height: 70px;
  background-color: #0179af;
  color: #fff;
`
