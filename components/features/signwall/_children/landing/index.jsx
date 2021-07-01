import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  ModalConsumer,
  ModalProvider,
} from '../../../subscriptions/_context/modal'
import {
  deleteQuery,
  getQuery,
} from '../../../subscriptions/_dependencies/QueryString'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import FormForgot from '../forms/form_forgot'
import { FormLoginPaywall } from '../forms/form_login_landing'
import FormRegister from '../forms/form_register'
import { Close } from '../icons'
import { Modal } from '../modal/index'

const renderTemplate = (template, valTemplate, attributes) => {
  const templates = {
    login: <FormLoginPaywall {...{ valTemplate, attributes }} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }

  if (getQuery('signLanding') || getQuery('signStudents')) {
    setTimeout(() => {
      deleteQuery('signLanding')
      deleteQuery('signStudents')
      deleteQuery('dataTreatment')
    }, 1000)
    return templates.login
  }

  return templates[template] || templates.login
}

export const LandingInt = ({ properties }) => {
  const { onClose, noBtnClose, typeDialog } = properties
  const { arcSite } = useAppContext() || {}
  const { selectedTemplate, valTemplate } = React.useContext(ModalConsumer)
  const IMG = typeDialog === 'landing' ? 'bg_login' : 'bg_students'

  return (
    <Modal size="medium-large" position="middle">
      <div className="signwall-inside_body-container landing">
        {!noBtnClose && (
          <button
            type="button"
            className="signwall-inside_body-close"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_boton_cerrar`
              )
              onClose()
            }}>
            <Close />
          </button>
        )}
        <div
          className="signwall-inside_body-left landing"
          style={{
            background: `${
              arcSite === 'gestion' ? '#8f071f' : '#232323'
            } url(https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/${IMG}.jpg?d=1342)`,
            backgroundSize: 'cover',
          }}
        />
        <div className="signwall-inside_body-right landing">
          {renderTemplate(selectedTemplate, valTemplate, {
            ...properties,
          })}
        </div>
      </div>
    </Modal>
  )
}

const Landing = (props) => (
  <ModalProvider>
    <LandingInt properties={props} />
  </ModalProvider>
)

export default Landing
