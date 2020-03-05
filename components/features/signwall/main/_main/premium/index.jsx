import React, { PureComponent, useEffect, useState } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../../_children/context'
import { FormIntro } from '../_children/form_intro'
import { FormLogin } from '../_children/form_login'
import { FormForgot } from '../_children/form_forgot'
import { FormRegister } from '../_children/form_register'
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
  const [resCampaing, setResCampaing] = useState([])
  const {
    onClose,
    pathSourcePNG,
    arcSite,
    typeDialog,
    siteProperties: {
      signwall: { primaryFont },
    },
    addEventListener,
    removeEventListener,
    getContent,
  } = props

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
    const { fetched } = getContent('paywall-campaing')
    fetched.then(resCam => {
      setResCampaing(resCam.summary.feature || [])
    })
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
              <FirstMiddle pathSourcePNG={pathSourcePNG} arcSite={arcSite}>
                <ContPaywall arcSite={arcSite}>
                  <p>
                    Para acceder a este contenido
                    <br />
                    exclusivo, adquiere tu
                  </p>
                  <Title f={primaryFont}>Plan Digital</Title>
                  <center>
                    <img
                      alt="Logo"
                      className="logo"
                      src={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=408`}
                    />
                  </center>

                  <ul className="list-benefits mb-20">
                    {resCampaing.map(item => {
                      return <li key={item}>{item}</li>
                    })}
                  </ul>
                </ContPaywall>
              </FirstMiddle>
              <SecondMiddle arcSite={arcSite}>
                {renderTemplate(value.selectedTemplate, {
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
    const { contextPath, deployment, arcSite } = this.props

    const pathSourcePNG =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/paywall_bg.png`
      ) || ''

    return (
      <PremiumInt
        {...this.props}
        pathSourcePNG={pathSourcePNG}
        getContent={this.getContent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}
export { Premium }
