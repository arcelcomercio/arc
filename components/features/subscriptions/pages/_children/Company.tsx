import Identity from '@arc-publishing/sdk-identity'
import * as Sentry from '@sentry/browser'
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { SubsArcSite } from 'types/subscriptions'

import { getAssetsPath } from '../../../../utilities/assets'
import { MsgRegister } from '../../../signwall/_children/icons'
import getCodeError, {
  formatDescription,
  formatEmail,
  formatNames,
  formatPhone,
} from '../../_dependencies/Errors'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../_dependencies/Properties'
import { sendEmailCompany } from '../../_dependencies/Services'
import useForm from '../../_hooks/useForm'

type CompanyFormProps = {
  cEmail: string
  cFirstName: string
  cLastName: string
  cCompany: string
  cPhone: string
  cSubject: string
  cQuestion: string
}

const PageCompany: React.FC<{ arcSite: ArcSite; contextPath: string }> = ({
  arcSite,
  contextPath,
}) => {
  const { urls, texts } = PropertiesSite[arcSite as SubsArcSite]
  const { urls: urlCommon, texts: textsCommon } = PropertiesCommon
  const [msgError, setMsgError] = React.useState('')
  const [errCaptcha, setErrCaptcha] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [showThanks, setShowThanks] = React.useState(false)

  const stateSchema = {
    cEmail: { value: '', error: '' },
    cFirstName: { value: '', error: '' },
    cLastName: { value: '', error: '' },
    cCompany: { value: '', error: '' },
    cPhone: { value: '', error: '' },
    cSubject: { value: '', error: '' },
    cQuestion: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    cEmail: {
      required: true,
      validator: formatEmail(),
    },
    cFirstName: {
      required: true,
      validator: formatNames(),
      mincaracts: true,
    },
    cLastName: {
      required: true,
      validator: formatNames(),
      mincaracts: true,
    },
    cCompany: {
      required: true,
      validator: formatNames(),
      mincaracts: true,
    },
    cPhone: {
      required: true,
      validator: formatPhone(),
    },
    cSubject: {
      required: true,
    },
    cQuestion: {
      required: false,
      invalidtext: true,
      validator: formatDescription(),
    },
  }

  const onFormCompany = ({
    cEmail,
    cFirstName,
    cLastName,
    cCompany,
    cPhone,
    cSubject,
    cQuestion,
  }: CompanyFormProps) => {
    setLoading(true)
    setMsgError('')
    setErrCaptcha('')
    const response = window.grecaptcha?.getResponse()
    if (response.length === 0) {
      setLoading(false)
      setErrCaptcha(getCodeError('validCaptcha'))
    } else {
      const userToken = Identity.userIdentity?.accessToken
      const captcha = window.grecaptcha?.getResponse()
      sendEmailCompany(
        urlCommon.companyEmail,
        arcSite,
        userToken,
        captcha,
        cEmail,
        cFirstName,
        cLastName,
        cCompany,
        cPhone,
        cSubject,
        cQuestion.trim()
      )
        .then((resEmail = {}) => {
          setLoading(false)
          if (resEmail.httpStatus === 200) {
            setShowThanks(true)
            window.scrollTo(0, 0)
          } else {
            setMsgError(textsCommon.errorCompany)
          }
        })
        .catch((errEmail) => {
          setMsgError(textsCommon.errorCompany)
          setLoading(false)
          Sentry.captureEvent({
            message:
              'Ocurrió un error al enviar mensaje  del formulario Corporativo',
            level: Sentry.Severity.Error,
            extra: errEmail || {},
          })
        })
    }
  }

  const {
    values: {
      cEmail,
      cFirstName,
      cLastName,
      cCompany,
      cPhone,
      cSubject,
      cQuestion,
    },
    errors: {
      cEmail: cEmailError,
      cFirstName: cFirstNameError,
      cLastName: cLastNameError,
      cCompany: cCompanyError,
      cPhone: cPhoneError,
      cSubject: cSubjectError,
      cQuestion: cQuestionError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormCompany)

  const handleChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    handleOnChange(e)
    setMsgError('')
  }

  const handleReturnHome = () => {
    window.location.href = urls.mainHome
  }

  const getFormImage = (format: 'webp' | 'png' | 'jpg') =>
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/img_corporativo.${format}?d=1`

  return (
    <section className="company">
      <div className="wrapper">
        <div className="company__content">
          <div className="company__content-box">
            <picture className="company-bg">
              <source srcSet={getFormImage('webp')} type="image/webp" />
              <img
                src={getFormImage('png')}
                alt="Foto de históricas oficinas de El Comercio"
                className="company-bg__img"
              />
            </picture>
            <div className="cont-form">
              {showThanks ? (
                <div className="cont-success">
                  <MsgRegister bgcolor="#D1E9BE" />
                  <h2>Gracias</h2>
                  <p>{textsCommon.successCompany}</p>
                  <div className="block">
                    <button
                      className="btn-next"
                      type="button"
                      onClick={handleReturnHome}>
                      {texts.backSite}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3>{textsCommon.titleCompany}</h3>

                  {(msgError || errCaptcha) && (
                    <div className="msg-alert">{` ${
                      msgError || errCaptcha
                    } `}</div>
                  )}

                  <form onSubmit={handleOnSubmit}>
                    <div className="rows">
                      <div className="column">
                        <div className="block">
                          <label htmlFor="cEmail">
                            Correo electrónico
                            <input
                              className={cEmailError && 'input-error'}
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              name="cEmail"
                              value={cEmail}
                              required
                              onChange={handleChangeInput}
                              onBlur={handleOnChange}
                              maxLength={80}
                              disabled={loading}
                            />
                            {cEmailError && (
                              <span className="msn-error">{cEmailError}</span>
                            )}
                          </label>
                        </div>

                        <div className="block">
                          <label htmlFor="cFirstName">
                            Nombre(s)
                            <input
                              className={cFirstNameError && 'input-error'}
                              type="text"
                              autoComplete="given-name"
                              name="cFirstName"
                              value={cFirstName}
                              required
                              onChange={handleChangeInput}
                              maxLength={50}
                              onBlur={handleOnChange}
                              disabled={loading}
                            />
                            {cFirstNameError && (
                              <span className="msn-error">
                                {cFirstNameError}
                              </span>
                            )}
                          </label>
                        </div>

                        <div className="block">
                          <label htmlFor="cLastName">
                            Apellido Paterno
                            <input
                              className={cLastNameError && 'input-error'}
                              type="text"
                              autoComplete="family-name"
                              name="cLastName"
                              value={cLastName}
                              required
                              onChange={handleChangeInput}
                              maxLength={50}
                              onBlur={handleOnChange}
                              disabled={loading}
                            />
                            {cLastNameError && (
                              <span className="msn-error">
                                {cLastNameError}
                              </span>
                            )}
                          </label>
                        </div>

                        <div className="block">
                          <label htmlFor="cCompany">
                            Organización
                            <input
                              className={cCompanyError && 'input-error'}
                              type="text"
                              autoComplete="organization"
                              name="cCompany"
                              value={cCompany}
                              required
                              onChange={handleChangeInput}
                              maxLength={50}
                              onBlur={handleOnChange}
                              disabled={loading}
                            />
                            {cCompanyError && (
                              <span className="msn-error">{cCompanyError}</span>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="column">
                        <div className="block">
                          <label htmlFor="cPhone">
                            Teléfono
                            <input
                              className={cPhoneError && 'input-error'}
                              type="text"
                              inputMode="tel"
                              autoComplete="tel"
                              name="cPhone"
                              value={cPhone}
                              maxLength={12}
                              required
                              onChange={handleChangeInput}
                              onBlur={handleOnChange}
                              disabled={loading}
                            />
                            {cPhoneError && (
                              <span className="msn-error">{cPhoneError}</span>
                            )}
                          </label>
                        </div>

                        <div className="block">
                          <label htmlFor="cSubject">
                            Asunto
                            <select
                              className={cSubjectError && 'input-error'}
                              value={cSubject || ''}
                              name="cSubject"
                              required
                              onChange={handleChangeInput}
                              onBlur={handleOnChange}>
                              <option selected disabled value="">
                                --- Seleccione ---
                              </option>
                              <option value="1">Quiero una suscripción</option>
                              <option value="2">Tengo una suscripción</option>
                              <option value="3">Otros</option>
                            </select>
                            {cSubjectError && (
                              <span className="msn-error">{cSubjectError}</span>
                            )}
                          </label>
                        </div>

                        <div className="block">
                          <label htmlFor="cQuestion">
                            Descripción
                            <textarea
                              className={cQuestionError && 'input-error'}
                              name="cQuestion"
                              value={cQuestion}
                              maxLength={200}
                              onChange={handleChangeInput}
                              onBlur={handleOnChange}
                            />
                            {cQuestionError && (
                              <span className="msn-error">
                                {cQuestionError}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />

                    <div className="rows">
                      <div className="column">
                        <div
                          className={`block ${
                            errCaptcha && 'input-error-chaptcha'
                          }`}>
                          <div
                            className="g-recaptcha"
                            data-sitekey="6LfEGMcUAAAAAEBWDI6qyRGEc0_KG0XTNBNeeCjv"
                          />
                        </div>
                      </div>

                      <div className="column">
                        <div className="block">
                          <button
                            className="btn-next"
                            type="submit"
                            disabled={disable || loading}>
                            {loading ? 'Enviando...' : 'Enviar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageCompany
