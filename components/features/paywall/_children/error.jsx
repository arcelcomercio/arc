import React from 'react'
import styled from 'styled-components'

const WrapError = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  display: flex;
  border-radius: 4px;
  background-color: rgba(219, 0, 0, 0.1);
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

const Error = styled(({ message, children, className }) => {
  return (
    <WrapError className={className}>
      <ErrorMessage>{message || children}</ErrorMessage>
    </WrapError>
  )
})`
  margin-bottom: ${props => props.marginBottom || props.mb};
`

export default Error
