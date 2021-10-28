import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
  SITE_GESTION,
  SITE_TROME,
} from '../../../../utilities/constants/sitenames'
import importRetry from '../../../../utilities/core/import-retry'
import { Benefits } from '../../../signwall/_children/benefits'
import { Modal } from '../../../signwall/_children/modal/index'
import { ModalProvider, useModalContext } from '../../_context/modal'
import { Taggeo } from '../../_dependencies/Taggeo'
import HeaderDefault from '../../profile-user/_children/header/default'
import Header from '../../profile-user/_children/header/signwall'

const FormLogin = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'Auth-FormLogin' */ '../../../signwall/_children/forms/form_login'
    )
  )
)

const FormLoginDefault = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormLogin' */ '../../../signwall/_children/forms/default/form_login'
  )
)

const FormRegister = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'Auth-FormRegister' */ '../../../signwall/_children/forms/form_register'
    )
  )
)

const FormRegisterDefault = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormRegister' */ '../../../signwall/_children/forms/default/form_register'
  )
)

const FormForgot = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'Auth-FormForgot' */ '../../../signwall/_children/forms/form_forgot'
    )
  )
)

const FormReset = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'Auth-FormReset' */ '../../../signwall/_children/forms/form_reset'
    )
  )
)

const FormVerify = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'Auth-FormVerify' */ '../../../signwall/_children/forms/form_verify'
    )
  )
)
const FormVerifyDefault = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormVerify' */ '../../../signwall/_children/forms/default/form_verify'
  )
)

const FormRelogin = React.lazy(() =>
  importRetry(() =>
    import(
      /* webpackChunkName: 'Auth-FormRelogin' */ '../../../signwall/_children/forms/form_relogin'
    )
  )
)

const lazyFallback = <div style={{ padding: '30px' }}>Cargando...</div>

const renderTemplate = (template, valTemplate, attributes) => {
  const { typeDialog, arcSite } = attributes

  const marca =
    arcSite === SITE_TROME ||
    arcSite === SITE_ELCOMERCIO ||
    arcSite === SITE_GESTION

  const templates = {
    login: (
      <React.Suspense fallback={lazyFallback}>
        {marca ? (
          <FormLogin {...{ valTemplate, attributes }} />
        ) : (
          <FormLoginDefault {...{ valTemplate, attributes }} />
        )}
      </React.Suspense>
    ),
    register: (
      <React.Suspense fallback={lazyFallback}>
        {marca ? (
          <FormRegister {...attributes} />
        ) : (
          <FormRegisterDefault {...attributes} />
        )}
      </React.Suspense>
    ),
    forgot: (
      <React.Suspense fallback={lazyFallback}>
        <FormForgot {...attributes} />
      </React.Suspense>
    ),
    reset: (
      <React.Suspense fallback={lazyFallback}>
        <FormReset {...attributes} />
      </React.Suspense>
    ),
    verify: (
      <React.Suspense fallback={lazyFallback}>
        {marca ? (
          <FormVerify {...attributes} />
        ) : (
          <FormVerifyDefault {...attributes} />
        )}
      </React.Suspense>
    ),
    relogin: (
      <React.Suspense fallback={lazyFallback}>
        <FormRelogin {...attributes} />
      </React.Suspense>
    ),
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
        return arcSite === SITE_TROME || arcSite === SITE_DIARIOCORREO
          ? templates.register
          : templates.login
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
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = useModalContext()
  const isTrome = arcSite === SITE_TROME
  const isComercio = arcSite === SITE_ELCOMERCIO
  const isGestion = arcSite === SITE_GESTION

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
    <Modal
      // eslint-disable-next-line no-nested-ternary
      size={activePaywall ? 'large' : isTrome ? 'medium' : 'small'}
      arcSite={arcSite}
      position="middle">
      {isTrome || isComercio || isGestion ? (
        <Header
          buttonClose
          onClose={onClose}
          typeDialog={typeDialog}
          noLoading
          logoLeft
        />
      ) : (
        <HeaderDefault
          buttonClose
          onClose={onClose}
          typeDialog={typeDialog}
          noLoading
          logoLeft
        />
      )}

      <div
        className="cont-modal"
        style={
          isTrome || isComercio || isGestion
            ? {
                height: 'calc(100% - 50px)',
              }
            : { minHeight: '350px' }
        }>
        {(isTrome || isComercio || isGestion) && (
          <div className={`left-modal ${isTrome ? 'bg-trome' : ''}`}>
            <React.Suspense fallback={null}>
              <Benefits
                arcSite={arcSite}
                mainColorTitle={mainColorTitle}
                primaryFont={primaryFont}
                typeDialog={typeDialog}
                onClose={onClose}
              />
            </React.Suspense>
          </div>
        )}

        <div className="right-modal">
          {renderTemplate(selectedTemplate, valTemplate, {
            ...properties,
          })}
        </div>
      </div>
    </Modal>
  )
}

const SignOrganic = (props) => (
  <ModalProvider>
    <ContGeneric properties={props} />
  </ModalProvider>
)

export { SignOrganic }
