import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LogIntoAccountEventTag } from '../../../paywall/_children/fb-account-linking'
import { MsgRegister } from '../../_children/iconos'

const CallToActionFia = props => {
  const { mainColorBr } = props

  const [suscriptionId, setSuscriptionId] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSuscriptionId(window.Identity.userIdentity.uuid)
    }
  }, [])

  return (
    <CTAwrapper>
      {suscriptionId && (
        <LogIntoAccountEventTag subscriptionId={suscriptionId} />
      )}
      <MsgRegister bgcolor={mainColorBr} />
      <div className="paragraph">Haz iniciado sesión</div>
      <div className="paragraph">correctamente</div>
      <Button onClick={() => window.close()}>Volver a la nota</Button>
    </CTAwrapper>
  )
}

const CTAwrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #444444;
  padding: 45px;
  & .paragraph {
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    font-weight: bold;

    &:first-of-type {
      margin-top: 30px;
    }
  }
`

const Button = styled.button`
  height: 50px;
  background-color: #0179af;
  border-radius: 2px;
  width: 240px;
  color: #f4f4f4;
  text-transform: uppercase;
  font-weight: 700;
  margin: 30px 0 20px 0;
`

export default CallToActionFia
