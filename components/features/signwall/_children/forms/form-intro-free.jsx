import Identity from '@arc-publishing/sdk-identity'
// import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

// import Markdown from 'react-markdown/with-html'
import { getAssetsPath } from '../../../../utilities/assets'
import { useModalContext } from '../../../subscriptions/_context/modal'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import Loading from '../loading'

const FormIntroFree = ({ typeDialog, checkModal = (i) => i }) => {
  const {
    arcSite,
    contextPath,
    siteProperties: {
      signwall: { mainLogo, mainColorBtn },
      activeRegisterwall,
    },
  } = useAppContext() || {}
  const { changeTemplate } = useModalContext()
  const [showLoading, setShowLoading] = React.useState(true)

  const classes = {
    diariocorreo: [
      {
        imagen:
          'https://cdn.shopify.com/s/files/1/0449/4229/5199/files/Incono_1_correo.png',
        descripcion:
          'Navegación ilimitada a diariocorreo.pe desde cualquier dispositivo',
      },
      {
        imagen:
          'https://cdn.shopify.com/s/files/1/0449/4229/5199/files/Icono_2_correo.png',
        descripcion: 'Noticias exclusivas',
      },
      {
        imagen:
          'https://cdn.shopify.com/s/files/1/0449/4229/5199/files/Icono_3.png',
        descripcion: 'Boletín Correo Hoy',
      },
    ],
  }

  React.useEffect(() => {
    setShowLoading(false)
    if (Identity.userProfile || Identity.userIdentity.uuid) {
      // setShowPaywallBtn(true)
    }
  }, [])

  return (
    <>
      <form className={`signwall-inside_forms-form ${typeDialog}`}>
        {showLoading ? (
          <Loading typeBg="premium" />
        ) : (
          <>
            <div className="signwall-inside_forms-cont-correo-register center">
              <img
                alt={`Logo ${arcSite}`}
                className="logo-correo"
                src={`${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
              />
              <h2 className="title-register">Regístrate gratis</h2>
              <p className="subtitle-register">para acceder a:</p>
              <div className="block-list">
                {arcSite
                  ? classes[arcSite].map((beneficio) => (
                      <div key={beneficio} className="block__benefits">
                        <div style={{ width: '20%' }}>
                          <img
                            src={beneficio.imagen}
                            alt={beneficio.imagen}
                            className="block__benefits-img"
                          />
                        </div>
                        <div style={{ width: '80%' }}>
                          <p className="block__benefits-description">
                            {beneficio.descripcion}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <button
                type="button"
                className="signwall-inside_forms-btn button__continue"
                style={{
                  backgroundColor: mainColorBtn,
                }}
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

                  if (typeDialog === 'premium') {
                    window.sessionStorage.setItem(
                      'paywall_last_url',
                      window.location.pathname ? window.location.pathname : ''
                    )
                  } else {
                    window.sessionStorage.setItem(
                      'paywall_last_url',
                      window.document.referrer
                        ? window.document.referrer.split(
                            window.location.origin
                          )[1]
                        : ''
                    )
                  }
                  changeTemplate('register')
                  checkModal()
                }}>
                INGRESAR
              </button>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default FormIntroFree
