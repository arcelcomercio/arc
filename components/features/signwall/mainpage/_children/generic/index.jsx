import React, { PureComponent, useEffect, useRef } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../../_children/context'
import { FormLogin } from '../../../_children/forms/form_login'
import { FormForgot } from '../../../_children/forms/form_forgot'
import { FormRegister } from '../../../_children/forms/form_register'
import { FormReset } from '../../../_children/forms/form_reset'
import { FormVerify } from '../../../_children/forms/form_verify'
import { FormRelogin } from '../../../_children/forms/form_relogin'
import { ContMiddle, FirstMiddle, SecondMiddle } from './styled'
import Header from '../../../header/signwall'
import { Benefits } from '../../../_children/benefist/index'
import { Modal } from '../../../_children/modal/index'
import Taggeo from '../../../_dependencies/taggeo'

const renderTemplate = (template, attributes) => {
  const { typeDialog } = attributes

  const templates = {
    login: <FormLogin {...attributes} />,
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

export const ContGeneric = props => {
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
        {value => (
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
                {renderTemplate(value.selectedTemplate, { ...props })}
              </SecondMiddle>
            </ContMiddle>
          </Modal>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
}

@Consumer
class Generic extends PureComponent {
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

export { Generic }
