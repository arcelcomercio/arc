/* eslint-disable jsx-a11y/anchor-is-valid */

import * as React from 'react'

import { LogIntoAccountEventTag } from '../../_children/fb-account-linking'
import { MsgRegister } from '../../_dependencies/Icons'
import { deleteQuery } from '../../_dependencies/QueryString'
import { Taggeo } from '../../_dependencies/Taggeo'
import Loading from '../../_layouts/loading'

const styles = {
  title: 'step__left-title',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  backLogin: 'step__left-link-register',
  center: 'step__left-align-center',
}

const CallToActionFia = (props) => {
  const { mainColorBr, logoutSession, arcSite, typeDialog, urlPlan } = props
  const [suscriptionId, setSuscriptionId] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [statusSubs, setStatusSubs] = React.useState(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSuscriptionId(window.Identity.userIdentity.uuid)
    }
  }, [])

  const handleSuscription = () => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_boton_ver_planes`
    )
    window.sessionStorage.setItem('paywall_type_modal', 'fia')
    window.location.href = urlPlan
  }

  return (
    <div className={styles.center}>
      {suscriptionId && (
        <LogIntoAccountEventTag
          subscriptionId={suscriptionId}
          onBeforeSend={(res) => {
            setStatusSubs((res && res.isSubscriber) || false)
            setLoading(false)
            deleteQuery('signFia')
            deleteQuery('dataTreatment')
          }}
        />
      )}

      {loading ? (
        <Loading arcSite={arcSite} typeBg="wait" />
      ) : (
        <>
          <MsgRegister bgcolor={mainColorBr} />

          <h2 className={styles.title} style={{ marginTop: '20px' }}>
            Haz iniciado sesión
            <br />
            correctamente
          </h2>

          {!statusSubs && (
            <div className={styles.block}>
              <button
                className={styles.btn}
                type="button"
                onClick={handleSuscription}>
                Ver Planes
              </button>
            </div>
          )}

          <p className={styles.backLogin}>
            <button
              className={styles.link}
              type="button"
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_cerrar_sesion`
                )
                logoutSession()
              }}>
              Cerrar sesión
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default CallToActionFia
