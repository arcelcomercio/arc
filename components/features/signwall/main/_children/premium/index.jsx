// import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

// import { getAssetsPath } from '../../../../../utilities/assets'
import { SITE_DIARIOCORREO, SITE_GESTION } from '../../../../../utilities/constants/sitenames'
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
import FormIntroFree from "../../../_children/forms/form-intro-free"
import { Close } from '../../../_children/icons'
import { Modal } from '../../../_children/modal/index'
import { PremiumDefault } from './_children/default'
import { PremiumRegister } from './_children/register'

const renderTemplate = (template, valTemplate, attributes) => {
  const {
    siteProperties,
    arcSite
  } = useAppContext() || {}
  const introOFree = siteProperties.activeRegisterwall && arcSite === SITE_DIARIOCORREO ?
    <FormIntroFree {...attributes} /> :
    <FormIntro {...attributes} />
  const templates = {
    intro: introOFree,
    login: <FormLogin {...{ valTemplate, attributes }} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }

  if (getQuery('signPremium')) {
    setTimeout(() => {
      deleteQuery('signPremium')
      deleteQuery('dataTreatment')
    }, 2000)
    return templates.intro
  }

  return templates[template] ||  /* (siteProperties.activeRegisterwall ? templates.introfree : */
    templates.intro // )
}

export const PremiumInt = ({ properties }) => {
  const { typeDialog, onClose } = properties
  const {
    arcSite,
    // contextPath,
    siteProperties: {
      activeRegisterwall = ''
    },
    siteProperties: {
      signwall: { mainColorBtn },
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = useModalContext()
  const [resizeModal, setResizeModal] = React.useState('smallbottom')
  /* const { name = '', summary: { feature = [] } = {} } =
    useContent({
      source: 'paywall-campaing',
    }) || {}
*/
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

  const backgroundOfSite = (arcsite) => {
    switch (arcsite) {
      case SITE_GESTION: return '#fff6f0';
      case SITE_DIARIOCORREO: return '#ffffff';
      default:
        return '#f4f4f4'
    }
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
          style={(activeRegisterwall && arcSite === SITE_DIARIOCORREO) && { backgroundColor: mainColorBtn }}
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
          {activeRegisterwall && arcSite === SITE_DIARIOCORREO ? (<Close color="#fff" />) : <Close />}
        </button>
        {activeRegisterwall && arcSite === SITE_DIARIOCORREO
          ? (<PremiumRegister />) : (<PremiumDefault />)}
        <div
          className="signwall-inside_body-right premium"
          style={{
            backgroundColor: backgroundOfSite(arcSite)
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
