import styled, { css } from 'styled-components'

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: absolute;
`

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 1;
  will-change: opacity;
  transition: opacity 200ms ease-in-out;
  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      pointer-events: inherit;
    `};
`

export const Content = styled.div`
  position: absolute;
`
