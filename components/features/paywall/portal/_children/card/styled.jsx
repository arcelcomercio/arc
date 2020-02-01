import styled, { css } from 'styled-components'

export const Bullet = styled.div`
  display: flex;
  font-weight: 300;
  margin-bottom: 15px;
  font-size: 12px;
`

export const BulletIcon = styled.div`
  margin-right: 15px;
  padding: 5px 0px;
`

export const BulletText = styled.div`
  line-height: 1.83;
`

export const Card = styled.div`
  width: 360px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
  ${({ theme }) => css`
    ${theme.breakpoints.down('md')} {
      /* min-height: 400px;
      margin-bottom: 40px;
      width: calc(100% - 20px); */
      width: 320px;
      margin: 0 10px;
    }
    ${theme.breakpoints.down('sm')} {
      max-width: 450px;
      margin-bottom: 40px;
    }
  `}
`

export const HeadContent = styled.div`
  ${({ theme }) => css`
    & div:first-of-type {
      font-family: Open Sans;
      font-size: 20px;
      font-weight: 600;
      ${theme.breakpoints.down('md')} {
        font-size: 18px;
      }
    }
    & div:last-of-type {
      font-size: 15px;
      font-weight: normal;
    }
  `}
`

export const CardHead = styled.div`
  ${({ recommended }) => css`
    display: flex;
    justify-content: ${recommended ? 'flex-start' : 'center'};
    padding-left: ${recommended ? '25px' : '0'};
    align-items: center;
    height: 70px;
    background-color: #f4f4f4;
    z-index: 2;
    ${recommended
      ? css`
          position: relative;
          & ${HeadContent}: {
            padding: 40px 0;
          }
        `
      : ''}
  `}
`

export const CardHeadTail = styled.div`
  ${({ backgroundColor, theme }) => css`
    z-index: 1;
    height: 14px;
    width: 8px;
    background-color: ${theme.palette.darken(
      backgroundColor || theme.palette.primary.main,
      0.5
    )};
    transform: rotate(45deg);
    position: absolute;
    top: 48px;
    right: -4px;
  `}
`

export const CardHeadPromotion = styled.div`
  ${({ backgroundColor, theme }) => css`
    position: absolute;
    border-radius: 4px 0px 0px 4px;
    height: 40px;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
    background-color: ${backgroundColor || theme.palette.primary.main};
    transform: translate3d(-50%, -30%, 0);
    left: auto;
    right: -80px;
    top: 25px;
    z-index: 3;
    color: ${theme.palette.primary.contrastText};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 145px;
    font-weight: 700;
    letter-spacing: 1.68px;
  `}
`
export const LinkSubscribe = styled.a`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-decoration: none;
    font-weight: 700;
    border-radius: 0 0 5px 5px;
    height: 70px;
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.contrastText};
  `}
`

export const CardContent = styled.div`
  padding: 25px;
  flex: 1;
  padding: 10px 25px;
`

export const CardFooter = styled.div``

export const ContentPrice = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

export const Price = styled.div`
  font-weight: 700;
  font-size: 24px;
  justify-content: center;
  display: flex;
  align-items: flex-end;
`

export const Currency = styled.div`
  padding-bottom: 10px;
`

export const Amount = styled.div`
  font-size: 70px;
  padding: 10px;
  line-height: 1em;
`

export const Duration = styled.div`
  font-weight: 700;
`

export const Detail = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding: 5px 0;
  max-width: 100px;
`

export const Feature = styled.div``
