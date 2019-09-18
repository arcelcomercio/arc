import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

export const WrapperMenu = styled.div`
  background: transparent;
  position: relative;
  padding: 10px 20px 0px 20px;
  margin-top: -80px;
  @media ${device.tablet} {
    border-radius: 4px;
    box-shadow: 0 0 0.3rem #dadada;
    background: white;
    padding: 80px 20px 20px 20px;
    margin-top: -60px;
  }
  @media ${device.desktop} {
    padding: 80px 40px 20px 40px;
  }
  & .hello {
    color: #000000;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  & .welcome {
    color: #000000;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  & .cont-menu {
    position: relative;
    overflow: hidden;
    @media ${device.mobile} {
      background: #fbfbfb;
      margin-left: -20px;
      margin-right: -20px;
      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 1em;
        height: 100%;
        top: 0;
        z-index: 3;
      }
      &:before {
        left: 0;
        background: linear-gradient(
          to right,
          #bbbbbb 5%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      &:after {
        right: 0;
        background: linear-gradient(
          to left,
          #bbbbbb 5%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      & > ul {
        overflow-x: scroll;
        white-space: nowrap;
      }
    }

    & > ul > li {
      display: inline-block;
      vertical-align: top;
      padding: 16px 15px;
      border-top: 1px solid #e8e8e8;
      @media ${device.mobile} {
        &:first-child {
          padding-left: 40px;
        }
        &:last-child {
          padding-right: 40px;
        }
      }

      @media ${device.tablet} {
        padding: 16px 0px;
        display: block;
      }
    }
    & > ul > li > a {
      color: #0179af;
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
    }
    & .close-sesion {
      color: #bbbbbb;
      font-weight: normal;
      font-size: 12px;
    }
  }
`

export const WrapperAvatar = styled.div`
  border-radius: 50%;
  position: relative;
  border: 5px solid #f4e0d2;
  z-index: 1;
  max-width: 90px;
  min-height: 90px;
  width: 100%;
  line-height: 0px;
  margin: 0% 0% 0% 70%;
  background: #cccccc;
  @media ${device.tablet} {
    max-width: 120px;
    min-height: 120px;
    border: 10px solid #f4e0d2;
    margin: 0 auto;
  }
  @media ${device.desktop} {
    max-width: 160px;
    min-height: 160px;
    border: 10px solid #f4e0d2;
    margin: 0 auto;
  }
  & > img {
    width: 100%;
    border-radius: 50%;
  }
`
