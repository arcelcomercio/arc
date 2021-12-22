import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/assets'
import { SITE_GESTION } from '../../../../../utilities/constants/sitenames'
import { deleteQuery, getQuery } from '../../../../../utilities/parse/queries'
import {
  ModalProvider,
  useModalContext,
} from '../../../../subscriptions/_context/modal'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import FormForgot from '../../../_children/forms/form_forgot'
import FormIntro from '../../../_children/forms/form_intro'
import FormLogin from '../../../_children/forms/form_login'
import FormRegister from '../../../_children/forms/form_register'
import { Close } from '../../../_children/icons'
import { Modal } from '../../../_children/modal/index'

const renderTemplate = (template, valTemplate, attributes) => {
  const templates = {
    intro: <FormIntro {...attributes} />,
    login: <FormLogin {...{ valTemplate, attributes }} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }

  if (getQuery('signPaywall')) {
    setTimeout(() => {
      deleteQuery('signPaywall')
      deleteQuery('dataTreatment')
    }, 2000)
    return templates.login
  }

  return templates[template] || templates.intro
}

export const PaywallInt = ({ properties }) => {
  const { onClose, typeDialog } = properties
  const {
    arcSite,
    contextPath,
    siteProperties: {
      signwall: { primaryFont },
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = useModalContext()

  // const handleLeavePage = (event) => {
  //   event.preventDefault()
  //   Taggeo(`Web_${typeDialog}_Hard`, `web_${typeDialog}_leave`)
  // }

  React.useEffect(() => {
    Taggeo(`Web_${typeDialog}_Hard`, `web_${typeDialog}_open`)
    // addEventListener('beforeunload', handleLeavePage)
    return () => {
      // removeEventListener('beforeunload', handleLeavePage)
    }
  }, [])

  const removeBefore = () => {
    // removeEventListener('beforeunload', handleLeavePage)
  }

  return (
    <Modal size="medium-large" position="middle">
      <div className="signwall-inside_body-container paywall">
        <button
          type="button"
          className="signwall-inside_body-close paywall"
          onClick={() => {
            Taggeo(`Web_${typeDialog}_Hard`, `web_${typeDialog}_cerrar`)
            if (typeDialog === 'paywall') {
              if (document.getElementById('btn-premium-continue')) {
                onClose()
              } else {
                window.location.href = `/?signwallPaywall=1&ref=${window.location.pathname}`
              }
            }
          }}>
          <Close />
        </button>
        <div
          className="signwall-inside_body-left paywall"
          style={{
            background: `${arcSite === SITE_GESTION ? '#8f071f' : '#232323'}`,
          }}>
          <img
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/paywall_bg.jpg?d=1`}
            alt={`Ejemplo de usuario suscriptor de ${arcSite}`}
            className="signwall-inside_body-left__bg"
          />
          <div className="signwall-inside_body-cont paywall">
            <p>
              {typeDialog === 'paywall'
                ? 'Has alcanzado el límite de noticias.'
                : 'Para acceder a este contenido'}
              <br />
              {typeDialog === 'paywall'
                ? 'Para continuar leyendo, adquiere el'
                : 'exclusivo, adquiere tu'}
            </p>
            <h3
              className="signwall-inside_body-title paywall"
              style={{
                fontFamily: primaryFont,
              }}>
              Plan Digital
            </h3>
            <center>
              <img
                alt="Logo"
                className={`logo ${arcSite}`}
                src={`${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=1`}
              />
            </center>
          </div>
        </div>
        <div className="signwall-inside_body-right paywall">
          {renderTemplate(selectedTemplate, valTemplate, {
            removeBefore,
            ...properties,
          })}
        </div>
      </div>
    </Modal>
  )
}

const Paywall = (props) => (
  <ModalProvider>
    <PaywallInt properties={props} />
  </ModalProvider>
)
export { Paywall }
