import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  ModalConsumer,
  ModalProvider,
} from '../../../../subscriptions/_context/modal'
import {
  deleteQuery,
  getQuery,
} from '../../../../subscriptions/_dependencies/QueryString'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import { FormForgot } from '../../../_children/forms/form_forgot'
import FormIntro from '../../../_children/forms/form_intro'
import { FormLogin } from '../../../_children/forms/form_login'
import FormRegister from '../../../_children/forms/form_register'
import { Close } from '../../../_children/iconos'
import { Modal } from '../../../_children/modal/index'
import {
  CloseBtn,
  ContMiddle,
  ContPaywall,
  FirstMiddle,
  SecondMiddle,
  Title,
} from './styled'

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
    siteProperties: {
      signwall: { primaryFont },
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = React.useContext(ModalConsumer)

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
    <Modal size="medium" position="middle">
      <ContMiddle>
        <CloseBtn
          type="button"
          className="btn-close"
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
        </CloseBtn>
        <FirstMiddle
          pathSourcePNG={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/paywall_bg.jpg?d=1342`}
          arcSite={arcSite}>
          <ContPaywall>
            <p>
              {typeDialog === 'paywall'
                ? 'Has alcanzado el límite de noticias.'
                : 'Para acceder a este contenido'}
              <br />
              {typeDialog === 'paywall'
                ? 'Para continuar leyendo, adquiere el'
                : 'exclusivo, adquiere tu'}
            </p>
            <Title f={primaryFont}>Plan Digital</Title>
            <center>
              <img
                style={{ maxWidth: '320px', height: 'auto' }}
                alt="Logo"
                src={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=408`}
              />
            </center>
          </ContPaywall>
        </FirstMiddle>
        <SecondMiddle>
          {renderTemplate(selectedTemplate, valTemplate, {
            removeBefore,
            ...properties,
          })}
        </SecondMiddle>
      </ContMiddle>
    </Modal>
  )
}

const Paywall = (props) => (
  <ModalProvider>
    <PaywallInt properties={props} />
  </ModalProvider>
)
export { Paywall }
