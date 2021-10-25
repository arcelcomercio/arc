/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import {
  isSubscription,
  Subscription,
} from '@arc-publishing/sdk-sales/lib/sdk/subscription'
import * as Sentry from '@sentry/browser'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'
import { CardsProviders } from 'types/subscriptions'

import { SITE_ELCOMERCIO } from '../../../../../../utilities/constants/sitenames'
import addScriptAsync from '../../../../../../utilities/script-async'
import { extendSession } from '../../../../../../utilities/subscriptions/identity'
import { Close, Notice } from '../../../../../signwall/_children/icons'
import Loading from '../../../../../signwall/_children/loading'
import { Modal } from '../../../../../signwall/_children/modal/index'
import getCodeError from '../../../../_dependencies/Errors'
import { PropertiesCommon } from '../../../../_dependencies/Properties'
import { Taggeo } from '../../../../_dependencies/Taggeo'
import { RadioboxSimple } from './radiobox'
import UpdateCard from './update-card'

const listOptionsComercio = [
  'El precio es elevado',
  'Cuenta con otra suscripción',
  'No estoy interesado en el contenido',
  'Otro motivo',
]

const listOptionsGestion = [
  'Solo me suscribí para leer un tema puntual',
  'Ya no lo necesito para mi trabajo y/o estudios',
  'El contenido no es lo que me interesa',
  'Otro motivo',
]

const Cards: Record<CardsProviders, string> = {
  VISA: 'https://signwall.e3.pe/images/icon_visa.png',
  MASTERCARD: 'https://signwall.e3.pe/images/icon_mc.png',
  AMEX: 'https://signwall.e3.pe/images/icon_amex.png',
  DINERS: 'https://signwall.e3.pe/images/icon_diners.png',
}

type ModalEventType = 'anulacion' | 'recuperar'

interface SubsDatailProps {
  IdSubscription: number
}

