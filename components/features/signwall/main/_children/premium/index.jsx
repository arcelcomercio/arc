import { useContent } from 'fusion:content'
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

  if (getQuery('signPremium')) {
    setTimeout(() => {
      deleteQuery('signPremium')
    }, 2000)
    return templates.login
  }

  return templates[template] || templates.intro
}

export const PremiumInt = ({ properties }) => {
  const { typeDialog, onClose } = properties
  const {
    arcSite,
    siteProperties: {
      signwall: { primaryFont },
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = React.useContext(ModalConsumer)
  const [resizeModal, setResizeModal] = React.useState('smallbottom')

  const { name = '', summary: { feature = [] } = {} } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  const checkModal = () => {
    if (typeDialog === 'premium') {
      setResizeModal('smallbottom-large')
    }
  }

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
              {feature.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ContPaywall>
        </FirstMiddle>
        <SecondMiddle arcSite={arcSite}>
          {renderTemplate(selectedTemplate, valTemplate, {
            removeBefore,
            checkModal,
            ...properties,
          })}
        </SecondMiddle>
      </ContMiddle>
    </Modal>
  )
}

const Premium = (props) => (
  <ModalProvider>
    <PremiumInt properties={props} />
  </ModalProvider>
)

export { Premium }
