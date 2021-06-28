import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import useSentry from '../../../hooks/useSentry'
import addScriptAsync from '../../../utilities/script-async'
import Loading from '../../signwall/_children/loading'
import { getOriginAPI } from '../../signwall/_dependencies/domains'
import { ModalConsumer, ModalProvider } from '../_context/modal'
import { PropertiesCommon } from '../_dependencies/Properties'
import { isAuthenticated } from '../_dependencies/Session'
import Header from './_children/header/signwall'

const MenuSignwall = React.lazy(() =>
  import(
    /* webpackChunkName: 'Profile-MenuSignwall' */ './_children/menu/signwall'
  )
)

const ResumeProfile = React.lazy(() =>
  import(/* webpackChunkName: 'Profile-ResumeProfile' */ './_children/resume')
)

const NewsLetter = React.lazy(() =>
  import(/* webpackChunkName: 'Profile-NewsLetter' */ './_children/newsletters')
)

const Subscription = React.lazy(() =>
  import(
    /* webpackChunkName: 'Profile-Subscription' */ './_children/subscriptions'
  )
)

const MiPerfil = React.lazy(() =>
  import(/* webpackChunkName: 'Profile-MiPerfil' */ './_children/profile')
)

const SubsDetail = React.lazy(() =>
  import(
    /* webpackChunkName: 'Profile-SubsDetail' */ './_children/subscriptions/_children/detail'
  )
)

const renderTemplate = (template, id) => {
  const templates = {
    home: (
      <React.Suspense fallback={null}>
        <ResumeProfile />
      </React.Suspense>
    ),
    news: (
      <React.Suspense fallback={null}>
        <NewsLetter />
      </React.Suspense>
    ),
    subs: (
      <React.Suspense fallback={null}>
        <Subscription />
      </React.Suspense>
    ),
    prof: (
      <React.Suspense fallback={null}>
        <MiPerfil />
      </React.Suspense>
    ),
    detail: (
      <React.Suspense fallback={null}>
        <SubsDetail IdSubscription={id} />
      </React.Suspense>
    ),
  }
  return templates[template] || templates.home
}

const WrapperProfile = () => {
  const { siteProperties, arcSite } = useAppContext() || {}
  const { links, urls: urlCommon } = PropertiesCommon

  const {
    changeTemplate,
    selectedTemplate,
    idTemplate,
    userLoading,
    updateLoading,
  } = React.useContext(ModalConsumer)

  useSentry(urlCommon.sentrySign)

  React.useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/?ref=signwall'
    }
  }, [])

  React.useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        updateLoading(false)
        window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })
  }, [])

  return (
    <div className="sign-profile_general-panel-wrapper" id="profile-signwall">
      {userLoading ? (
        <Loading typeBg="full" />
      ) : (
        <>
          <Header />
          <div className="sign-profile_general-panel-content">
            <div className="panel-left">
              <React.Suspense fallback={null}>
                <MenuSignwall handleMenu={(item) => changeTemplate(item)} />
              </React.Suspense>
            </div>
            <div className="panel-right">
              {siteProperties.activePaywall ? (
                renderTemplate(selectedTemplate, idTemplate)
              ) : (
                <React.Suspense fallback={null}>
                  <MiPerfil />
                </React.Suspense>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const ProfileSignwall = () => (
  <ModalProvider>
    <WrapperProfile />
  </ModalProvider>
)

ProfileSignwall.label = 'Signwall - Página Perfil de Usuario'

export default ProfileSignwall
