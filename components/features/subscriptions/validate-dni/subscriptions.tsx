import { useAppContext } from 'fusion:context'
import * as React from 'react'
import TextMask from 'react-text-mask'

import { isProd } from '../../../utilities/arc/env'
import { AuthContext } from '../_context/auth'
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

type Attributes = {
  name: string
  value: string
}

type DocumentType = 'DNI' | 'CDI' | 'CEX'

type PrintedSubscriber = {
  documentType: DocumentType
  documentNumber: number
}

type PaywallCampaign = {
  name: string
  printAttributes: Attributes[]
  printedSubscriber?: PrintedSubscriber
  event?: string
}

const SubscriptionsValidateDNI = () => {
  const {
    userLoaded,
    userStep,
    updateLoading,
    userDataPlan,
  } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)
  const [showDocOption, setShowDocOption] = React.useState<DocumentType>('DNI')
  const { urls, texts } = PropertiesCommon
  const {
    globalContent: {
      name: planName = '',
      printAttributes = [],
      printedSubscriber = undefined,
      event = undefined,
    } = {},
  } = useAppContext<PaywallCampaign>() || {}

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

  const handleValidateDNI = ({ vDocumentType, vDocumentNumber }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      window.dataLayer.push({
        event: 'paywall_check_subscriptor',
        eventCategory: 'paywall_check_subscriptor',
        eventAction: 'submit',
      })
      window.Identity.heartbeat()
        .then((resHeart) => {
          subDniToken(urls.subsDniToken, resHeart.accessToken)
            .then((resDniToken) => {
              if (resDniToken.token) {
                updateLoading(true)
                const isEvent = event ? `${event}/` : ''
                setTimeout(() => {
                  window.location.href = isProd
                    ? `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/${isEvent}`
                    : `/suscripcionesdigitales/${vDocumentType}/${vDocumentNumber}/${resDniToken.token}/${isEvent}?outputType=subscriptions`
                }, 1000)
              } else {
                window.console.error('Hubo un error con la respuesta') // Temporal hasta implementar Sentry
                setLoading(false)
              }
            })
            .catch((errDniToken) => {
              window.console.error(errDniToken) // Temporal hasta implementar Sentry
              setLoading(false)
            })
        })
        .catch((errHeart) => {
          window.console.error(errHeart) // Temporal hasta implementar Sentry
          setLoading(false)
        })
    }
    return ''
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
  } = useForm(stateSchema, stateValidatorSchema, handleValidateDNI)

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
                            setShowDocOption(e.target.value as DocumentType)
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
                  {' - '} {period[userDataPlan.billingFrequency]}
                </span>
              </h5>
            </div>
            <div>
              <span className="price-item">
                {getPlanAmount(userDataPlan.amount)}
              </span>
              <i className={styles.iconUp} />
            </div>
          </button>
        </section>
      )}
    </>
  )
}

export default SubscriptionsValidateDNI
