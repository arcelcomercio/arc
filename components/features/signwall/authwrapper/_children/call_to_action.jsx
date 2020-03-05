/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LogIntoAccountEventTag } from '../../../paywall/_children/fb-account-linking'
import { MsgRegister } from '../../_children/iconos'
import Loading from '../../_children/loading'
import Taggeo from '../../_dependencies/taggeo'

const CallToActionFia = props => {
  const { mainColorBr, logoutSession, arcSite, typeDialog, urlPlan } = props

  const [suscriptionId, setSuscriptionId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusSubs, setStatusSubs] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSuscriptionId(window.Identity.userIdentity.uuid)
    }
  }, [])

  const handleSuscription = () => {
    window.sessionStorage.setItem('paywall_type_modal', 'fia')
    window.location.href = urlPlan
  }

  return (
    <CTAwrapper>
      {suscriptionId && (
        <LogIntoAccountEventTag
          subscriptionId={suscriptionId}
          onBeforeSend={res => {
            setLoading(false)
            setStatusSubs(res.isSubscriber)
          }}
        />
      )}

      {loading ? (
        <Loading arcSite={arcSite} typeBg="wait" />
      ) : (
        <>
          <MsgRegister bgcolor={mainColorBr} />
          <div className="paragraph">Haz iniciado sesión</div>
          <div className="paragraph">correctamente</div>

          {!statusSubs && (
            <Button
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_boton_ver_planes`
                )
                handleSuscription()
              }}>
              Ver Planes
            </Button>
          )}

          <Link
            href="#"
            onClick={e => {
              e.preventDefault()
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_cerrar_sesion`
              )
              logoutSession()
            }}>
            Cerrar sesión
          </Link>
        </>
      )}
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
  background: #ffffff;
  padding: 45px;
  min-height: 320px;
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

const Link = styled.a`
  font-size: 12px;
  color: gray;
  margin-top: 20px;
`

export default CallToActionFia
