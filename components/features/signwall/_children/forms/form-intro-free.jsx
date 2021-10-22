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
        Icon: (
          <svg viewBox="0 0 48 48">
            <path
              d="M24.08 7h12.06a5.59 5.59 0 0 1 1.46.2 3.64 3.64 0 0 1 2.57 3.36V31a3.76 3.76 0 0 1-3.65 3.87h-2.59a.41.41 0 0 0-.43.27 10.28 10.28 0 0 1-7.5 5.67 10.4 10.4 0 0 1-11.3-5.67.43.43 0 0 0-.45-.29c-1 0-2 0-3-.05a3.61 3.61 0 0 1-3.23-3.19A4 4 0 0 1 8 31V10.87a3.68 3.68 0 0 1 1.92-3.38A4.27 4.27 0 0 1 12 7zm14 6.46H10.16v17.4a2.9 2.9 0 0 0 0 .51 1.4 1.4 0 0 0 1.23 1.35c.8.07 1.62 0 2.47 0a10.58 10.58 0 0 1 .55-6A10.26 10.26 0 0 1 18.26 22a10.47 10.47 0 0 1 16.1 10.78 24 24 0 0 0 2.4 0A1.38 1.38 0 0 0 38 31.59a2.7 2.7 0 0 0 .07-.69v-17a3.54 3.54 0 0 0 0-.45zm-16.82 15a12.65 12.65 0 0 0 0 4.34h5.62c.07 0 .19-.14.2-.22l.11-3.17a5.88 5.88 0 0 0-.1-.94zm7.94 0v4.34H32c.06 0 .16-.11.18-.19l.22-1.37a7.66 7.66 0 0 0-.27-2.78zM19 32.78v-4.36h-2.82c-.07 0-.17.15-.2.24a8.25 8.25 0 0 0 0 3.89.25.25 0 0 0 .29.23H19zm7.52 2.13h-4.9v.19a15.53 15.53 0 0 0 1.27 3c.5.9.5.91 1.54.86a.42.42 0 0 0 .27-.14 15.24 15.24 0 0 0 1.8-3.91zm0-8.61a2.62 2.62 0 0 0-.09-.33 14.42 14.42 0 0 0-1.3-3c-.44-.78-.44-.78-1.33-.74a.49.49 0 0 0-.44.26 15.75 15.75 0 0 0-1.57 3.32l-.16.51zm.94 11.93a8.3 8.3 0 0 0 3.79-3.36h-2.53zM20.67 23a8.35 8.35 0 0 0-3.75 3.33h2.51zm10.63 3.34A8.34 8.34 0 0 0 27.59 23v.08l1.09 3.08a.23.23 0 0 0 .28.18h2.34zM17 34.86a7.46 7.46 0 0 0 3.54 3.21l-1-3.07a.25.25 0 0 0-.2-.13zm14.64-23.42a1.23 1.23 0 1 0-1.23-1.23h0a1.21 1.21 0 0 0 1.19 1.22h0zM27.38 9a1.23 1.23 0 1 0 1.23 1.22h0A1.21 1.21 0 0 0 27.42 9zm8.54 2.46a1.23 1.23 0 0 0 0-2.46 1.22 1.22 0 0 0-1.22 1.2h0a1.2 1.2 0 0 0 1.18 1.22h0z"
              fill="#ed1c24"
              stroke="#fff"
              strokeWidth=".2"
            />
          </svg>
        ),
        description:
          'Navegación ilimitada a diariocorreo.pe desde cualquier dispositivo',
      },
      {
        Icon: (
          <svg
            viewBox="0 0 48 48"
            fill="#ed1c24"
            stroke="#ed1c24"
            strokeWidth=".2">
            <path d="M23.66 6a12.66 12.66 0 0 0-10.77 19.31L22.94 41.5a1.05 1.05 0 0 0 .9.5h0a1 1 0 0 0 .89-.51l9.8-16.35A12.67 12.67 0 0 0 23.66 6zm9.06 18.06l-8.9 14.86-9.14-14.72a10.56 10.56 0 1 1 18-.14zm-9.06-11.73A6.33 6.33 0 1 0 30 18.66a6.32 6.32 0 0 0-6.34-6.33zm0 10.56a4.24 4.24 0 1 1 4.22-4.24h0a4.24 4.24 0 0 1-4.22 4.23z" />
          </svg>
        ),
        description: 'Noticias exclusivas',
      },
      {
        Icon: (
          <svg viewBox="0 0 48 48" fill="#ed1c24">
            <path d="M25.47 39H12.41A3.28 3.28 0 0 1 9 36.47L5.14 23.3a2.76 2.76 0 0 1 1.71-3.51l.23-.07 6.12-1.85a.39.39 0 0 0 .34-.44h0q0-2.84 0-5.67a2.62 2.62 0 0 1 2-2.65 3.72 3.72 0 0 1 .81-.11h15.58a3.48 3.48 0 0 1 2.58 1.07l6.55 6.57a3.38 3.38 0 0 1 1 2.48v16.53a3.23 3.23 0 0 1-2.6 3.27 4 4 0 0 1-.91.08zm-10.21-1.89h23.42a1.39 1.39 0 0 0 1.52-1.24 1.41 1.41 0 0 0 0-.29V19H35a2.73 2.73 0 0 1-2.92-2.54v-.37-4.82-.38H16.46c-.8 0-1 .23-1 1v23.37l-.2 1.85zm-1.72-17.36l-.31.08-5.54 1.69c-.73.22-.93.58-.72 1.3L9.67 32l1.19 4a1.37 1.37 0 0 0 2.69-.45V20v-.29zM34 12.33v4a.8.8 0 0 0 .85.75h3.76.15zm-10.08 1.76h3.56a2.09 2.09 0 0 1 2.18 2 1.27 1.27 0 0 1 0 .2v2.3a2.09 2.09 0 0 1-2 2.19h-7.32a2.08 2.08 0 0 1-2.16-2 .67.67 0 0 1 0-.2V16.2a2 2 0 0 1 2-2.11h3.74zm0 1.89h-3.5c-.26 0-.36.08-.35.35v2.2c0 .27.1.35.35.35h7c.27 0 .38-.1.37-.37v-2.15c0-.28-.08-.38-.38-.38h-3.49zm-1.79 11.43h1.67a2.17 2.17 0 0 1 2.2 2.11v.05q0 1.18 0 2.37a2.17 2.17 0 0 1-2.18 2.16H20.4a2.17 2.17 0 0 1-2.22-2.1v-.09-2.27a2.16 2.16 0 0 1 2.13-2.21h1.82zm0 4.8h1.61c.29 0 .43-.11.43-.4v-2.08c0-.29-.13-.42-.42-.42h-3.26c-.29 0-.43.1-.43.41v2.08c0 .3.12.42.42.41zm5.61-8.96h8.51a.94.94 0 0 1 1 .85 1 1 0 0 1-.85 1H19.25a1 1 0 0 1-1.07-.81.93.93 0 0 1 .82-1.03.61.61 0 0 1 .19 0h8.58zM32.67 32h3.56a1 1 0 1 1 .21 1.89h-7.39a.95.95 0 1 1-.17-1.89h3.79zm-.04-2.51h-3.56a1 1 0 0 1-.21-1.89h7.38a1 1 0 0 1 1 .85.94.94 0 0 1-.84 1 .6.6 0 0 1-.19 0l-3.58.04z" />
          </svg>
        ),
        description: 'Boletín Correo Hoy',
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
                  ? classes[arcSite].map(({ Icon, description }) => (
                      <div key={description} className="block__benefits">
                        <div style={{ width: '20%' }}>
                          <Icon />
                        </div>
                        <div style={{ width: '80%' }}>
                          <p className="block__benefits-description">
                            {description}
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
