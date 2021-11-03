/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import Identity from '@arc-publishing/sdk-identity'
import Sales from '@arc-publishing/sdk-sales'
import { Subscription } from '@arc-publishing/sdk-sales/lib/sdk/subscription'
import * as Sentry from '@sentry/browser'
import * as React from 'react'
import TextMask from 'react-text-mask'
import { ArcSite } from 'types/fusion'
import { SiteProperties } from 'types/properties'
import { CardsProviders } from 'types/subscriptions'

import { extendSession } from '../../../../../../utilities/subscriptions/identity'
import { ContMask } from '../../../../../signwall/_children/forms/control_input_select'
import Loading from '../../../../../signwall/_children/loading'
import {
  finalizePaymentUpdate,
  getProfilePayu,
  initPaymentUpdate,
} from '../../../../../signwall/_dependencies/services'
import getCodeError, {
  formatCvv,
  formatExpire,
} from '../../../../_dependencies/Errors'
import {
  patterCvv,
  patternCard,
  patternDate,
} from '../../../../_dependencies/Regex'
import useForm from '../../../../_hooks/useForm'
import { Radiobox } from './radiobox'

type CardListItem = {
  name: CardsProviders
  image: string
}
interface UpdateCardProps {
  IdSubscription: number
  arcSite: ArcSite
  mainColorBtn: SiteProperties['signwall']['mainColorLink']
  detailSubs: Subscription | undefined
  cardSelected: CardsProviders
  blockBtnUpdate: (status: boolean) => void
  successUpdate: (lastNumbers: string, cardProvider: CardsProviders) => void
}

const ListCards: CardListItem[] = [
  {
    name: 'VISA',
    image: 'https://signwall.e3.pe/images/icon_visa.png',
  },
  {
    name: 'MASTERCARD',
    image: 'https://signwall.e3.pe/images/icon_mc.png',
  },
  {
    name: 'AMEX',
    image: 'https://signwall.e3.pe/images/icon_amex.png',
  },
  {
    name: 'DINERS',
    image: 'https://signwall.e3.pe/images/icon_diners.png',
  },
]

const cardPatterns: Record<CardsProviders, RegExp> = {
  VISA: /^(4)(\d{12}|\d{15})$|^(606374\d{10}$)/,
  MASTERCARD: /^(5[1-5]\d{14}$)|^(2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$)/,
  AMEX: /^3[47][0-9]{13}$/,
  DINERS: /(^[35](?:0[0-5]|[268][0-9])[0-9]{11}$)|(^30[0-5]{11}$)|(^3095(\d{10})$)|(^36{12}$)|(^3[89](\d{12})$)/,
}

