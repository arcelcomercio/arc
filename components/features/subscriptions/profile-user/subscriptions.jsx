import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { env } from '../../../utilities/arc/env'
import { PROD } from '../../../utilities/constants/environment'
import addScriptAsync from '../../../utilities/script-async'
import { ModalConsumer, ModalProvider } from '../_context/modal'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { isAuthenticated } from '../_dependencies/Session'
import Header from './_children/header/signwall'
import MenuSignwall from './_children/menu/signwall'
import { NewsLetter } from './_children/newsletters'
import MiPerfil from './_children/profile'
import { ResumeProfile } from './_children/resume'
import Subscription from './_children/subscriptions'
import { SubsDetail } from './_children/subscriptions/_children/detail'
import { PanelContent, PanelWrapper } from './styled'

const renderTemplate = (template, id) => {
  const templates = {
    home: <ResumeProfile />,
    news: <NewsLetter />,
    subs: <Subscription />,
    prof: <MiPerfil />,
    detail: <SubsDetail IdSubscription={id} />,
  }
  return templates[template] || templates.home
}

const WrapperProfile = () => {
  const { siteProperties, arcSite, deployment } = useAppContext() || {}
  const { links, urls: urlCommon } = PropertiesCommon
  const { urls } = PropertiesSite[arcSite]

  const { changeTemplate, selectedTemplate, idTemplate } = React.useContext(
    ModalConsumer
  )

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

    if (typeof window !== 'undefined' && !isAuthenticated()) {
      window.location.href = '/?ref=signwall'
    }
  }, [])

  return (
    <PanelWrapper id="profile-signwall">
      <Header />
      <PanelContent>
        <div className="panel-left">
          <MenuSignwall handleMenu={(item) => changeTemplate(item)} />
        </div>
        <div className="panel-right">
          {siteProperties.activePaywall ? (
            renderTemplate(selectedTemplate, idTemplate)
          ) : (
            <MiPerfil />
          )}
        </div>
      </PanelContent>
    </PanelWrapper>
  )
}

const ProfileSignwall = () => (
  <ModalProvider>
    <WrapperProfile />
  </ModalProvider>
)

ProfileSignwall.label = 'Signwall - Página Perfil de Usuario'

export default ProfileSignwall
