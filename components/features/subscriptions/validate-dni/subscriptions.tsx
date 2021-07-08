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
  btnDetail: 'step__bottom-btn-detail',
  iconUp: 'icon-arrow-up',
}

type ValidateDocumentProps = {
  vDocumentType: UserDocumentType
  vDocumentNumber: string
}

const Component = () => {
  const {
    userLoaded,
    userStep,
    updateLoading,
    userDataPlan: { billingFrequency, amount: billingAmount } = {},
  } = useAuthContext()

  const [loading, setLoading] = React.useState(false)
  const [showDocOption, setShowDocOption] = React.useState<UserDocumentType>(
    'DNI'
  )
  const { urls, texts } = PropertiesCommon
  const {
    globalContent: {
      name: planName = '',
      printAttributes = [],
      printedSubscriber = false,
      event = undefined,
    } = {},
  } = useAppContext<PaywallCampaign>() || {}

  useSentry(urls.sentrySubs)

  const textsAttr: Record<string, string> = printAttributes.reduce(
    (prev, item) => ({ ...prev, [item.name]: item.value }),
    {}
  )

  const period = {
    month: 'Mensual',
    year: 'Anual',
    semester: 'Semestral',
  }

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

  /**
   * Esta function se hizo para manejar mas
   * casos de precios sin tener que anidar ternarios.
   *
   * Se espera que el caso por defecto sea '' en lugar de undefined
   *
   * @param amount
   * @returns Monto del plan como texto
   */
  const getPlanAmount = (amount: number): string => {
    let planAmount = ''
    if (amount) planAmount = `S/ ${amount}.00`
    else if (amount === 0) planAmount = 'Gratis'
    return planAmount
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
      {!printedSubscriber && (userStep === 1 || userStep === 2) && (
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

      {userStep !== 4 && (
        <section className="step__bottom">
          <button className={styles.btnDetail} type="button" id="btn-detail">
            <div>
              <span className="title-item">Resumen de pedido:</span>
              <h5 className="name-item">
                {planName}
                <span className="period-item">
                  {' - '} {billingFrequency ? period[billingFrequency] : ''}
                </span>
              </h5>
            </div>
            <div>
              <span className="price-item">
                {billingAmount ? getPlanAmount(billingAmount) : ''}
              </span>
              <i className={styles.iconUp} />
            </div>
          </button>
        </section>
      )}
    </>
  )
}

const SubscriptionsValidateDNI: FC = () => (
  <SdksProvider>
    <AuthProvider>
      <Component />
    </AuthProvider>
  </SdksProvider>
)

export default SubscriptionsValidateDNI
