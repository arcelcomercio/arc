import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../../../utilities/constants/sitenames'
import importRetry from '../../../../../utilities/core/import-retry'
import { deleteQuery, getQuery } from '../../../../../utilities/parse/queries'
import {
  ModalProvider,
  useModalContext,
} from '../../../../subscriptions/_context/modal'
import { Taggeo } from '../../../../subscriptions/_dependencies/Taggeo'
import { Close } from '../../../_children/icons'
import { Modal } from '../../../_children/modal/index'
import { PremiumFree } from './_children/free'
import { PremiumPayment } from './_children/payment'

const FormIntro = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/form_intro'))
)

const FormIntroFree = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/form-intro-free'))
)

const FormLogin = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/form_login'))
)

const FormLoginDef = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/default/form_login'))
)

const FormForgot = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/form_forgot'))
)

const FormRegister = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/form_register'))
)

const FormRegisterDef = React.lazy(() =>
  importRetry(() => import('../../../_children/forms/default/form_register'))
)

const lazyFallback = <div style={{ padding: '30px' }}>Cargando...</div>

const renderTemplate = (template, valTemplate, attributes) => {
  const {
    siteProperties: { activeRegisterwall },
    arcSite,
  } = useAppContext() || {}
  const marca = arcSite === SITE_ELCOMERCIO || arcSite === SITE_GESTION

  const templates = {
    intro: (
      <React.Suspense fallback={lazyFallback}>
        {activeRegisterwall && arcSite === SITE_DIARIOCORREO ? (
          <FormIntroFree {...attributes} />
        ) : (
          <FormIntro {...attributes} />
        )}
      </React.Suspense>
    ),
    login: (
      <React.Suspense fallback={lazyFallback}>
        {marca ? (
          <FormLogin {...{ valTemplate, attributes }} />
        ) : (
          <FormLoginDef {...{ valTemplate, attributes }} />
        )}
      </React.Suspense>
    ),
    forgot: (
      <React.Suspense fallback={lazyFallback}>
        <FormForgot {...attributes} />
      </React.Suspense>
    ),
    register: (
      <React.Suspense fallback={lazyFallback}>
        {marca ? (
          <FormRegister {...attributes} />
        ) : (
          <FormRegisterDef {...attributes} />
        )}
      </React.Suspense>
    ),
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
    siteProperties: {
      activeRegisterwall,
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

  const { name = '', summary: { feature = [] } = {} } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  // const handleLeavePage = (event) => {
  //   event.preventDefault()
  // modificado para el taggeo de diario correo por valla
  // Taggeo(
  //   `Web_${typeDialog}_${
  //     activeRegisterwall &&
  //     typeDialog === 'premium'
  //       ? 'Registro'
  //       : 'Hard'
  //   }`, `web_${typeDialog}_leave`)
  // }

  React.useEffect(() => {
    // modificado para comprobar el taggeo
    Taggeo(
      `Web_${typeDialog}_${activeRegisterwall ? 'Registro' : 'Hard'}`,
      `web_${typeDialog}_open`
    )
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
          <PremiumPayment name={name} feature={feature} />
        )}
        <div
          className="signwall-inside_body-right premium"
          style={{
            backgroundColor: arcSite === 'gestion' ? '#fff6f0' : '#f4f4f4',
          }}>
          <button
            type="button"
            className="signwall-inside_body-close premium"
            style={{
              backgroundColor:
                activeRegisterwall && arcSite === SITE_DIARIOCORREO
                  ? mainColorBtn
                  : 'none',
            }}
            onClick={() => {
              // modificado para comprobar eficacidad con el taggeo de valla correo
              Taggeo(
                `Web_${typeDialog}_${activeRegisterwall ? 'Registro' : 'Hard'}`,
                `web_${typeDialog}_cerrar`
              )
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
