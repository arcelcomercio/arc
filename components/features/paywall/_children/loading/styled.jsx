import styled, { keyframes } from 'styled-components'

const Loading = styled.div`
  position: relative;
`

const loadingCircle = keyframes`
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
`

const WrapIcon = styled.div`
  animation: ${loadingCircle} 1s infinite linear;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`

export { Loading, Background, WrapIcon }
