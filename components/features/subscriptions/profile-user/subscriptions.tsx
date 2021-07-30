import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  SdksProvider,
  SdkStatus,
  useSdksContext,
} from '../../../contexts/subscriptions-sdks'
import useSentry from '../../../hooks/useSentry'
import Loading from '../../signwall/_children/loading'
import {
  ModalProvider,
  ProfileModalTemplates,
  useModalConsumer,
} from '../_context/modal'
import { PropertiesCommon } from '../_dependencies/Properties'
import { isAuthenticated } from '../_dependencies/Session'
import Header from './_children/header/signwall'

const MenuSignwall = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Profile-MenuSignwall' */ './_children/menu/signwall'
    )
)

const ResumeProfile = React.lazy(
  () =>
    import(/* webpackChunkName: 'Profile-ResumeProfile' */ './_children/resume')
)

const NewsLetter = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Profile-NewsLetter' */ './_children/newsletters'
    )
)

const Subscription = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Profile-Subscription' */ './_children/subscriptions'
    )
)

const MiPerfil = React.lazy(
  () => import(/* webpackChunkName: 'Profile-MiPerfil' */ './_children/profile')
)

const SubsDetail = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Profile-SubsDetail' */ './_children/subscriptions/_children/detail'
    )
)

const renderTemplate = (template: ProfileModalTemplates, id: string) => {
  const templates: Record<ProfileModalTemplates, JSX.Element> = {
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
  const { siteProperties } = useAppContext()
  const { status: identityStatus } = useSdksContext()
  const { urls: urlCommon } = PropertiesCommon

  const {
    changeTemplate,
    selectedTemplate,
    idTemplate,
    userLoading,
    updateLoading,
  } = useModalConsumer()

  useSentry(urlCommon.sentrySign)

  React.useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/?ref=signwall'
    }
  }, [])

  React.useEffect(() => {
    updateLoading(identityStatus === SdkStatus.loading)
  }, [identityStatus])

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
                <MenuSignwall
                  handleMenu={(item: ProfileModalTemplates) =>
                    changeTemplate(item)
                  }
                />
              </React.Suspense>
            </div>
            <div className="panel-right">
              {siteProperties.activePaywall ? (
                renderTemplate(
                  selectedTemplate as ProfileModalTemplates,
                  idTemplate
                )
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

const ProfileSignwall = (): JSX.Element => (
  <SdksProvider>
    <ModalProvider>
      <WrapperProfile />
    </ModalProvider>
  </SdksProvider>
)

ProfileSignwall.label = 'Signwall - Página Perfil de Usuario'

export default ProfileSignwall