const SubsDetail = ({ IdSubscription }: SubsDatailProps): JSX.Element => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorTitle, mainColorLink },
    },
  } = useFusionContext() || {}

  const { links } = PropertiesCommon

  const [showLoading, setShowLoading] = React.useState(true)
  const [showResDetail, setShowResDetail] = React.useState<Subscription>()
  const [showResLastSubs, setShowResLastSubs] = React.useState(0)
  const [showModalConfirm, setShowModalConfirm] = React.useState(false)
  const [showModalRecovery, setShowModalRecovery] = React.useState(false)
  const [showUpdateCard, setShowUpdateCard] = React.useState(false)
  const [showLastFour, setShowLastFour] = React.useState('0000')
  const [showLastCard, setShowLastCard] = React.useState<CardsProviders>('VISA')
  const [showOpenUpdate, setShowOpenUpdate] = React.useState(false)
  const [showStepCancel, setShowStepCancel] = React.useState(1)
  const [showOptionCancel, setShowOptionCancel] = React.useState<string>('')
  const [showErrorCancel, setShowErrorCancel] = React.useState('')
  const [showLoadCancel, setShowLoadCancel] = React.useState('')
  const [showLoadRescue, setShowLoadRescue] = React.useState('')
  const [txtMotivo, setTxtMotivo] = React.useState('')
  const [showCardSuccess, setShowCardSuccess] = React.useState(false)

  const validateMotivo = () => {
    let respuesta = ''
    if (txtMotivo.length <= 0) {
      respuesta = 'Campo obligatorio'
    }
    if (txtMotivo.length >= 1 && txtMotivo.length <= 9) {
      respuesta = 'Mínimo 10 caracteres'
    }
    // eslint-disable-next-line no-useless-escape
    const paternValMotivo = /^([a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\!\¡\?\¿\-]+\s)*[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\!\¡\?\¿\-]+$/
    if (txtMotivo.length > 0 && !txtMotivo.match(paternValMotivo)) {
      respuesta = 'Formato inválido o caracteres no permitidos'
    }
    return respuesta
  }

  React.useEffect(() => {
    extendSession()
      .then(() => {
        Sales.getSubscriptionDetails(IdSubscription)
          .then((resDetail) => {
            if (isSubscription(resDetail)) {
              setShowResDetail(resDetail)

              if (resDetail.currentPaymentMethod.creditCardType) {
                setShowLastCard(
                  resDetail.currentPaymentMethod.creditCardType
                    .replace(/\s|Club/gi, '')
                    .toUpperCase() as CardsProviders
                )
              }

              if (resDetail.currentPaymentMethod.lastFour) {
                setShowLastFour(resDetail.currentPaymentMethod.lastFour)
              }

              if (Array.isArray(resDetail.paymentHistory)) {
                setShowResLastSubs(
                  resDetail.paymentHistory[resDetail.paymentHistory.length - 1]
                    .periodTo
                )
              }
            }
          })
          .catch((error) => {
            Sentry.captureEvent({
              message:
                'Error al obtener detalles de subscripción - Sales.getSubscriptionDetails()',
              level: Sentry.Severity.Error,
              extra: error || {},
            })
          })
      })
      .finally(() => {
        setShowLoading(false)
      })
  }, [IdSubscription])

  React.useEffect(() => {
    addScriptAsync({
      name: 'PayuSDK',
      url: links.payu,
      includeNoScript: false,
    }).then(() => {
      window.payU.setURL(links.payuPayments)
      window.payU.setPublicKey(links.payuPublicKey)
      window.payU.setAccountID(links.payuAccountID)
      window.payU.setListBoxID('mylistID')
      window.payU.setLanguage('es')
      window.payU.getPaymentMethods()
    })
  }, [])

  const openModalConfirm = (type: ModalEventType) => {
    if (type === 'anulacion') {
      setShowModalConfirm(true)
      Taggeo(`Web_Sign_Wall_General`, `web_swg_open_anulacion_step1`)
    } else {
      setShowModalRecovery(true)
      Taggeo(`Web_Sign_Wall_General`, `web_swg_open_recuperar`)
    }

    const ProfileSignwall = document.getElementById('profile-signwall')

    const ModalProfile = ProfileSignwall?.parentElement
    if (ModalProfile) {
      ModalProfile.style.overflow = 'hidden'
    }

    setTimeout(() => {
      const modalConfirmPass = ProfileSignwall
      modalConfirmPass?.scrollIntoView()
    }, 500)
  }

  const closeModalConfirm = (type: ModalEventType) => {
    if (type === 'anulacion') {
      setShowModalConfirm(!showModalConfirm)
      setShowStepCancel(1)
      setShowOptionCancel('')
      setShowErrorCancel('')
      setTxtMotivo('')
      Taggeo(`Web_Sign_Wall_General`, `web_swg_close_anulacion`)
    } else {
      setShowModalRecovery(false)
      Taggeo(`Web_Sign_Wall_General`, `web_swg_close_recuperar`)
    }

    const ProfileSignwall = document.getElementById('profile-signwall')
    const ModalProfile = ProfileSignwall?.parentElement

    if (ModalProfile) {
      if (showModalConfirm) {
        ModalProfile.style.overflow = 'auto'
      } else {
        ModalProfile.style.overflow = 'hidden'
      }
    }
  }

  const recoverySubscription = (idSubsRecovery: number) => {
    setShowLoadRescue('Recuperando...')
    extendSession().then(() => {
      Sales.rescueSubscription(idSubsRecovery)
        .then(() => {
          Taggeo(`Web_Sign_Wall_General`, `web_swg_success_recuperacion`)
          document.getElementById('btn-subs')?.click()
        })
        .catch(() => {
          Taggeo(`Web_Sign_Wall_General`, `web_swg_error_recuperacion`)
        })
        .finally(() => {
          setShowLoadRescue('')
        })
    })
  }

  const deleteSubscription = (idSubsDelete: number, option: string) => {
    if (typeof window !== 'undefined') {
      setShowLoadCancel('Finalizando...')

      const valMotivo = option === 'Otro motivo' ? txtMotivo.trim() : option
      extendSession().then(() => {
        Sales.cancelSubscription(idSubsDelete, valMotivo || undefined)
          .then(() => {
            Taggeo(`Web_Sign_Wall_General`, `web_swg_success_anulacion`)
            document.getElementById('btn-subs')?.click()
          })
          .catch((resError) => {
            setShowErrorCancel(getCodeError(resError.code))
            Taggeo(`Web_Sign_Wall_General`, `web_swg_error_anulacion`)
          })
          .finally(() => {
            setShowLoadCancel('')
          })
      })
    }
  }

  const dateFormat = (date: number) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const formatDay = day <= 9 ? `0${day}` : day
    const formatMonth = month <= 9 ? `0${month}` : month
    return `${formatDay}/${formatMonth}/${year}`
  }

  const docFormat = (doc: string | null | undefined) =>
    doc ? doc.replace('_', ': ') : 'Sin Documento'

  const nameFormat = () => {
    if (typeof window !== 'undefined') {
      return Identity.userProfile
        ? `${Identity.userProfile.firstName || 'Usuario'} ${
            Identity.userProfile.lastName || ''
          }`
        : 'Usuario'
    }
    return false
  }

  const periodFormat = (to: number, from: number) => {
    if (to && from) {
      const daysPeriod = (to - from) / (1000 * 60 * 60 * 24)
      switch (true) {
        case daysPeriod >= 88 && daysPeriod <= 93:
          return 'TRIMESTRAL'
        case daysPeriod >= 178 && daysPeriod <= 186:
          return 'SEMESTRAL'
        case daysPeriod >= 358 && daysPeriod <= 372:
          return 'ANUAL'
        default:
          return 'MENSUAL'
      }
    }
    return '-'
  }

  const blockBtnUpdate = (status: typeof showOpenUpdate) => {
    setShowOpenUpdate(status)
  }

  const successUpdate = (
    lastNumbers: typeof showLastFour,
    cardProvider: typeof showLastCard
  ) => {
    setShowCardSuccess(true)
    setShowLastFour(lastNumbers)
    setShowLastCard(cardProvider)
    setShowUpdateCard(false)
    setTimeout(() => {
      setShowCardSuccess(false)
    }, 6000)
  }

  return (
    <div className="sign-profile_general-wrapper">
      {showLoading ? (
        <Loading typeBg="block" />
      ) : (
        <div className="sign-profile_subscriptions-wrapper-block">
          <div
            className="sign-profile_subscriptions-subs-detail"
            style={{
              padding: '0px',
              columnCount: 0,
            }}>
            <div className="details-left">
              <div id="mylistID" style={{ display: 'none' }} />
              <small>DETALLE DE LA SUSCRIPCIÓN</small>
              <h2>{showResDetail?.productName}</h2>
              <p>
                Plan Pago:{' '}
                <strong>
                  {periodFormat(
                    showResDetail?.paymentHistory?.[0].periodTo || 0,
                    showResDetail?.paymentHistory?.[0].periodFrom || 0
                  )}
                </strong>
              </p>
              <p>
                Precio:
                <strong> S/ {showResDetail?.salesOrders?.[0].total} </strong>
              </p>
              <p>
                Estado:
                {showResDetail?.status === 3 ? (
                  <strong className="orange"> ANULADO</strong>
                ) : (
                  <strong className="green"> ACTIVO</strong>
                )}
              </p>
            </div>

            <div className="details-right">
              <p>
                <strong>BENEFICIOS</strong>
              </p>
              <ul>
                {arcSite === SITE_ELCOMERCIO ? (
                  <>
                    <li>
                      Acceso sin límites a información exclusiva: reportajes,
                      informes y la mejor selección de historias elaboradas por
                      El Comercio.
                    </li>
                    <li>
                      Navegación ilimitada a elcomercio.pe desde todos tus
                      dispositivos.
                    </li>
                  </>
                ) : (
                  <>
                    {showResDetail?.productName &&
                    showResDetail.productName.indexOf('Universitario') >= 0 ? (
                      <>
                        <li>
                          Acceso a Plus G: análisis e informes exclusivos.
                        </li>
                        <li>
                          Potencia tu perfil: datos sobre empleabilidad,
                          finanzas y más.
                        </li>
                        <li>Fácil acceso: desde cualquier dispositivo.</li>
                      </>
                    ) : (
                      <>
                        <li>
                          Contenido premium: análisis e informes exclusivamente
                          desarrollados para gestion.pe. Navegación ilimitada
                          desde todos tus dispositivos.
                        </li>
                        <li>
                          La mejor selección de artículos e informes elaborados
                          por el diario Gestión, The Economist y la agencia
                          Bloomberg.
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>

          {showResDetail?.status !== 3 && (
            <fieldset
              className="sign-profile_subscriptions-fieldset"
              id="div-signwall-updatecard">
              <legend>Método de pago</legend>

              {showCardSuccess && (
                <div className="sign-profile_subscriptions-message sign-profile_subscriptions-message-success">
                  Se actualizó correctamente los datos de la tarjeta.
                </div>
              )}

              <div className="left">
                <img src={Cards[showLastCard]} alt={showLastCard} />
                <p>
                  &nbsp;&nbsp; que termina en
                  <strong>{` ${showLastFour}`}</strong>
                </p>
              </div>
              <div className="right">
                <button
                  type="button"
                  className="sign-profile_general-button"
                  disabled={showOpenUpdate}
                  id="btn-signwall-editcard"
                  style={{ background: mainColorLink }}
                  onClick={() => {
                    setShowUpdateCard(!showUpdateCard)
                  }}>
                  {showUpdateCard ? 'CERRAR' : 'EDITAR'}
                </button>
              </div>
            </fieldset>
          )}

          {showUpdateCard && (
            <UpdateCard
              IdSubscription={IdSubscription}
              arcSite={arcSite}
              mainColorBtn={mainColorLink}
              detailSubs={showResDetail}
              cardSelected={showLastCard}
              blockBtnUpdate={blockBtnUpdate}
              successUpdate={successUpdate}
            />
          )}

          <div
            className="sign-profile_subscriptions-block"
            style={{
              borderTop: '1px solid #e8e8e8',
              textAlign: 'right',
            }}>
            {showResDetail?.status !== 3 ? (
              <button
                type="button"
                className="sign-profile_general-button sign-profile_general-button-link"
                onClick={() => {
                  Taggeo(`Web_Sign_Wall_General`, `web_swg_boton_anulacion`)
                  openModalConfirm('anulacion')
                }}>
                ANULAR MI SUSCRIPCIÓN
              </button>
            ) : (
              <button
                type="button"
                className="sign-profile_general-button sign-profile_general-button-link"
                onClick={() => {
                  Taggeo(`Web_Sign_Wall_General`, `web_swg_boton_recuperar`)
                  openModalConfirm('recuperar')
                }}>
                RECUPERAR MI SUSCRIPCIÓN
              </button>
            )}
          </div>

          <fieldset className="sign-profile_subscriptions-fieldset">
            <legend>Historial del pago</legend>
            <div className="cont-table">
              <table className="sign-profile_general-table">
                <thead>
                  <tr>
                    <th className="left">Suscriptor</th>
                    <th>Producto</th>
                    <th>Plan</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(showResDetail?.paymentHistory)
                    ? showResDetail?.paymentHistory.map((reSubs) => (
                        <tr key={reSubs.transactionDate}>
                          <td>
                            <strong>{nameFormat()}</strong>
                            <p>
                              {docFormat(showResDetail.billingAddress.line2)}
                            </p>
                          </td>
                          <td className="center">
                            {showResDetail.productName || 'Ninguno'}
                          </td>
                          <td className="center">
                            {periodFormat(reSubs.periodTo, reSubs.periodFrom)}
                          </td>
                          <td className="center">
                            {dateFormat(reSubs.transactionDate)}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </fieldset>

          <div className="sign-profile_subscriptions-notice">
            <Notice />
            <div>
              <strong>
                Para cualquier gestión o consulta sobre tu suscripción
              </strong>
              <p>
                Contactanos enviando un correo a
                atencionalcliente@comercio.com.pe
              </p>
            </div>
          </div>
        </div>
      )}

      {showModalConfirm && (
        <Modal size="small" position="middle" bgColor="white" arcSite={arcSite}>
          <button
            className="close-modal"
            type="button"
            onClick={() => {
              closeModalConfirm('anulacion')
            }}>
            <Close />
          </button>

          <form className="signwall-inside_forms-form">
            {showStepCancel === 1 && (
              <>
                {arcSite === SITE_ELCOMERCIO ? (
                  <>
                    <h4
                      style={{
                        fontSize: '16px',
                      }}
                      className="signwall-inside_forms-title justify mt-40 mb-20">
                      Queremos que sepas que gracias a tu suscripción podemos
                      reforzar nuestro compromiso con el periodismo de calidad.
                    </h4>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Nuestro trabajo periodístico va más allá de mantenerte
                      informado. Queremos darte una opción de análisis para que
                      tomes decisiones a través de contenidos exclusivos y notas
                      de valor agregado especialmente creados para ti.
                    </p>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text  justify mb-20">
                      Gracias a lectores como tú renovamos a diario nuestro
                      deber con la información veraz y confiable que nos
                      permiten mantener más de 180 años de trayectoria.
                    </p>
                  </>
                ) : (
                  <>
                    <h4
                      style={{
                        fontSize: '16px',
                      }}
                      className="signwall-inside_forms-title justify mt-40 mb-20">
                      Lamentamos mucho que estés por tomar la decisión de
                      cancelar tu suscripción con Gestion.pe y quieras dejar de
                      formar parte de nuestro selecto grupo de suscriptores.
                    </h4>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Durante todo el tiempo que estás con nosotros, un
                      experimentado equipo de 50 periodistas trabaja
                      intensamente para ofrecerte primicias y una selección de
                      las noticias más importantes de economía y negocios del
                      Perú y el mundo, lo que incluye a alrededor de 600
                      artículos mensuales Plus G exclusivos para suscriptores.
                    </p>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-20">
                      ¿Deseas continuar con la anulación de tu suscripción?
                    </p>
                  </>
                )}

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                  }}>
                  <button
                    type="button"
                    className="sign-profile_general-button sign-profile_general-button-border"
                    onClick={() => {
                      setShowStepCancel(2)
                      Taggeo(
                        `Web_Sign_Wall_General`,
                        `web_swg_open_anulacion_step2`
                      )
                    }}>
                    Continuar con la anulación
                  </button>
                </div>
              </>
            )}

            {showStepCancel === 2 && (
              <>
                <h4
                  style={{ fontSize: '20px', color: mainColorTitle }}
                  className="signwall-inside_forms-title center mt-40 mb-20">
                  ¿De qué te perderás si cancelas tu suscripción?
                </h4>

                {arcSite === SITE_ELCOMERCIO ? (
                  <>
                    <h4
                      style={{ fontSize: '16px' }}
                      className="signwall-inside_forms-title justify mt-10 mb-10">
                      Con tu Plan Digital tienes acceso exclusivo a:
                    </h4>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Reportajes, entrevistas, artículos de opinión,
                      suplementos, informes y la mejor selección de historias
                      elaboradas por El Comercio, todo creado especialmente para
                      ti.
                    </p>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Navegación ilimitada a {arcSite}.pe desde todos tus
                      dispositivos.
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Contenido premium Plus G exclusivo para suscriptores
                    </p>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-10">
                      Lectura ilimitada del contenido abierto desde todos tus
                      dispositivos.
                    </p>

                    <p
                      style={{
                        color: '444444',
                        fontSize: '14px',
                        lineHeight: '26px',
                      }}
                      className="signwall-inside_forms_text justify mb-20">
                      La mejor selección de artículos e informes elaborados por
                      el diario Gestión, The Economist y la agencia Bloomberg.
                    </p>
                  </>
                )}

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                  }}>
                  <button
                    type="button"
                    className="sign-profile_general-button sign-profile_general-button-border"
                    onClick={() => {
                      setShowStepCancel(3)
                      Taggeo(
                        `Web_Sign_Wall_General`,
                        `web_swg_open_anulacion_step3`
                      )
                    }}>
                    Continuar con la anulación
                  </button>
                </div>
              </>
            )}

            {showStepCancel === 3 && (
              <>
                <h4
                  style={{
                    fontSize: '20px',
                    color: mainColorTitle,
                  }}
                  className="signwall-inside_forms-title center mt-40 mb-20">
                  {` ${
                    new Date() >= new Date(showResLastSubs)
                      ? 'Tu suscripción no se puede anular, ya que se encuentra en proceso de renovación automática desde el'
                      : 'Ten en cuenta que solo tendrás acceso a tu plan digital hasta el'
                  }  ${dateFormat(showResLastSubs)}`}
                </h4>

                <h4
                  style={{
                    fontSize: '16px',
                  }}
                  className="signwall-inside_forms-title center mt-20 mb-20">
                  {`${
                    new Date() >= new Date(showResLastSubs)
                      ? '¿Deseas renovar en este momento?'
                      : '¿Deseas continuar con la anulación de tu suscripción?'
                  } `}
                </h4>

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '10px',
                    paddingBottom: '20px',
                  }}>
                  {new Date() >= new Date(showResLastSubs) ? (
                    <>
                      <div className="sign-profile_subscriptions-form-group">
                        <button
                          type="button"
                          className="sign-profile_general-button"
                          onClick={() => {
                            closeModalConfirm('anulacion')
                          }}>
                          Cancelar
                        </button>
                      </div>

                      <div className="sign-profile_subscriptions-form-group">
                        <button
                          type="button"
                          className="sign-profile_general-button sign-profile_general-button-border"
                          onClick={() => {
                            Taggeo(
                              `Web_Sign_Wall_General`,
                              `web_swg_boton_anulacion_renovar`
                            )
                            setShowUpdateCard(true)
                            closeModalConfirm('anulacion')
                            setTimeout(() => {
                              const divUpdateCard = document.getElementById(
                                'div-signwall-updatecard'
                              )
                              if (divUpdateCard) divUpdateCard.scrollIntoView()
                            }, 100)
                          }}>
                          Renovar suscripción
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="sign-profile_general-button sign-profile_general-button-border"
                      onClick={() => {
                        setShowStepCancel(4)
                        Taggeo(
                          `Web_Sign_Wall_General`,
                          `web_swg_open_anulacion_step4`
                        )
                      }}>
                      Continuar con la anulación
                    </button>
                  )}
                </div>
              </>
            )}

            {showStepCancel === 4 && (
              <>
                <h4
                  style={{
                    fontSize: '20px',
                    color: mainColorTitle,
                  }}
                  className="signwall-inside_forms-title center mt-40 mb-20">
                  Finalizar suscripción
                </h4>

                {showErrorCancel && (
                  <div className="sign-profile_subscriptions-message sign-profile_subscriptions-message-failed">
                    {showErrorCancel}
                  </div>
                )}

                <h4
                  style={{ fontSize: '16px' }}
                  className="signwall-inside_forms-title justify mt-10 mb-10">
                  Antes de hacer efectiva la anulación, por favor, cuéntanos los
                  motivos por los que deseas anular tu suscripción:
                </h4>

                {arcSite === SITE_ELCOMERCIO
                  ? listOptionsComercio.map((item) => (
                      <label key={item}>
                        <RadioboxSimple
                          key={item}
                          name={item}
                          checked={showOptionCancel === item}
                          onChange={() => {
                            setShowOptionCancel(item)
                          }}
                          value={item}
                        />
                      </label>
                    ))
                  : listOptionsGestion.map((item) => (
                      <label key={item}>
                        <RadioboxSimple
                          key={item}
                          name={item}
                          checked={showOptionCancel === item}
                          onChange={() => {
                            setShowOptionCancel(item)
                          }}
                          value={item}
                        />
                      </label>
                    ))}

                {showOptionCancel === 'Otro motivo' && (
                  <div
                    className="sign-profile_subscriptions-block"
                    style={{
                      paddingTop: '10px',
                    }}>
                    <div
                      style={{
                        width: '100%',
                        margin: '0px',
                      }}
                      className={`sign-profile_subscriptions-form-group ${
                        validateMotivo() ? 'group-required' : ''
                      }`}>
                      <p>{validateMotivo()}</p>
                      <textarea
                        id="motivo-detalle"
                        required={showOptionCancel === 'Otro motivo'}
                        onChange={(e) => {
                          setTxtMotivo(e.target.value)
                          validateMotivo()
                        }}
                        value={txtMotivo}
                        placeholder="Ingresa motivo"
                        maxLength={200}
                      />
                    </div>
                  </div>
                )}

                <div
                  className="sign-profile_subscriptions-block"
                  style={{
                    textAlign: 'center',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                  }}>
                  <div className="sign-profile_subscriptions-form-group">
                    <button
                      type="button"
                      className="sign-profile_general-button"
                      onClick={() => {
                        closeModalConfirm('anulacion')
                      }}>
                      Cancelar
                    </button>
                  </div>
                  <div className="sign-profile_subscriptions-form-group">
                    <button
                      type="button"
                      className="sign-profile_general-button sign-profile_general-button-border"
                      disabled={
                        showOptionCancel === '' ||
                        (showOptionCancel === 'Otro motivo' &&
                          !!validateMotivo()) ||
                        !!showLoadCancel
                      }
                      onClick={() => {
                        if (showResDetail?.subscriptionID) {
                          deleteSubscription(
                            showResDetail.subscriptionID,
                            showOptionCancel
                          )
                          Taggeo(
                            `Web_Sign_Wall_General`,
                            `web_swg_boton_finalizar_anulacion`
                          )
                        }
                      }}>
                      {showLoadCancel || 'Finalizar Suscripción'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </Modal>
      )}

      {showModalRecovery && (
        <Modal size="small" position="middle" bgColor="white" arcSite={arcSite}>
          <button
            className="close-modal"
            type="button"
            onClick={() => {
              closeModalConfirm('recuperar')
            }}>
            <Close />
          </button>

          <form className="signwall-inside_forms-form">
            <h4
              style={{ fontSize: '18px' }}
              className="signwall-inside_forms-title center mt-40 mb-20">
              Confirmar Recuperación
            </h4>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '26px',
              }}
              className="signwall-inside_forms-text center mb-10">
              Al recuperar se volverá a activar la recurrencia de pagos de
              acuerdo a su plan.
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '26px',
              }}
              className="signwall-inside_forms-text center mb-10">
              ¿Desea recuperar su suscripción?
            </p>
            <div
              className="sign-profile_subscriptions-block"
              style={{ textAlign: 'center', paddingTop: '20px' }}>
              <div className="sign-profile_subscriptions-form-group">
                <button
                  type="button"
                  className="sign-profile_general-button"
                  onClick={() => {
                    closeModalConfirm('recuperar')
                  }}>
                  Cancelar
                </button>
              </div>
              <div className="sign-profile_subscriptions-form-group">
                <button
                  type="button"
                  className="sign-profile_general-button sign-profile_general-button-border"
                  disabled={!!showLoadRescue}
                  onClick={() => {
                    if (showResDetail?.subscriptionID) {
                      recoverySubscription(showResDetail.subscriptionID)
                      Taggeo(
                        `Web_Sign_Wall_General`,
                        `web_swg_boton_finalizar_recuperacion`
                      )
                    }
                  }}>
                  {showLoadRescue || 'Recuperar'}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default SubsDetail
