/* eslint-disable react/jsx-no-bind */
import React, { PureComponent, useEffect } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../../_children/context'
import { FormLogin } from '../../../_children/forms/form_login'
import FormIntro from '../../../_children/forms/form_intro'
import { FormForgot } from '../../../_children/forms/form_forgot'
import FormRegister from '../../../_children/forms/form_register'
import Taggeo from '../../../_dependencies/taggeo'
import QueryString from '../../../_dependencies/querystring'

import {
  ContMiddle,
  FirstMiddle,
  SecondMiddle,
  ContPaywall,
  CloseBtn,
  Title,
} from './styled'
import { Modal } from '../../../_children/modal/index'
import { Close } from '../../../_children/iconos'

const renderTemplate = (template, valTemplate, attributes) => {
  const templates = {
    intro: <FormIntro {...attributes} />,
    login: <FormLogin {...{ valTemplate, attributes }} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }

  if (QueryString.getQuery('signPaywall')) {
    setTimeout(() => {
      QueryString.deleteQuery('signPaywall')
    }, 2000)
    return templates.login
  }

  return templates[template] || templates.intro
}

export const PaywallInt = props => {
  const {
    onClose,
    arcSite,
    typeDialog,
    siteProperties: {
      signwall: { primaryFont },
    },
    addEventListener,
    removeEventListener,
  } = props

  const handleLeavePage = event => {
    event.preventDefault()
    Taggeo(`Web_${typeDialog}_Hard`, `web_${typeDialog}_leave`)
  }

  useEffect(() => {
    Taggeo(`Web_${typeDialog}_Hard`, `web_${typeDialog}_open`)
    addEventListener('beforeunload', handleLeavePage)
    return () => {
      removeEventListener('beforeunload', handleLeavePage)
    }
  }, [])

  const removeBefore = () => {
    removeEventListener('beforeunload', handleLeavePage)
  }

  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
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
                {renderTemplate(value.selectedTemplate, value.valTemplate, {
                  removeBefore,
                  ...props,
                })}
              </SecondMiddle>
            </ContMiddle>
          </Modal>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
}

@Consumer
class Paywall extends PureComponent {
  render() {
    return (
      <PaywallInt
        {...this.props}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}
export { Paywall }
