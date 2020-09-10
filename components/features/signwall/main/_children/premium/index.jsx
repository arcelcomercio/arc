/* eslint-disable react/jsx-no-bind */
import React, { PureComponent, useEffect, useState } from 'react'
import Consumer from 'fusion:consumer'
import { useContent } from 'fusion:content'
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

  if (QueryString.getQuery('signPremium')) {
    setTimeout(() => {
      QueryString.deleteQuery('signPremium')
    }, 2000)
    return templates.login
  }

  return templates[template] || templates.intro
}

export const PremiumInt = props => {
  const [resizeModal, setResizeModal] = useState('smallbottom')
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

  const { name = '', summary: { feature = [] } = {} } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  const checkModal = () => {
    if (typeDialog === 'premium') {
      setResizeModal('smallbottom-large')
    }
  }

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
          <Modal
            size={resizeModal}
            position="bottom"
            bgColor={arcSite === 'gestion' ? 'black' : 'white'}>
            <ContMiddle>
              <CloseBtn
                type="button"
                className="btn-close"
                onClick={() => {
                  Taggeo(`Web_${typeDialog}_Hard`, `web_${typeDialog}_cerrar`)

                  if (typeDialog === 'premium') {
                    if (document.getElementById('btn-premium-continue')) {
                      onClose()
                    } else {
                      window.location.href = `/?signwallPremium=1&ref=${window.location.pathname}`
                    }
                  } else {
                    onClose()
                  }
                }}>
                <Close />
              </CloseBtn>
              <FirstMiddle
                pathSourcePNG={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/paywall_bg.jpg?d=1342`}
                arcSite={arcSite}>
                <ContPaywall arcSite={arcSite}>
                  <p>
                    Para acceder a este contenido
                    <br />
                    exclusivo, adquiere tu
                  </p>
                  <Title f={primaryFont}>{name}</Title>
                  <center>
                    <img
                      alt="Logo"
                      className="logo"
                      src={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=408`}
                    />
                  </center>
                  <ul className="list-benefits mb-20">
                    {feature.map(item => {
                      return <li key={item}>{item}</li>
                    })}
                  </ul>
                </ContPaywall>
              </FirstMiddle>
              <SecondMiddle arcSite={arcSite}>
                {renderTemplate(value.selectedTemplate, value.valTemplate, {
                  removeBefore,
                  checkModal,
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
class Premium extends PureComponent {
  render() {
    return (
      <PremiumInt
        {...this.props}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

export { Premium }
