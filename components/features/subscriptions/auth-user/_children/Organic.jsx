/* eslint-disable react/jsx-no-bind */
import Consumer from 'fusion:consumer'
import React, { PureComponent, useEffect, useRef } from 'react'

import { Benefits } from '../../../signwall/_children/benefist/index'
import {
  ModalConsumer,
  ModalProvider,
} from '../../../signwall/_children/context'
import { FormForgot } from '../../../signwall/_children/forms/form_forgot'
import { FormLogin } from '../../../signwall/_children/forms/form_login'
import FormRegister from '../../../signwall/_children/forms/form_register'
import { FormRelogin } from '../../../signwall/_children/forms/form_relogin'
import { FormReset } from '../../../signwall/_children/forms/form_reset'
import { FormVerify } from '../../../signwall/_children/forms/form_verify'
import { Modal } from '../../../signwall/_children/modal/index'
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

export const ContGeneric = (props) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorTitle, primaryFont },
      activePaywall,
    },
    onClose,
    typeDialog,
    addEventListener,
    removeEventListener,
  } = props

  const handleLeavePage = useRef(() => {
    Taggeo(`Web_Sign_Wall_${typeDialog}`, `web_sw${typeDialog[0]}_leave`)
  }).current

  useEffect(() => {
    Taggeo(`Web_Sign_Wall_${typeDialog}`, `web_sw${typeDialog[0]}_open`)
    addEventListener('beforeunload', handleLeavePage)
    return () => {
      removeEventListener('beforeunload', handleLeavePage)
    }
  }, [])

  return (
    <ModalProvider>
      <ModalConsumer>
        {(value) => (
          <Modal size={activePaywall ? 'large' : 'small'} position="middle">
            <Header
              buttonClose
              onClose={onClose}
              typeDialog={typeDialog}
              noLoading
            />
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
                {renderTemplate(value.selectedTemplate, value.valTemplate, {
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
class SignOrganic extends PureComponent {
  render() {
    return (
      <ContGeneric
        {...this.props}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

export { SignOrganic }
