import styled, { css } from 'styled-components'

export const Portal = styled.div`
  ${({ theme, backgroundColor }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${theme.breakpoints.up('md')} {
      background: url(${theme.images.backgroundx1});
    }

    ${theme.breakpoints.down('sm')} {
      background: ${backgroundColor ? theme.palette.lighten(theme.palette.secondary.main, 0.8) : theme.palette.lighten(theme.palette.primary.main, 0.9) };
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
  ${({ theme }) => css`
    padding: 12px;
    opacity: 0.8;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    ${theme.breakpoints.down('sm')} {
      margin-top: 0px;
      padding: 20px 10px;
    }
  `}
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
  top: -35%;
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
  ${({ theme, linkStyle }) => css`
    background: ${props => props.primary ? '#8f071e': '#444444'};
    margin-right: ${props => props.primary ? '40px': '0px'};
    cursor: pointer;
    color: #fff;
    min-width: 360px;
    height: 50px;
    border-radius: 4px;
    ${theme.breakpoints.down('sm')} {
      min-width: calc(50% - 40px);
      margin-right: 0px;
    }
    ${theme.breakpoints.down('xs')} {
      min-width: calc(100% - 40px);
      margin-right: 0px;
    }
    ${linkStyle &&
      css`
        font-size: 16px;
        padding: 20px 10px;
        flex-direction: column;
        align-items: flex-start;
      `}
  `}
`

export const SubscribedText = styled.div`
  padding: 20px;
  display: flex;
  flex: 1;
  align-items: center;
  max-height: 50px;
  justify-content: space-between;
  font-size: ${props => props.primary ? '20': '14'}px;
  line-height: 24px;
  width: 100%;
  box-sizing: border-box;
  & div{
    flex-direction: column;
    display: flex;
    & span:first-child {
      font-weight: 300;
    }
  }
`

export const LinkSubscribe = styled(LinkBase)`
  height: 70px;
  background-color: #0179af;
  color: #fff;
`
