import styled, { keyframes, css } from 'styled-components'

export const Loading = styled.div`
  position: relative;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
  transition: opacity 200ms ease-in-out;
  ${({ fullscreen }) =>
    fullscreen &&
    css`
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      z-index: 1;
    `}
  ${({ spinning }) =>
    spinning &&
    css`
      opacity: 1;
      pointer-events: inherit;
    `};
`

const loadingCircle = keyframes`
  50% { transform: scale(1.2) }
  100% { transform: scale(1) }
`

export const WrapIcon = styled.div`
  min-width: 150px;
  display: flex;
  justify-content: space-between;
  svg:nth-child(1) {
    animation: ${loadingCircle} 700ms infinite linear;
  }
  svg:nth-child(2) {
    animation: ${loadingCircle} 700ms infinite linear;
    animation-delay: calc(350ms);
  }
  svg:nth-child(3) {
    animation: ${loadingCircle} 700ms infinite linear;
  }
`

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 100;
`
