import styled, { css } from 'styled-components'
import _Icon from '../_children/icon'

export const Foot = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.terciary.main};
    color: ${theme.palette.terciary.contrastText};
    padding: 30px;
    margin-top: 30px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 1024px), (max-height: 780px) {
      position: relative;
    }
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    max-width: 1120px;
    margin: 0 auto;
    ${theme.breakpoints.down('md')} {
      grid-template-columns: 2fr 2fr;
    }
    ${theme.breakpoints.only('sm')} {
      grid-template-columns: 2fr 2fr;
    }
    ${theme.breakpoints.down('xs')} {
      grid-template-columns: 1fr;
    }
  `}
`

export const Icon = styled(_Icon)`
  max-height: 30px;
  display: block;
`

export const List = styled.div`
  ${({ theme }) => css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    & li {
      width: 50%;
    }
    ${theme.breakpoints.down('xs')} {
      width: 100%;
    }
  `}
`

export const Link = styled.a`
  ${({ theme }) => css`
    color: ${theme.palette.terciary.contrastText};
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    padding: 5px 0;
    margin: 5px 0;
  `}
`

export const ImageLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.palette.terciary.contrastText};
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    margin: 10px 0;
    padding: 0;
    ${theme.breakpoints.down('md')} {
      margin: 0 15px;
    }
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    line-height: 20px;
    margin: 20px 0 0;
    & a {
      font-weight: 600;
      text-decoration: none;
      color: ${theme.palette.terciary.contrastText};
    }
  `}
`

export const SubTitle = styled.div`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: 400;
    margin: 0 0 15px;
    ${theme.breakpoints.down('xs')} {
      text-align: center;
    }
  `}
`

export const SocialContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  & a {
    font-size: 24px;
    margin: 0 15px;
  }
  & svg {
    display: block;
  }
`

export const CenterContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${theme.breakpoints.down('md')} {
      flex-direction: row;
    }
  `}
`
