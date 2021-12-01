import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/assets'
import { isStorageAvailable } from '../../../../../utilities/client/storage'
// import { SITE_TROME } from '../../../../../utilities/constants/sitenames'
import { useModalContext } from '../../../../subscriptions/_context/modal'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import Loading from '../../loading'

const FormIntroFreeTrome = ({ typeDialog, checkModal = (i) => i }) => {
  const {
    arcSite,
    contextPath,
    siteProperties: { activeRegisterwall },
  } = useAppContext() || {}
  const { changeTemplate } = useModalContext()
  const [showLoading, setShowLoading] = React.useState(true)

  const benefits = {
    trome: [
      // {
      //   benefit: `${getAssetsPath(arcSite,contextPath)}/resources/dist/${arcSite}/images/maquina-ganadora.png?d=1`,
      //   description: 'maquina-ganadora'
      // },
      {
        benefit: `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/beneficios-metro.png?d=1`,
        description: 'beneficios-metro',
      },
      {
        benefit: `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/la-fe-de-cuto.png?d=1`,
        description: 'la-fe-de-cuto',
      },
      {
        benefit: `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/cafe-noticias.png?d=1`,
        description: 'cafe-noticias',
      },
      {
        benefit: `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/extasiados.png?d=1`,
        description: 'extasiados',
      },
    ],
  }

  React.useEffect(() => {
    setShowLoading(false)
  }, [])

  return (
    <form className={`signwall-inside_forms-form ${typeDialog}`}>
      {showLoading ? (
        <Loading typeBg="premium" />
      ) : (
        <>
          <div className="signwall-inside_forms-cont-trome-register center">
            <h2 className="title-register">FORMA PARTE DEL</h2>
            <img
              className="header-img"
              src={`${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/logo-club-trome.png?d=1`}
              alt=""
            />
            <button
              type="button"
              className="button__continue"
              onClick={() => {
                // modificado para el taggeo de diario correo por valla
                Taggeo(
                  `Web_${typeDialog}_${
                    activeRegisterwall ? 'Registro' : 'Hard'
                  }`,
                  `web_${typeDialog}_boton_iniciar_continuar`
                )

                // agregado para el taggeo de diario correo por valla
                if (typeDialog === 'premium' && activeRegisterwall) {
                  Taggeo(
                    `Web_${typeDialog}_Registro`,
                    `web_${typeDialog}_boton_continuar`
                  )
                }

                // agregando el elemento en localstorage porque al darle verificar correo
                // abre otra pestaña y se pierde el sessionstorage
                if (isStorageAvailable('localStorage')) {
                  if (typeDialog === 'premium' && activeRegisterwall) {
                    window.localStorage.setItem(
                      'premium_last_url',
                      window.location.pathname ? window.location.pathname : ''
                    )
                  } else {
                    window.localStorage.setItem(
                      'premium_last_url',
                      window.document.referrer
                        ? window.document.referrer.split(
                            window.location.origin
                          )[1]
                        : ''
                    )
                  }
                }
                changeTemplate('register')
                checkModal()
              }}>
              REGÍSTRATE <span>GRATIS</span>
            </button>

            <p className="subtitle-register">Y ACCEDE A:</p>
            <div className="block-list">
              {arcSite
                ? benefits?.trome.map(({ benefit, description }) => (
                    <div key={description} className="block__benefits">
                      <img
                        className="block__benefits-img"
                        src={benefit}
                        alt={description}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </>
      )}
    </form>
  )
}

export default FormIntroFreeTrome