const UpdateCard = ({
  IdSubscription,
  arcSite,
  mainColorBtn,
  detailSubs,
  cardSelected,
  blockBtnUpdate,
  successUpdate,
}: UpdateCardProps): JSX.Element => {
  const [showLoadingSubmit, setShowLoadingSubmit] = React.useState(false)
  const [showCustomMsgFailed, setShowCustomMsgFailed] = React.useState('')
  const [showTypeAmex, setShowTypeAmex] = React.useState(false)
  const [showMessageFailed, setShowMessageFailed] = React.useState(false)
  const [showSelectedOption, setShowSelectedOption] = React.useState(
    cardSelected || 'VISA'
  )
  const [loadingCard, setLoadingCard] = React.useState(false)

  React.useEffect(() => {
    const { email, uuid, firstName, lastName, secondLastName, emailVerified } =
      Identity.userProfile || {}

    Sentry.configureScope((scope) => {
      scope.setTag('email', email || 'none')
      scope.setTag('step', 'UpdateCardProfile')
      scope.setUser({
        id: uuid,
        name: `${firstName} ${lastName} ${secondLastName}`,
        email,
        emailVerified,
      })
    })
  }, [])

  const stateSchema = {
    numcard: { value: '', error: '' },
    dateexpire: { value: '', error: '' },
    codecvv: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    numcard: {
      required: true,
      validator: {
        func: (value: string) =>
          cardPatterns[showSelectedOption].test(value.replace(/\s/g, '')),
        error: 'Formato inválido.',
      },
    },
    dateexpire: {
      required: true,
      validator: formatExpire(),
    },
    codecvv: {
      required: true,
      validator: formatCvv(),
    },
  }

  const onSubmitForm = ({
    numcard,
    dateexpire,
    codecvv,
  }: {
    numcard: string
    dateexpire: string
    codecvv: string
  }) => {
    const subsID = detailSubs?.currentPaymentMethod.paymentMethodID

    setShowMessageFailed(false)
    setShowLoadingSubmit(true)
    blockBtnUpdate(true)
    setLoadingCard(true)

    Sentry.addBreadcrumb({
      type: 'info',
      category: 'profile',
      message: 'El usuario ha iniciado el proceso de actualización de tarjeta',
      data: {
        SubsId: subsID,
      },
      level: Sentry.Severity.Info,
    })

    if (typeof window !== 'undefined') {
      extendSession().then(() => {
        Sales.getPaymentOptions().then((res) => {
          if (Array.isArray(res)) {
            const providerID = res[0].paymentMethodID
            const accessTOKEN = Identity.userIdentity.accessToken
            initPaymentUpdate(subsID, providerID, arcSite, accessTOKEN).then(
              (resUpdate) => {
                const {
                  parameter1: publicKey,
                  parameter2: accountId,
                  parameter3: payuBaseUrl,
                  parameter4: deviceSessionId,
                } = resUpdate

                getProfilePayu(accessTOKEN, IdSubscription, arcSite).then(
                  (profilePayu) => {
                    const fullUserName = `${
                      profilePayu.name ||
                      Identity.userProfile?.firstName ||
                      'Usuario'
                    } ${
                      profilePayu.lastname ||
                      Identity.userProfile?.firstName ||
                      ''
                    }`

                    Sentry.addBreadcrumb({
                      type: 'info',
                      category: 'profile',
                      message: 'Solicitando autorización',
                      data:
                        {
                          IdSubscription,
                          deviceSessionId,
                          'payU.setURL': payuBaseUrl,
                          'payU.setPublicKey': publicKey,
                          'payU.setAccountID': accountId,
                          'payU.setCardDetails': 'private',
                        } || {},
                      level: Sentry.Severity.Info,
                    })

                    window.payU.setURL(payuBaseUrl)
                    window.payU.setPublicKey(publicKey)
                    window.payU.setAccountID(accountId)
                    window.payU.setCardDetails({
                      number: numcard.replace(/\s/g, ''),
                      // name_card:
                      //   ENVIRONMENT === 'elcomercio'
                      //     ? fullUserName.replace(/'/g, '')
                      //     : 'APPROVED',
                      name_card: fullUserName.replace(/'/g, ''),
                      payer_id: new Date().getTime(),
                      exp_month: dateexpire.split('/')[0],
                      exp_year:
                        dateexpire.split('/')[1].length <= 2
                          ? `20${dateexpire.split('/')[1]}`
                          : dateexpire.split('/')[1],
                      method: showSelectedOption,
                      document: profilePayu.doc_number,
                      cvv: codecvv,
                    })

                    const handleCreateToken = new Promise((resolve, reject) => {
                      Sentry.addBreadcrumb({
                        type: 'info',
                        category: 'profile',
                        message: 'Creando token',
                        data: {
                          'payU.createToken': 'callback',
                        },
                        level: Sentry.Severity.Info,
                      })

                      window.payU?.createToken(
                        (response: { token: string; error: string }) => {
                          if (response.error) {
                            reject(new Error(response.error))
                            setShowMessageFailed(true)
                            setShowCustomMsgFailed(
                              response.error || getCodeError('updateCard')
                            )
                            setShowLoadingSubmit(false)
                            blockBtnUpdate(false)
                            setLoadingCard(false)
                          } else {
                            resolve(response.token)
                          }
                        }
                      )
                    })

                    handleCreateToken
                      .catch((error) => {
                        Sentry.captureEvent({
                          message: error || getCodeError('transactionError'),
                          level: Sentry.Severity.Error,
                          extra: error || {},
                        })
                      })
                      .then((token) => {
                        if (token) {
                          const tokenDinamic = `${token}~${deviceSessionId}~${codecvv}`
                          const documentPay = `${profilePayu.doc_type}_${profilePayu.doc_number}`

                          finalizePaymentUpdate(
                            subsID,
                            providerID,
                            arcSite,
                            accessTOKEN,
                            tokenDinamic,
                            profilePayu.email,
                            documentPay,
                            profilePayu.phone
                          )
                            .then((resFin) => {
                              if (
                                resFin.cardholderName &&
                                resFin.creditCardLastFour
                              ) {
                                successUpdate(
                                  resFin.creditCardLastFour,
                                  showSelectedOption
                                )
                                setLoadingCard(false)
                              } else {
                                setShowMessageFailed(true)
                                setShowCustomMsgFailed(
                                  getCodeError('updateCardTry')
                                )
                                setLoadingCard(false)
                              }
                            })
                            .catch((errFinalize) => {
                              setShowMessageFailed(true)
                              setShowCustomMsgFailed(getCodeError('updateCard'))
                              setLoadingCard(false)

                              Sentry.captureEvent({
                                message:
                                  errFinalize.message ||
                                  getCodeError('errorFinalize'),
                                level: Sentry.Severity.Error,
                                extra: errFinalize || {},
                              })
                            })
                            .finally(() => {
                              setShowLoadingSubmit(false)
                              blockBtnUpdate(false)
                            })
                        }
                      })
                  }
                )
              }
            )
          }
        })
      })
    }
  }

  const {
    values: { numcard, dateexpire, codecvv },
    errors,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const changeCardTrigger = (card: CardsProviders) => {
    const buttonUpdate = document.getElementById(
      'btn-update-card'
    ) as HTMLButtonElement
    if (numcard.length >= 16 && buttonUpdate) {
      errors.numcard = cardPatterns[card].test(numcard.replace(/\s/g, ''))
        ? ''
        : 'Formato inválido.'
      if (!errors.numcard && !errors.dateexpire && !errors.codecvv) {
        buttonUpdate.disabled = false
      } else {
        buttonUpdate.disabled = true
      }
    }
  }

  return (
    <>
      <fieldset className="sign-profile_subscriptions-fieldset">
        {loadingCard && <Loading typeBg="transparent" />}

        <legend>Datos de la tarjeta</legend>

        {showMessageFailed && (
          <div className="sign-profile_subscriptions-message sign-profile_subscriptions-message-failed">
            {showCustomMsgFailed}
          </div>
        )}

        <div className="sign-profile_subscriptions-group">
          <div className="subtitle">Selecciona un tipo de tarjeta</div>
          <div>
            {ListCards.map((item) => (
              <label key={item.name}>
                <Radiobox
                  key={item.name}
                  image={item.image}
                  name={item.name}
                  checked={showSelectedOption === item.name}
                  onChange={() => {
                    setShowSelectedOption(item.name)
                    setShowTypeAmex(item.name === 'AMEX')
                    changeCardTrigger(item.name)
                  }}
                  value={item.name}
                />
              </label>
            ))}
          </div>
        </div>

        <br />

        <form
          className="signwall-inside_forms-form npadding"
          onSubmit={handleOnSubmit}>
          <div className="sign-profile_subscriptions-align">
            <div className="sign-profile_subscriptions-form-group width-card">
              <ContMask error={errors.numcard}>
                <TextMask
                  type="text"
                  id="numcard"
                  name="numcard"
                  guide={false}
                  mask={patternCard}
                  required
                  placeholder="Número de tarjeta"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={numcard}
                  maxLength={19}
                  tabIndex={1}
                  className={`${errors.numcard && 'error'}`}
                  onChange={(e) => {
                    handleOnChange(e)
                    setShowMessageFailed(false)
                  }}
                  onFocus={(e) => {
                    handleOnChange(e)
                    setShowMessageFailed(false)
                  }}
                />
              </ContMask>
            </div>

            <div className="sign-profile_subscriptions-form-group">
              <ContMask error={errors.dateexpire} nolabelerror>
                <TextMask
                  type="text"
                  id="dateexpire"
                  name="dateexpire"
                  guide={false}
                  mask={patternDate}
                  required
                  placeholder="F. de Vencimiento"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={dateexpire}
                  maxLength={7}
                  tabIndex={2}
                  className={`${errors.dateexpire && 'error'}`}
                  onChange={(e) => {
                    handleOnChange(e)
                    setShowMessageFailed(false)
                  }}
                  onFocus={(e) => {
                    handleOnChange(e)
                    setShowMessageFailed(false)
                  }}
                />
              </ContMask>
            </div>

            <div className="sign-profile_subscriptions-form-group">
              <ContMask error={errors.codecvv} nolabelerror>
                <TextMask
                  type="text"
                  id="codecvv"
                  name="codecvv"
                  guide={false}
                  mask={patterCvv}
                  required
                  placeholder="CVV"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={codecvv}
                  maxLength={4}
                  tabIndex={3}
                  className={`${errors.codecvv && 'error'}`}
                  onChange={(e) => {
                    handleOnChange(e)
                    setShowMessageFailed(false)
                  }}
                  onFocus={(e) => {
                    handleOnChange(e)
                    setShowMessageFailed(false)
                  }}
                />
              </ContMask>
            </div>

            <div className="sign-profile_subscriptions-form-group">
              <div className="sign-profile_subscriptions-msg-cvv">
                <img
                  src={`https://signwall.e3.pe/images/logo-${
                    showTypeAmex ? 'card-amex' : 'card-info'
                  }.png`}
                  alt="card-info"
                />
                <small>{`Se encuentra en el ${
                  showTypeAmex ? 'anverso' : 'reverso'
                } de su tarjeta*`}</small>
              </div>
            </div>
          </div>
          <div
            className="sign-profile_subscriptions-block"
            style={{
              textAlign: 'right',
            }}>
            <div className="sign-profile_subscriptions-form-group">
              <button
                type="submit"
                className="sign-profile_general-button"
                id="btn-update-card"
                style={{ background: mainColorBtn }}
                disabled={disable || showLoadingSubmit}>
                {showLoadingSubmit ? 'ACTUALIZANDO...' : 'ACTUALIZAR'}
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  )
}

export default UpdateCard
