import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer, ModalProvider } from '../../signwall/_children/context'
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

const ProfileSignwall = () => {
  const { siteProperties } = useFusionContext() || {}

  React.useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.Identity &&
      (!window.Identity.userProfile || !window.Identity.userIdentity.uuid)
    ) {
      window.location.href = '/'
    }
  }, [])

  return (
    <PanelWrapper id="profile-signwall">
      <Header />
      <PanelContent>
        <ModalProvider>
          <ModalConsumer>
            {(value) => (
              <>
                <div className="panel-left">
                  <MenuSignwall
                    handleMenu={(item) => value.changeTemplate(item)}
                  />
                </div>
                <div className="panel-right">
                  {siteProperties.activePaywall ? (
                    renderTemplate(value.selectedTemplate, value.idTemplate)
                  ) : (
                    <MiPerfil />
                  )}
                </div>
              </>
            )}
          </ModalConsumer>
        </ModalProvider>
      </PanelContent>
    </PanelWrapper>
  )
}

ProfileSignwall.label = 'Signwall - Página Perfil de Usuario'

export default ProfileSignwall
