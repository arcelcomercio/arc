import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LogIntoAccountEventTag } from '../../../paywall/_children/fb-signed-pixel'
import { MsgRegister } from '../../_children/iconos'
import Services from '../../_dependencies/services'

const CallToActionFia = props => {
  const { arcSite, mainColorBr } = props

  const [suscriptionId, setSuscriptionId] = useState(null)
  const [listSubs, setListSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSuscriptionId(window.Identity.userIdentity.uuid)
      Services.getEntitlement(
        window.Identity.userIdentity.accessToken,
        arcSite
      ).then(res => {
        if (res.skus) {
          const result = Object.keys(res.skus).map(key => {
            return res.skus[key].sku
          })
          setListSubs(result)
          setLoading(false)
        }
      })
    }
  }, [])

  return (
    <CTAwrapper>
      {suscriptionId && !loading && (
        <LogIntoAccountEventTag
          subscriptionId={suscriptionId}
          isSubscriber={listSubs.length >= 1}
        />
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
