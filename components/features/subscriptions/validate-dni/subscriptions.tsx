import Identity from '@arc-publishing/sdk-identity'
import { isUserIdentity } from '@arc-publishing/sdk-identity/lib/sdk/userIdentity'
import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'
import { FC } from 'types/features'
import { PaywallCampaign, UserDocumentType } from 'types/subscriptions'

import { SdksProvider } from '../../../contexts/subscriptions-sdks'
import useSentry from '../../../hooks/useSentry'
import { isProd } from '../../../utilities/arc/env'
import { AuthProvider, useAuthContext } from '../_context/auth'
import { PropertiesCommon } from '../_dependencies/Properties'
import { docPatterns, maskDocuments } from '../_dependencies/Regex'
import { subDniToken } from '../_dependencies/Services'
import useForm from '../_hooks/useForm'

const styles = {
  wrapper: 'validate__grid wrapper-buy',
  info: 'grid-two-one-buy validate__banner-info',
  form: 'grid-two-two-buy validate__banner-form tooltip',
  tooltip: 'tooltiptext-bottomarrow',
}

type ValidateDocumentProps = {
  vDocumentType: UserDocumentType
  vDocumentNumber: string
}

export const SubscriptionsValidateDNI = (): JSX.Element => {
  const { userLoaded, userStep, updateLoading } = useAuthContext()

  const [loading, setLoading] = React.useState(false)
  const [showDocOption, setShowDocOption] = React.useState<UserDocumentType>(
    'DNI'
  )
  const { urls, texts } = PropertiesCommon
  const {
    globalContent: {
      printAttributes = [],
      printedSubscriber = false,
      event = undefined,
      freeAccess = false,
    } = {},
  } = useAppContext<PaywallCampaign>()

  useSentry(urls.sentrySubs)

  const textsAttr: Record<string, string> = printAttributes.reduce(
    (prev, item) => ({ ...prev, [item.name]: item.value }),
    {}
  )

  const stateSchema = {
    vDocumentType: { value: 'DNI', error: '' },
    vDocumentNumber: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    vDocumentType: {
      required: true,
    },
    vDocumentNumber: {
      required: true,
      validator: {
        func: (value: string) =>
          docPatterns[showDocOption].test(value.replace(/\s/g, '')) &&
          value !== '00000000',
        error: 'Formato inválido.',
      },
    },
  }

  const handleValidateDNI = ({
    vDocumentType,
    vDocumentNumber,
  }: ValidateDocumentProps) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'paywall_check_subscriptor',
        eventCategory: 'paywall_check_subscriptor',
        eventAction: 'submit',
      })
      Identity.heartbeat()
        .then((resHeart) => {
          if (isUserIdentity(resHeart)) {
            subDniToken(urls.subsDniToken, resHeart.accessToken)
              .then((resDniToken) => {
                if (resDniToken.token) {
                  updateLoading(true)
                  const currentEvent = event ? `${event}/` : ''
                  setTimeout(() => {
                    window.location.href = isProd
                      ? `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/${currentEvent}`
                      : `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/${currentEvent}?outputType=subscriptions`
                  }, 1000)
                } else {
                  Sentry.captureEvent({
                    message: 'La validación de DNI no ha retornado un token',
                    level: Sentry.Severity.Error,
                    extra: resDniToken || {},
                  })
                  setLoading(false)
                }
              })
              .catch((errDniToken) => {
                Sentry.captureEvent({
                  message:
                    'Error al validar el DNI y obtener el token de usuario',
                  level: Sentry.Severity.Error,
                  extra: errDniToken || {},
                })
                setLoading(false)
              })
          }
        })
        .catch((errHeartbeat) => {
          Sentry.captureEvent({
            message:
              'Error al refrescar el token de usuario con Identity.heartbeat() para validar DNI',
            level: Sentry.Severity.Error,
            extra: errHeartbeat || {},
          })
          setLoading(false)
        })
    }
  }

  const {
    values: { vDocumentNumber, vDocumentType },
    errors: { vDocumentNumber: vDocumentNumberError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm<ValidateDocumentProps>(
    stateSchema,
    stateValidatorSchema,
    handleValidateDNI
  )

  return (
    <>
      {!freeAccess && !printedSubscriber && (userStep === 1 || userStep === 2) && (
        <footer className="validate" id="validate">
          <div className={styles.wrapper}>
            <>
              <div className={styles.info}>
                {userLoaded && (userStep === 1 || userStep === 2) ? (
                  <>
                    <h4>{textsAttr.subscriber_title_banner}</h4>
                    <p>
                      {textsAttr.subscriber_detail_banner}
                      <span>{textsAttr.subscriber_regular_period}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <h4>{texts.titleValidDni}</h4>
                    <p>
                      {texts.subTitleValidDni}
                      <span>especial para ti.</span>
                    </p>
                  </>
                )}
              </div>
              <div className={styles.form}>
                {userLoaded && (userStep === 1 || userStep === 2) && (
                  <>
                    <form
                      className="step__left-block"
                      onSubmit={handleOnSubmit}>
                      <div className="cont-select-input">
                        <select
                          name="vDocumentType"
                          value={vDocumentType}
                          onChange={(e) => {
                            handleOnChange(e)
                            setShowDocOption(e.target.value as UserDocumentType)
                          }}>
                          <option value="DNI">DNI</option>
                          <option value="CDI">CDI</option>
                          <option value="CEX">CEX</option>
                        </select>

                        <TextMask
                          mask={maskDocuments[vDocumentType]}
                          guide={false}
                          type="text"
                          name="vDocumentNumber"
                          maxLength={vDocumentType === 'DNI' ? 8 : 15}
                          minLength={vDocumentType === 'DNI' ? 8 : 5}
                          required
                          value={vDocumentNumber}
                          onBlur={handleOnChange}
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="cont-button">
                        <button
                          className="btn-next"
                          type="submit"
                          disabled={disable || loading}>
                          {loading ? 'Validando...' : 'Validar'}
                        </button>
                      </div>
                    </form>
                    {vDocumentNumberError && (
                      <span className={styles.tooltip}>
                        {vDocumentNumberError}
                      </span>
                    )}
                  </>
                )}
              </div>
            </>
          </div>
        </footer>
      )}
    </>
  )
}

const SubscriptionsValidateDNIContainer: FC = () => (
  <SdksProvider>
    <AuthProvider>
      <SubscriptionsValidateDNI />
    </AuthProvider>
  </SdksProvider>
)

export default SubscriptionsValidateDNIContainer
