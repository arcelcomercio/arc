import styled, { css } from 'styled-components'

import Picture from '../../../_children/picture'

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

export const Head = styled.div`
  ${({ theme, recommended }) => css`
    font-family: Judson;
    font-size: ${theme.name === 'elcomercio' ? '25' : '28'}px;
    font-weight: 700;
    padding-top: ${recommended
      ? theme.name === 'elcomercio'
        ? '50'
        : '46'
      : '40'}px;
    padding-bottom: 40px;
    text-align: center;
    ${theme.breakpoints.down('md')} {
      font-size: 26px;
    }
  `}
`

export const CardHead = styled.div`
  background-color: #f4f4f4;
  max-height: 90px;
  ${({ recommended }) =>
    recommended
      ? css`
          position: relative;
          & ${Head}: {
            padding: 40px 0 10px;
          }
        `
      : ''}
`

export const CardHeadPromotion = styled.div`
  ${({ backgroundColor, theme }) => css`
    position: absolute;
    border-radius: 0 0 4px 4px;
    height: 40px;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
    background-color: ${backgroundColor || theme.palette.primary.main};
    transform: translate3d(-50%, -30%, 0);
    top: ${theme.name === 'elcomercio' ? '-2px' : '0px'};
    left: 40%;
    width: 222px;
    color: ${theme.palette.primary.contrastText};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    letter-spacing: 1.68px;
  `}
`

export const CyberdayBadge = styled(Picture)`
  position: absolute;
  top: -23px;
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
