/* eslint-disable react/jsx-no-bind */
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { env } from '../../../../utilities/arc/env'
import { PROD } from '../../../../utilities/constants/environment'
import addScriptAsync from '../../../../utilities/script-async'
import { Benefits } from '../../../signwall/_children/benefist/index'
import { FormForgot } from '../../../signwall/_children/forms/form_forgot'
import { FormLogin } from '../../../signwall/_children/forms/form_login'
import FormRegister from '../../../signwall/_children/forms/form_register'
import { FormRelogin } from '../../../signwall/_children/forms/form_relogin'
import { FormReset } from '../../../signwall/_children/forms/form_reset'
import { FormVerify } from '../../../signwall/_children/forms/form_verify'
import { Modal } from '../../../signwall/_children/modal/index'
import { ModalConsumer, ModalProvider } from '../../_context/modal'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../_dependencies/Properties'
import { Taggeo } from '../../_dependencies/Taggeo'
import Header from '../../profile-user/_children/header/signwall'
import { ContMiddle, FirstMiddle, SecondMiddle } from './styled'

const renderTemplate = (template, valTemplate, attributes) => {
  const { typeDialog } = attributes

  const templates = {
    login: <FormLogin {...{ valTemplate, attributes }} />,
    register: <FormRegister {...attributes} />,
    forgot: <FormForgot {...attributes} />,
    reset: <FormReset {...attributes} />,
    verify: <FormVerify {...attributes} />,
    relogin: <FormRelogin {...attributes} />,
  }

  const getDefault = () => {
    switch (typeDialog) {
      case 'resetpass':
        return templates.reset
      case 'verify':
        return templates.verify
      case 'relogemail':
      case 'reloghash':
        return templates.relogin
      default:
        return templates.login
    }
  }

  return templates[template] || getDefault()
}

export const ContGeneric = ({ properties }) => {
  const { typeDialog, onClose } = properties
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorTitle, primaryFont },
      activePaywall,
    },
    deployment,
  } = useAppContext() || {}

  const { links, urls: urlCommon } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]
  const { selectedTemplate, valTemplate } = React.useContext(ModalConsumer)

  React.useEffect(() => {
    Sentry.init({
      dsn: urlCommon.sentrySign,
      debug: env !== PROD,
      release: `arc-deployment@${deployment}`,
      environment: env,
      ignoreErrors: [
        'Unexpected end of JSON input',
        'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
        'JSON Parse error: Unexpected EOF',
      ],
      denyUrls: [/delivery\.adrecover\.com/, /analytics/, /facebook/],
    })

    Sentry.configureScope((scope) => {
      scope.setTag('brand', arcSite)
    })

    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })
  }, [])

  // const handleLeavePage = useRef(() => {
  //   Taggeo(`Web_Sign_Wall_${typeDialog}`, `web_sw${typeDialog[0]}_leave`)
  // }).current

  React.useEffect(() => {
    Taggeo(`Web_Sign_Wall_${typeDialog}`, `web_sw${typeDialog[0]}_open`)
    // addEventListener('beforeunload', handleLeavePage)
    return () => {
      // removeEventListener('beforeunload', handleLeavePage)
    }
  }, [])

  return (
    <Modal size={activePaywall ? 'large' : 'small'} position="middle">
      <Header buttonClose onClose={onClose} typeDialog={typeDialog} noLoading />
      <ContMiddle>
        {activePaywall && (
          <FirstMiddle>
            <Benefits
              arcSite={arcSite}
              mainColorTitle={mainColorTitle}
              primaryFont={primaryFont}
              typeMessage={typeDialog}
            />
          </FirstMiddle>
        )}
        <SecondMiddle full={!activePaywall}>
          {renderTemplate(selectedTemplate, valTemplate, {
            ...properties,
          })}
        </SecondMiddle>
      </ContMiddle>
    </Modal>
  )
}

const SignOrganic = (props) => (
  <ModalProvider>
    <ContGeneric properties={props} />
  </ModalProvider>
)

export { SignOrganic }
