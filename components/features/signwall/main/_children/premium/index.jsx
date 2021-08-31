import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/assets'
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

  if (getQuery('signPremium')) {
    setTimeout(() => {
      deleteQuery('signPremium')
      deleteQuery('dataTreatment')
    }, 2000)
    return templates.login
  }

  return templates[template] || templates.intro
}

export const PremiumInt = ({ properties }) => {
  const { typeDialog, onClose } = properties
  const {
    arcSite,
    contextPath,
    siteProperties: {
      signwall: { primaryFont },
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = useModalContext()
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
      <div className="signwall-inside_body-container premium">
        <button
          type="button"
          className="signwall-inside_body-close premium"
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
        </button>
        <div
          className="signwall-inside_body-left premium"
          style={{
            background: `${arcSite === 'gestion' ? '#8f071f' : '#232323'}`,
          }}>
          <img
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/paywall_bg.jpg?d=1`}
            alt={`Ejemplo de usuario suscriptor de ${arcSite}`}
            className="signwall-inside_body-left__bg"
          />
          <div
            className="signwall-inside_body-cont premium"
            style={{
              padding: arcSite === 'gestion' ? '15px 10px' : '12px 20px',
            }}>
            <p>
              Para acceder a este contenido
              <br />
              exclusivo, adquiere tu
            </p>
            <h3
              className="signwall-inside_body-title premium"
              style={{
                fontFamily: primaryFont,
              }}>
              {name}
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
            <ul className="list-benefits mb-20">
              {feature.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="signwall-inside_body-right premium"
          style={{
            backgroundColor: arcSite === 'gestion' ? '#fff6f0' : '#f4f4f4',
          }}>
          {renderTemplate(selectedTemplate, valTemplate, {
            removeBefore,
            checkModal,
            ...properties,
          })}
        </div>
      </div>
    </Modal>
  )
}

const Premium = (props) => (
  <ModalProvider>
    <PremiumInt properties={props} />
  </ModalProvider>
)

export { Premium }
