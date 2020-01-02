import styled from 'styled-components'
import { device } from '../../_styles/breakpoints'

export const PanelWrapper = styled.div`
  background: #eeeeee;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 50px);
  box-sizing: border-box;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ul,
  li,
  h1,
  h2,
  h3,
  h4,
  p,
  button {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0px;
  }

  button {
    border: 0;
    outline: 0;
  }
`

export const PanelContent = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 10px 0px 0px 0px;
  @media ${device.tablet} {
    padding: 20px 0px;
  }
  & .panel-left,
  & .panel-right {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  & .panel-left {
    width: 100%;
    @media ${device.tablet} {
      width: 30%;
    }
    @media ${device.desktop} {
      width: 22%;
    }
  }
  & .panel-right {
    width: 100%;
    @media ${device.tablet} {
      width: 70%;
    }
    @media ${device.desktop} {
      width: 78%;
    }
  }
`
