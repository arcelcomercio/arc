/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import * as Sentry from '@sentry/browser'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import Markdown from 'react-markdown/with-html'

import { env } from '../../../utilities/arc/env'
import { PROD } from '../../../utilities/constants/environment'
import QueryString from '../../signwall/_dependencies/querystring'
import Taggeo from '../../signwall/_dependencies/taggeo'
import Signwall from '../_children/Signwall'
import { AuthContext, AuthProvider } from '../_context/auth'
import addScriptAsync from '../_dependencies/Async'
import getCodeError, {
  formatEmail,
  formatNames,
  formatPhone,
} from '../_dependencies/Errors'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { getUserName, isLogged } from '../_dependencies/Session'
import useForm from '../_hooks/useForm'
import { FooterLand } from '../_layouts/footer'
import HeaderSubs from '../_layouts/header'
import scriptsLanding from '../_scripts/Landing'
import CallinCallOut from '../landing/_children/CallinCallout'
import Callout from '../landing/_children/Callout'

const arcType = 'pages'
const WrapperPageSubs = ({ properties }) => {
  const {
    customFields: { callInnCallOut = false, pageSubscriptions } = {},
  } = properties

  const { arcSite, deployment, globalContent: items = [] } =
    useAppContext() || {}

  const [showSignwall, setShowSignwall] = React.useState(false)
  const [showTypeLanding, setShowTypeLanding] = React.useState('landing')
  const [showProfile, setShowProfile] = React.useState(false)
  const [showCallin, setShowCallin] = React.useState(false)
  const [showModalCall, setShowModalCall] = React.useState(false)

  const [msgError, setMsgError] = React.useState()
  const [loading, setLoading] = React.useState()

  const { userProfile } = React.useContext(AuthContext)
  const { urls, texts, faqs = [] } = PropertiesSite[arcSite]
  const { links, urls: urlCommon } = PropertiesCommon
  const isComercio = arcSite === 'elcomercio'
  const moduleCall = callInnCallOut && isComercio

  const stateSchema = {
    cEmail: { value: '', error: '' },
    cFirstName: { value: '', error: '' },
    cLastName: { value: '', error: '' },
    cCompany: { value: '', error: '' },
    cPhone: { value: '', error: '' },
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
  }

  React.useEffect(() => {
    Sentry.init({
      dsn: urlCommon.dsnSentry,
      debug: env !== PROD,
      release: `arc-deployment@${deployment}`,
      environment: env,
      ignoreErrors: [
        'Unexpected end of JSON input',
        'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
        'JSON Parse error: Unexpected EOF',
      ],

      denyUrls: [/delivery\.adrecover\.com/, /analytics/, /facebook/],
    })

    Sentry.configureScope((scope) => {
      scope.setTag('brand', arcSite)
    })

    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    })
      .then(() => {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
      })
      .catch((errIdentitySDK) => {
        Sentry.captureEvent({
          message: 'SDK Identity no ha cargado correctamente',
          level: 'error',
          extra: errIdentitySDK || {},
        })
      })
  }, [])

  const onFormCompany = () => {
    console.log('hola ke hace')
  }

  const handleSignwall = () => {
    Taggeo(
      'Web_Sign_Wall_Suscripciones',
      `web_link_ingresar_${isLogged() ? 'perfil' : 'cuenta'}`
    )
    if (isLogged()) {
      window.location.href = links.profile
    } else {
      setShowSignwall(!showSignwall)
      const signwallButton = document.getElementById('btn-signwall')
      if (signwallButton) signwallButton.innerHTML = 'Inicia sesión'
      try {
        window.Identity.clearSession()
      } catch (e) {
        Sentry.captureEvent({
          message:
            'Ocurrió un error al limpiar la sesión con Identity.clearSession()',
          level: 'error',
          extra: e || {},
        })
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      let userfirstName = ''
      let userlastName = ''
      try {
        const { firstName, lastName } = window.Identity.userProfile || {}
        userfirstName = firstName
        userlastName = lastName
      } catch (e) {
        Sentry.captureEvent({
          message:
            'Ha ocurrido un error intentar al obtener firstName y lastName desde Identity.userProfile',
          level: 'error',
          extra: e || {},
        })
      }

      setShowProfile(getUserName(userfirstName, userlastName))
    }
  }

  const handleCallIn = () => {
    window.document.location.href = 'tel:013115100'
  }

  const {
    values: { cEmail, cFirstName, cLastName, cCompany, cPhone },
    errors: {
      cEmail: cEmailError,
      cFirstName: cFirstNameError,
      cLastName: cLastNameError,
      cCompany: cCompanyError,
      cPhone: cPhoneError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormCompany)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  return (
    <>
      <>
        {isComercio ? (
          <>
            <header className="header" id="header">
              <div className="wrapper">
                <div
                  className={`header__content ${
                    !isComercio || !moduleCall ? 'box-cont' : ''
                  }`}>
                  <a
                    href={urls.mainHome}
                    target="_blank"
                    rel="noreferrer"
                    className="header__content-link"
                    aria-label={arcSite}>
                    <div className="header__content-logo" />
                  </a>

                  {moduleCall && (
                    <div className="header__content-call">
                      <span>Llama Gratis</span>
                      <button
                        type="button"
                        className="icon-phone"
                        onClick={handleCallIn}>
                        01 311 5100
                      </button>
                      <button
                        type="button"
                        className="icon-support"
                        onClick={() => setShowCallin(!showCallin)}>
                        Te Llamamos
                      </button>
                    </div>
                  )}

                  <button
                    className="header__content-button"
                    type="button"
                    id="btn-signwall"
                    onClick={handleSignwall}>
                    {showProfile || 'Inicia sesión'}
                  </button>
                </div>
              </div>
            </header>
            {moduleCall && showCallin && <CallinCallOut />}
          </>
        ) : (
          <HeaderSubs
            userProfile={userProfile}
            arcSite={arcSite}
            arcType={arcType}
          />
        )}

        {pageSubscriptions === 'faqPage' ? (
          <section className="faq">
            <div className="wrapper">
              <div className="faq__content">
                <h1 className="faq__content-title">Preguntas Frecuentes</h1>

                {faqs.map((faqGroup, i) => (
                  <div key={faqGroup.group} className="accordion">
                    <input
                      id={`toggle${i + 1}`}
                      type="checkbox"
                      className="accordion-toggle"
                      name="toggle"
                    />
                    <label htmlFor={`toggle${i + 1}`}>
                      <Markdown
                        source={faqGroup.group}
                        unwrapDisallowed
                        disallowedTypes={['paragraph']}
                      />
                    </label>
                    <section>
                      {(faqGroup.faqs || []).map((faq) => {
                        const question = Array.isArray(faq.q)
                          ? faq.q.join(' \n')
                          : faq.q
                        const answer = Array.isArray(faq.a)
                          ? faq.a.join(' \n')
                          : faq.a
                        return (
                          <div key={question} className="bloque">
                            <h3>
                              <Markdown
                                source={question}
                                unwrapDisallowed
                                disallowedTypes={['paragraph']}
                              />
                            </h3>
                            <Markdown source={answer} />
                          </div>
                        )
                      })}
                    </section>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="company">
            <div className="wrapper">
              <div className="company__content">
                <div className="company__content-box">
                  <div className="company-bg" />

                  <div className="cont-form">
                    <h3>
                      Por favor envíanos tus datos para brindarte información
                      sobre nuestras suscripciones corporativas.
                    </h3>

                    <form onSubmit={handleOnSubmit}>
                      <div className="rows">
                        <div className="column">
                          <div className="block">
                            <label htmlFor="cEmail">
                              Correo electrónico
                              <input
                                className={cEmailError && 'input-error'}
                                type="email"
                                name="cEmail"
                                value={cEmail}
                                required
                                onChange={handleChangeInput}
                                onBlur={handleOnChange}
                                maxLength="80"
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
                                name="cFirstName"
                                value={cFirstName}
                                required
                                onChange={handleChangeInput}
                                maxLength="50"
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
                                name="cLastName"
                                value={cLastName}
                                required
                                onChange={handleChangeInput}
                                maxLength="50"
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
                                name="cCompany"
                                value={cCompany}
                                required
                                onChange={handleChangeInput}
                                maxLength="50"
                                onBlur={handleOnChange}
                                disabled={loading}
                              />
                              {cCompanyError && (
                                <span className="msn-error">
                                  {cCompanyError}
                                </span>
                              )}
                            </label>
                          </div>

                          <div className="block">
                            <div
                              className="g-recaptcha"
                              data-sitekey="6LfEGMcUAAAAAEBWDI6qyRGEc0_KG0XTNBNeeCjv"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <div className="block">
                            <label htmlFor="cPhone">
                              Teléfono
                              <input
                                className={cPhoneError && 'input-error'}
                                type="text"
                                name="cPhone"
                                value={cPhone}
                                maxLength="12"
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
                            <label htmlFor="">
                              Asunto
                              <select>
                                <option defaultValue>--- Seleccione ---</option>
                                <option>Quiero una suscripción</option>
                                <option>Tengo una suscripción</option>
                                <option>Otros</option>
                              </select>
                            </label>
                          </div>

                          <div className="block">
                            <label htmlFor="">
                              Descripción
                              <textarea />
                            </label>
                          </div>

                          <div className="block">
                            <button className="btn-next" type="button">
                              Enviar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <FooterLand arcType={arcType} />

        {moduleCall && (
          <section className="callin-movil">
            <button type="button" className="icon-phone" onClick={handleCallIn}>
              01 311 5100
            </button>
            <button
              type="button"
              className="icon-support"
              onClick={() => setShowModalCall(true)}>
              Te Llamamos
            </button>
          </section>
        )}

        {(QueryString.getQuery('signLanding') ||
          QueryString.getQuery('signStudents') ||
          showSignwall) && (
          <Signwall
            fallback={<div>Cargando...</div>}
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLogged={handleAfterLogged}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowSignwall(false)
              setShowTypeLanding('landing')
            }}
          />
        )}

        {showModalCall && (
          <Callout
            fallback={<div>Cargando...</div>}
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowModalCall(false)
            }}
          />
        )}
      </>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: scriptsLanding,
        }}
      />
    </>
  )
}

const PagesSubscriptions = (props) => (
  <AuthProvider>
    <WrapperPageSubs properties={props} />
  </AuthProvider>
)

PagesSubscriptions.propTypes = {
  customFields: PropTypes.shape({
    callInnCallOut: PropTypes.bool.tag({
      name: 'Módulo Call In Call Out',
      defaultValue: false,
      description: 'Mostrar/Ocultar Módulo Call In Call Out',
    }),
    pageSubscriptions: PropTypes.oneOf(['faqPage', 'companyPage']).tag({
      name: 'Seleccione Página ',
      labels: {
        faqPage: 'Preguntas Frecuentes',
        companyPage: 'Formulario Corporativo',
      },
      defaultValue: 'faqPage',
    }),
  }),
}

export default PagesSubscriptions
