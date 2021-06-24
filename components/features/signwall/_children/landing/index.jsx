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
import { Close } from '../iconos'
import { Modal } from '../modal/index'
import { CloseBtn, ContMiddle, FirstMiddle, SecondMiddle } from './styled'

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
      <ContMiddle>
        {!noBtnClose && (
          <CloseBtn
            type="button"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog[0]}_boton_cerrar`
              )
              onClose()
            }}>
            <Close />
          </CloseBtn>
        )}
        <FirstMiddle
          pathSourcePNG={`https://${arcSite}.pe/pf/resources/dist/${arcSite}/images/${IMG}.jpg?d=1342`}
        />
        <SecondMiddle>
          {renderTemplate(selectedTemplate, valTemplate, {
            ...properties,
          })}
        </SecondMiddle>
      </ContMiddle>
    </Modal>
  )
}

const Landing = (props) => (
  <ModalProvider>
    <LandingInt properties={props} />
  </ModalProvider>
)

export default Landing
