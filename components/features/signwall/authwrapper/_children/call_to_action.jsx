import React from 'react'
import styled from 'styled-components'

const CallToActionFia = ({ message }) => {
  return (
    <CTAwrapper>
      {message}
      <Button onClick={ ()=> window.close()}>
          Volver a su nota
      </Button>
    </CTAwrapper>
  )
}

const CTAwrapper = styled.div`
  background-color: #f5f5f5;
  color: #040404;
  padding: 20px;
`
const Button = styled.button`
    padding: 8px 12px;
    background-color: #363636;
    color: #f4f4f4;
`

export default CallToActionFia
