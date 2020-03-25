import React, { PureComponent, useEffect } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../../_children/context'
import { FormLogin } from '../../../_children/forms/form_login'
import { FormIntro } from '../../../_children/forms/form_intro'
import { FormForgot } from '../../../_children/forms/form_forgot'
import { FormRegister } from '../../../_children/forms/form_register'
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

const renderTemplate = (template, attributes) => {
  const templates = {
    intro: <FormIntro {...attributes} />,
    login: <FormLogin {...attributes} />,
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
    pathSourcePNG,
    pathSourceWEBP,
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
              <FirstMiddle>
                <picture>
                  <source srcSet={pathSourceWEBP} type="image/webp" />
                  <source srcSet={pathSourcePNG} type="image/png" />
                  <img src={pathSourcePNG} alt="img" />
                </picture>
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
                      src={`https://gestion.pe/pf/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=408`}
                    />
                  </center>
                </ContPaywall>
              </FirstMiddle>
              <SecondMiddle>
                {renderTemplate(value.selectedTemplate, {
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
    const { contextPath, deployment, arcSite } = this.props

    const pathSourcePNG =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/paywall_bg.png`
      ) || ''

    const pathSourceWEBP =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/paywall_bg.webp`
      ) || ''

    return (
      <PaywallInt
        {...this.props}
        pathSourcePNG={pathSourcePNG}
        pathSourceWEBP={pathSourceWEBP}
        getContent={this.getContent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}
export { Paywall }
