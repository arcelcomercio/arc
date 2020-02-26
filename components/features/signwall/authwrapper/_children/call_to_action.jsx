import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LogIntoAccountEventTag } from '../../../paywall/_children/fb-signed-pixel'
import CheckImage from '../../_children/checkimg'
import Services from '../../_dependencies/services'

const CallToActionFia = props => {
  const { arcSite } = props
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
      <CheckImage />
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
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #444444;
  padding: 45px;
  & .paragraph {
    font-size: 14px;
    text-align: center;

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
