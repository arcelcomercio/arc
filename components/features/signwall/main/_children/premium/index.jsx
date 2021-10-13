import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
  SITE_GESTION,
  SITE_TROME,
} from '../../../../../utilities/constants/sitenames'
import { deleteQuery, getQuery } from '../../../../../utilities/parse/queries'
import {
  ModalProvider,
  useModalContext,
} from '../../../../subscriptions/_context/modal'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import FormLoginDef from '../../../_children/forms/default/form_login'
import FormRegisterDef from '../../../_children/forms/default/form_register'
import FormForgot from '../../../_children/forms/form_forgot'
import FormIntro from '../../../_children/forms/form_intro'
import FormLogin from '../../../_children/forms/form_login'
import FormRegister from '../../../_children/forms/form_register'
import FormIntroFree from '../../../_children/forms/form-intro-free'
import { Close } from '../../../_children/icons'
import { Modal } from '../../../_children/modal/index'
import { PremiumFree } from './_children/free'
import { PremiumPayment } from './_children/payment'

const renderTemplate = (template, valTemplate, attributes) => {
  const { siteProperties, arcSite } = useAppContext() || {}
  const marca =
    arcSite === SITE_TROME ||
    arcSite === SITE_ELCOMERCIO ||
    arcSite === SITE_GESTION
  const introOFree =
    siteProperties.activeRegisterwall && arcSite === SITE_DIARIOCORREO ? (
      <FormIntroFree {...attributes} />
    ) : (
      <FormIntro {...attributes} />
    )

  const loginODef = marca ? (
    <FormLogin {...{ valTemplate, attributes }} />
  ) : (
    <FormLoginDef {...{ valTemplate, attributes }} />
  )

  const registerODef = marca ? (
    <FormRegister {...attributes} />
  ) : (
    <FormRegisterDef {...attributes} />
  )
  const templates = {
    intro: introOFree,
    login: loginODef,
    forgot: <FormForgot {...attributes} />,
    register: registerODef,
  }

  if (getQuery('signPremium')) {
    setTimeout(() => {
      deleteQuery('signPremium')
      deleteQuery('dataTreatment')
    }, 2000)
    return templates.intro
  }

  return templates[template] || templates.intro
}

export const PremiumInt = ({ properties }) => {
  const { typeDialog, onClose } = properties
  const {
    arcSite,
    siteProperties: { activeRegisterwall = '' },
    siteProperties: {
      signwall: { mainColorBtn },
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = useModalContext()
  const [resizeModal, setResizeModal] = React.useState('smallbottom')

  const checkModal = () => {
    if (typeDialog === 'premium') {
      setResizeModal('smallbottom-large')
    }
  }

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
        {activeRegisterwall && arcSite === SITE_DIARIOCORREO ? (
          <PremiumFree />
        ) : (
          <PremiumPayment />
        )}
        <div
          className="signwall-inside_body-right premium"
          style={{
            backgroundColor: arcSite === 'gestion' ? '#fff6f0' : '#f4f4f4',
          }}>
          <button
            type="button"
            className="signwall-inside_body-close premium"
            style={
              activeRegisterwall &&
              arcSite === SITE_DIARIOCORREO && { backgroundColor: mainColorBtn }
            }
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
            {activeRegisterwall && arcSite === SITE_DIARIOCORREO ? (
              <Close color="#fff" />
            ) : (
              <Close />
            )}
          </button>
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
