import Identity from '@arc-publishing/sdk-identity'
// import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

// import Markdown from 'react-markdown/with-html'
import { useModalContext } from '../../../subscriptions/_context/modal'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import Loading from '../loading'

const FormIntroFree = ({ typeDialog, checkModal = (i) => i }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBtn },
      activeRegisterwall,
    },
  } = useAppContext() || {}
  const { changeTemplate } = useModalContext()
  const [showLoading, setShowLoading] = React.useState(true)

  React.useEffect(() => {
    setShowLoading(false)
    if (Identity.userProfile || Identity.userIdentity.uuid) {
      // setShowPaywallBtn(true)
    }
  }, [])

  return (
    <form className={`signwall-inside_forms-form ${typeDialog}`}>
      {showLoading ? (
        <Loading typeBg="premium" />
      ) : (
        <>
          <div className="signwall-inside_forms-cont-register center">
            <p className="text-info">Además accede al</p>
            <p className="text-boletin">Boletín de noticias</p>
            <hr className="barra" />
            <p className="text-news" style={{ color: mainColorBtn }}>
              CORREO HOY
            </p>
            <hr className="barra" />
            <button
              type="button"
              className="signwall-inside_forms-btn"
              style={{
                fontSize: '18px',
                backgroundColor: mainColorBtn,
                width: '90%',
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

          <p
            style={{
              fontSize: typeDialog === 'premium' ? '12px' : '15px',
            }}
            className="signwall-inside_forms-text mt-20 mb-10 center">
            {/* {printAttributes.map((item) => (
              <React.Fragment key={item.name}>
                {item.name === 'subscriber_title_popup' && item.value}
              </React.Fragment>
            ))} */}
          </p>

          <p
            style={{ fontSize: typeDialog === 'premium' ? '12px' : '15px' }}
            className={`signwall-inside_forms-text center note-premium ${
              arcSite === 'elcomercio' ? 'mb-10' : ''
            }`}>
            {/* {printAttributes.map(
              (item) =>
                item.name === 'subscriber_detail_popup' && (
                  <React.Fragment key={item.name}>
                    <Markdown
                      source={item.value}
                      escapeHtml={false}
                      unwrapDisallowed
                      disallowedTypes={['paragraph']}
                    />
                  </React.Fragment>
                )
            )} */}
          </p>
        </>
      )}
    </form>
  )
}

export default FormIntroFree
