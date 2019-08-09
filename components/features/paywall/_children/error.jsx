import React, { useState } from 'react'
import styled from 'styled-components'

const WrapError = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  display: flex;
  border-radius: 4px;
  background-color: rgba(219, 0, 0, 0.1);
  will-change: opacity;
  transition: opacity 300ms ease-out;
  &.hidden {
    opacity: 0;
  }
`

const ErrorMessage = styled.span`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  text-align: center;
  line-height: 22px;
  letter-spacing: normal;
  color: #db0000;
`

function ErrorComponent({ message, children, className, autoClose }) {
  const [classhide, setClassHidde] = useState('')

  if (autoClose && autoClose > 0) {
    setTimeout(() => {
      setClassHidde(' hidden')
    }, autoClose)
  }

  return (
    <WrapError className={`${className}${classhide}`}>
      <ErrorMessage>{message || children}</ErrorMessage>
    </WrapError>
  )
}

const Error = styled(ErrorComponent)`
  margin-bottom: ${props => props.marginBottom || props.mb};
`

export default Error
