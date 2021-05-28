/* eslint-disable react/jsx-no-bind */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import QueryString from '../../_dependencies/querystring'
import Taggeo from '../../_dependencies/taggeo'
import { ModalConsumer, ModalProvider } from '../context'
import { FormForgot } from '../forms/form_forgot'
import { FormLoginPaywall } from '../forms/form_login_landing'
import FormRegister from '../forms/form_register'
import { Close } from '../iconos'
import { Modal } from '../modal/index'
import { CloseBtn, ContMiddle, FirstMiddle, SecondMiddle } from './styled'

const renderTemplate = (template, valTemplate, attributes) => {
  const templates = {
    login: <FormLoginPaywall {...{ valTemplate, attributes }} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }

  if (
    QueryString.getQuery('signLanding') ||
    QueryString.getQuery('signStudents')
  ) {
    setTimeout(() => {
      QueryString.deleteQuery('signLanding')
      QueryString.deleteQuery('signStudents')
      QueryString.deleteQuery('dataTreatment')
    }, 1000)
    return templates.login
  }

  return templates[template] || templates.login
}

export const LandingInt = (props) => {
  const {
    onClose,
    arcSite,
    // onLogged,
    noBtnClose,
    typeDialog,
  } = props
  const IMG = typeDialog === 'landing' ? 'bg_login' : 'bg_students'
  return (
    <ModalProvider>
      <ModalConsumer>
        {(value) => (
          <Modal size="medium" position="middle">
            <ContMiddle>
              {!noBtnClose && (
                <CloseBtn
                  type="button"
                  onClick={() => {
                    Taggeo(
                      `Web_Sign_Wall_${typeDialog}`,
                      `web_sw${typeDialog[0]}_boton_cerrar`
                    )
                    // if (window.Identity.userProfile) {
                    //   onLogged(window.Identity.userProfile)
                    //   onClose()
                    // } else {
                    //   onClose()
                    // }
                    onClose()
                  }}>
                  <Close />
                </CloseBtn>
              )}
              <FirstMiddle
                pathSourcePNG={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/${IMG}.jpg?d=1342`}
              />
              <SecondMiddle>
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
class Landing extends Component {
  render() {
    return (
      <LandingInt
        {...this.props}
        dispatchEvent={this.dispatchEvent.bind(this)}
      />
    )
  }
}

export default Landing
