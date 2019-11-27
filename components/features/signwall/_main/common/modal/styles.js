import styled from 'styled-components'
import { device } from '../../../_styles/breakpoints'

// eslint-disable-next-line import/prefer-default-export
export const WrapperModal = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999999;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  overflow-y: auto;
  transition: opacity 0.25s;
  font-size: 16px;
  will-change: transform;
  animation: vDialog-enter 0.5s;
  /* reset */
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
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
  p{
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0px;
  }
  /* reset */
  &.white {
    background-color: rgba(233, 233, 233, 0.8);
  }
  &.open {
    overflow: hidden;
  }
  @keyframes vDialog-enter {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

export const DialogModal = styled.div`
  display: block;
  position: relative;
  pointer-events: auto;
  background: #fff;
  z-index: 0;
  align-self: flex-start;
  border-radius: 8px;
  box-shadow: 0rem 0rem 0.5rem #949494;

  &.position-middle {
    max-height: 100%;
    overflow-y: auto;
    align-self: center;
  }

  &.position-fit {
    width: 100%;
  }

  &.size-mini {
    width: 80%;
    height: auto;
    padding: 20px;
    @media ${device.tablet} {
      width: 60%;
      height: auto;
    }

    @media ${device.desktop} {
      max-width: 380px;
      width: 50%;
    }
  }

  &.size-small {
    width: 100%;
    height: 100%;
    padding: 0px;
    @media ${device.tablet} {
      width: 90%;
      height: auto;
    }

    @media ${device.desktop} {
      max-width: 480px;
      width: 60%;
    }
  }

  &.size-medium {
    width: 100%;
    height: 500px;

    @media ${device.tablet} {
      width: 600px;
    }

    @media ${device.desktop} {
      width: 864px;
    }
  }

  &.size-large {
    width: 100%;
    height: 100%;
    
    @media ${device.tablet} {
      width: 90%;
      height: 540px;
    }

    @media ${device.desktop} {
      max-width: 1000px;
      height: 540px;
    }
  }

  &.size-full {
    width: 100%;
    height: 100%;
  }
`
