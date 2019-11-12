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
      background: ${backgroundColor
        ? theme.palette.lighten(theme.palette.secondary.main, 0.8)
        : theme.palette.lighten(theme.palette.primary.main, 0.9)};
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

export const Review = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding-top: 25px;
    padding-bottom: 40px;
    align-content: right;
    flex-direction: column;
    width: 100%;
    background: url(${theme.images.backgroundReview});
    background-position-x: center;
    background-position-y: bottom;
    background-size: cover;
    ${theme.breakpoints.down('xs')} {
      padding-bottom: 0px;
    }
  `}
`

export const ReviewComment = styled.div`
  display: flex;
  align-self: center;
  max-width: 930px;
  margin: 0px 40px;
  flex-direction: column;
  font-family: Open Sans;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.84;
  letter-spacing: 2.25px;
  text-align: center;
  color: #ffffff;
`

export const Comment = styled.div`
  ${({ theme }) => css`
    font-family: Open Sans;
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.84;
    letter-spacing: 2.25px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 10px;
    ${theme.breakpoints.down('xs')} {
      font-size: 19px;
      line-height: 1.64;
    }
  `}
`

export const ReviewCaption = styled.div`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 1.28px;
    text-align: right;
    color: #ffffff;
    ${theme.breakpoints.down('xs')} {
      font-size: 12px;
      line-height: 1.64;
    }
  `}
`

export const ReviewVideo = styled.video`
  ${({ theme }) => css`
    align-self: center;
    width: 600px;
    margin-top: 40px;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
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
    background: #444444;
    color: #fff;
    min-width: 360px;
    height: 50px;
    border-radius: 4px;
    ${theme.breakpoints.down('sm')} {
      min-width: calc(50% - 40px);
    }
    ${theme.breakpoints.down('xs')} {
      min-width: calc(100% - 40px);
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
  font-size: 14px;
  line-height: 24px;
  width: 100%;
  box-sizing: border-box;
  & div {
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
