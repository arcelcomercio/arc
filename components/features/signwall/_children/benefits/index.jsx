import * as React from 'react'

import { BeneFive, BeneFour, BeneOne, BeneThree } from '../icons'

const textMore = 'Además, con tu cuenta podrás:'
const textRemenber = 'Recuerda que con tu cuenta podrás:'
const textRegisterEco =
  'Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes.'
const textRegisterGes =
  'Regístrate y continúa informándote con lo más completo en economía, negocios y finanzas.'
const textGreeting =
  '¡Hola Lector! Para mejorar tu experiencia de navegación, inicia sesión nuevamente.'
const BenfistTrome = [
  {
    title: 'Acceder',
    text: 'a más de 400 noticias nuevas diarias además de informes especiales.',
  },
  {
    title: 'Participar',
    text: 'en todas las promociones de trome.pe y ganar miles de premios.',
  },
  {
    title: 'Recibir nuestro ‘Cafe de Noticias’',
    text: 'todos los días. Un newsletter a nuestro estilo.',
  },
]
const BenefitsGeneric = [
  {
    icon: <BeneOne />,
    text: {
      elcomercio: 'Acceder a más de 400 noticias nuevas al día',
      gestion: 'Acceder a más de 100 noticias nuevas al día',
    },
    more: 'e informes especiales',
  },
  {
    icon: <BeneFive />,
    text: 'Escuchar podcasts con las primeras noticias del día',
    more: 'desde la App',
  },
  {
    icon: <BeneThree />,
    text: 'Guardar tus notas favoritas',
    more: 'en la App',
  },
  {
    icon: <BeneFour />,
    text: 'Personalizar',
    more: 'tus Newsletters',
  },
]

export const Benefits = ({
  typeMessage,
  arcSite,
  mainColorTitle,
  primaryFont,
}) => {
  const isComercio = arcSite === 'elcomercio'
  const isGestion = arcSite === 'gestion'
  const isHard = typeMessage === 'hard'
  const isRelogEmail = typeMessage === 'relogemail'
  const isRelogHash = typeMessage === 'reloghash'
  const isOrganic = typeMessage === 'organico'
  const isResetPass = typeMessage === 'resetpass'
  const isVerify = typeMessage === 'verify'
  const isNewsLetter = typeMessage === 'newsletter'

  return (
    <div className="sign-auth_benefits-cont">
      <div
        className="sign-auth_benefits-title-container"
        style={{ fontFamily: primaryFont }}>
        {isHard ? (
          <>
            <h1 className={`title ${arcSite}`}>
              {isComercio ? textRegisterEco : '¿TE GUSTA LO QUE ESTÁS LEYENDO?'}
            </h1>
            {isGestion && (
              <p className="text-panel">
                {textRegisterGes}
                <br /> {textMore}
              </p>
            )}
          </>
        ) : (
          <h1 className={`title ${arcSite}`}>
            {(isRelogEmail || isRelogHash) && (
              <>
                {textGreeting}
                <br /> {textRemenber}
              </>
            )}
            {(isOrganic || isResetPass || isVerify || isNewsLetter) && (
              <>
                {isComercio ? textRegisterEco : textRegisterGes}
                <br /> {textMore}
              </>
            )}
          </h1>
        )}
      </div>

      {BenefitsGeneric.filter((item) => {
        if (item.more === 'desde la App' && isGestion) {
          return false
        }
        return true
      }).map((item) => (
        <div className="item" key={`item-${item.more}`}>
          <div className="icon">{item.icon}</div>
          <div className="info">
            <h3
              className="sign-auth_benefits-item-title"
              style={{ color: mainColorTitle }}>
              {item.text[arcSite] || item.text}
            </h3>
            <p className="item-text">{item.more}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export const BenefitsTrome = () => (
  <div className="sign-auth_benefits-cont">
    <div className="box-benefist">
      <h1>¡Regístrate gratis!</h1>
      <p className="description">
        Mantente informado por el
        <strong> diario en español más leído de hispanoamérica. </strong>
        Tendrás todas las noticias del espéctaculo, política, deportes y las
        mejores columnas de opinión de la prensa nacional.
        <strong> Con tu cuenta podrás: </strong>
      </p>
      <ul className="list-benefist">
        {BenfistTrome.map((item) => (
          <li key={`item-${item.title}`}>
            <span className="icon-slash">&#47;&#47;&#47;</span>
            <strong> {item.title} </strong> {item.text}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
