import Sales from '@arc-publishing/sdk-sales'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import {
  SdkStatus,
  useSdksContext,
} from '../../../../../contexts/subscriptions-sdks'
import { extendSession } from '../../../../../utilities/subscriptions/identity'
import FormIntro from '../../../../signwall/_children/forms/form_intro'
import Loading from '../../../../signwall/_children/loading'
import { useModalContext } from '../../../_context/modal'
import Subs from '../resume/_children/subs'

const Subscription = (): JSX.Element => {
  const { arcSite } = useAppContext()
  const { signwall: { primaryFont } = {} } = getProperties(arcSite)
  const { status } = useSdksContext()
  const { changeTemplate } = useModalContext()

  const [showLoading, setShowLoading] = React.useState(true)
  const [showSubs, setShowSubs] = React.useState(false)

  const getListSubs = () => {
    extendSession().then(() => {
      Sales.getAllActiveSubscriptions()
        .then((res) => {
          if (Array.isArray(res) && res.length > 0) {
            setShowSubs(true)
          }
          setShowLoading(false)
        })
        .catch((error) => {
          Sentry.captureEvent({
            message:
              'Error al obtener suscripciones activas - Sales.getAllActiveSubscriptions()',
            level: Sentry.Severity.Error,
            extra: error || {},
          })
        })
    })
  }

  React.useEffect(() => {
    if (status === SdkStatus.Ready) {
      getListSubs()
    }
  }, [status])

  return (
    <div className="sign-profile_general-wrapper">
      {!showLoading ? (
        <>
          {showSubs ? (
            <Subs detail={(id: number) => changeTemplate('detail', id)} />
          ) : (
            <div className="sign-profile_general-resume-dates">
              <div className="cont-plan">
                <div className="first-plan">
                  <p>Accede ilimitadamente a nuestro contenido, adquiere el:</p>
                  <h3
                    className="sign-profile_general-title"
                    style={{
                      fontFamily: primaryFont,
                      fontSize: '40px',
                    }}>
                    Plan Digital
                  </h3>
                </div>
                <div className="last-plan">
                  <FormIntro typeDialog="organico" />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading typeBg="block" />
      )}
    </div>
  )
}

export default Subscription
