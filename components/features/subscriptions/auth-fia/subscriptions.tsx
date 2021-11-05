import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { DialogType } from 'types/subscriptions'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import { deleteCookie } from '../../../utilities/client/cookies'
import Loading from '../../signwall/_children/loading'
import Forgot from '../_children/forgot'
import Login from '../_children/login'
import Register from '../_children/register'
import { AuthProvider } from '../_context/auth'
import {
  NavigateProvider,
  NavigateTemplates,
  useNavigateContext,
} from '../_context/navigate'
import { PropertiesCommon } from '../_dependencies/Properties'
import { Container, PanelLeft, Wrapper } from '../_layouts/containers'
import CallToActionFia from './_children/call_to_action'
import Header from './_children/header'

type NavigateTemplatesProps = {
  typeDialog: DialogType
  arcSite: ArcSite
  handleCallToAction?: (e: boolean) => void
  isFia?: boolean
}

const renderTemplate = (
  template: NavigateTemplates,
  contTempl: string,
  attributes: NavigateTemplatesProps
) => {
  const { typeDialog, arcSite, handleCallToAction, isFia } = attributes
  const templates: Record<NavigateTemplates, JSX.Element> = {
    login: (
      <Login
        contTempl={contTempl}
        arcSite={arcSite}
        handleCallToAction={handleCallToAction}
        isFia={isFia}
        typeDialog={typeDialog}
      />
    ),
    register: (
      <Register
        arcSite={arcSite}
        handleCallToAction={handleCallToAction}
        isFia={isFia}
        typeDialog={typeDialog}
      />
    ),
    forgot: <Forgot typeDialog={typeDialog} arcSite={arcSite} />,
  }

  return templates[template] || templates.login
}

const FiaSubscriptionsWrapper = ({
  typeDialog,
}: Pick<NavigateTemplatesProps, 'typeDialog'>) => {
  const {
    siteProperties: {
      signwall: { mainColorBr, mainColorBg, mainColorTxt },
      siteDomain,
    },
    arcSite,
  } = useFusionContext() || {}

  const { selectedTemplate, valueTemplate } = useNavigateContext()
  const { links } = PropertiesCommon
  const [isLogged, setLogged] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const handleCallToAction = (status: boolean) => {
    setLogged(status)
  }

  const logoutSession = () => {
    if (typeof window !== 'undefined') {
      deleteCookie('arc_e_id')
      deleteCookie('mpp_sess')
      deleteCookie('ArcId.USER_INFO', siteDomain)
      deleteCookie('EcoId.REQUEST_STUDENTS')

      Identity.logout()
        .then(() => {
          window.sessionStorage.removeItem('ArcId.USER_STEP') // Borrar step nueva landing de compra
          window.sessionStorage.removeItem('paywall_last_url') // url redireccion despues de compra
          setLogged(false)
        })
        .catch((error) => {
          Sentry.captureEvent({
            message: 'No se puede cerrar sesión - Identity.logout()',
            level: Sentry.Severity.Error,
            extra: error || {},
          })
          window.location.reload()
        })
    }
  }

  const buttonBack = () => {
    if (typeof window !== 'undefined') {
      window.location.href = document.referrer ? document.referrer : '/'
    }
  }

  React.useEffect(() => {
    deleteCookie('ArcId.USER_INFO', siteDomain)
    if (Identity.userProfile && Identity.userIdentity?.uuid) {
      setLogged(true)
    }
    setLoading(false)
  }, [Identity.userProfile, Identity.userIdentity])
  const p = 3
  return (
    <>
      {loading ? (
        <Loading typeBg="full" />
      ) : (
        <>
          <Header
            arcSite={arcSite}
            mainColorBg={mainColorBg}
            mainColorTxt={mainColorTxt}
            buttonBack={buttonBack}
          />
          <Container>
            <Wrapper step={p}>
              <AuthProvider>
                <PanelLeft>
                  {!isLogged ? (
                    renderTemplate(selectedTemplate, valueTemplate, {
                      arcSite,
                      isFia: true,
                      typeDialog,
                      handleCallToAction,
                    })
                  ) : (
                    <CallToActionFia
                      mainColorBr={mainColorBr}
                      logoutSession={logoutSession}
                      typeDialog={typeDialog}
                      urlPlan={links.landingFia}
                    />
                  )}
                </PanelLeft>
              </AuthProvider>
            </Wrapper>
          </Container>
        </>
      )}
    </>
  )
}

const FiaSubscriptions = (): JSX.Element => (
  <SdksProvider>
    <NavigateProvider>
      <FiaSubscriptionsWrapper typeDialog="authfia" />
    </NavigateProvider>
  </SdksProvider>
)

FiaSubscriptions.label = 'Signwall - Login / Registo FIA'

export default FiaSubscriptions
