import * as React from 'react'

import { BeneFive, BeneFour, BeneOne, BeneThree } from '../icons'

const TitleBenefit = ({
  content,
  subTitle,
  subTitleExtra,
  subTitleMore,
  arcSite,
}) => (
  <>
    <h1 className={`title title-${arcSite}`}>
      {content}
      {subTitleMore && (
        <>
          <br /> Además, con tu cuenta podrás:
        </>
      )}
      {subTitleExtra && (
        <>
          <br /> {subTitleExtra}
        </>
      )}
    </h1>
    {subTitle && (
      <p className="text-panel">
        {subTitle}
        <br /> Además, con tu cuenta podrás:
      </p>
    )}
  </>
)

const getTitle = (typeMessage, nameMPP, arcSite) => {
  let title = ''
  if (typeMessage === 'relogemail') {
    title = (
      <TitleBenefit
        content={`¡Hola ${
          nameMPP || 'Lector'
        }! Para mejorar tu experiencia de navegación, inicia sesión nuevamente.`}
        subTitleExtra="Recuerda que con tu cuenta podrás:"
        arcSite={arcSite}
      />
    )
  } else if (typeMessage === 'reloghash') {
    title = (
      <TitleBenefit
        content="¡Hola Lector! Hemos mejorado tu experiencia de navegación, inicia sesión nuevamente."
        subTitleExtra="Recuerda que con tu cuenta podrás:"
        arcSite={arcSite}
      />
    )
  } else if (
    typeMessage === 'organico' ||
    typeMessage === 'resetpass' ||
    typeMessage === 'verify' ||
    typeMessage === 'newsletter'
  ) {
    switch (arcSite) {
      case 'elcomercio':
      case 'elcomerciomag':
        title = (
          <TitleBenefit
            content="Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes."
            subTitleMore
            arcSite={arcSite}
          />
        )
        break
      case 'gestion':
        title = (
          <TitleBenefit
            content="Regístrate y continúa informándote con lo más completo en economía, negocios y finanzas."
            subTitleMore
            arcSite={arcSite}
          />
        )
        break
      default:
        title = (
          <TitleBenefit
            content="Regístrate y continúa informándote."
            subTitleMore
            arcSite={arcSite}
          />
        )
    }
  } else if (typeMessage === 'hard') {
    if (arcSite === 'elcomercio') {
      title = (
        <TitleBenefit
          content="Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes."
          arcSite={arcSite}
        />
      )
    } else {
      title = (
        <TitleBenefit
          content="¿TE GUSTA LO QUE ESTÁS LEYENDO?"
          subTitle="Regístrate y continúa informándote con lo más completo en economía, negocios y finanzas."
          arcSite={arcSite}
        />
      )
    }
  }
  return title
}

const Benefits = ({
  typeMessage,
  nameMPP,
  arcSite,
  mainColorTitle,
  primaryFont,
}) => (
  <div className="sign-auth_benefits-cont">
    {arcSite === 'trome' ? (
      <div className="box-benefist">
        <h1>¡Regístrate gratis!</h1>
        <p>
          Mantente informado por el{' '}
          <strong>diario en español más leído de hispanoamérica. </strong>{' '}
          Tendrás todas las noticias del espéctaculo, política, deportes y las
          mejores columnas de opinión de la prensa nacional.{' '}
          <strong>Con tu cuenta podrás: </strong>
        </p>
        <ul>
          <li>
            <span className="icon-slash">&#47;&#47;&#47;</span>{' '}
            <strong>Acceder</strong> a más de 400 noticias nuevas diarias además
            de informes especiales.
          </li>
          <li>
            <span className="icon-slash">&#47;&#47;&#47;</span>{' '}
            <strong> Participar </strong>en todas las promociones de trome.pe y
            ganar miles de premios.
          </li>
          <li>
            <span className="icon-slash">&#47;&#47;&#47;</span>{' '}
            <strong>Recibir nuestro ‘Cafe de Noticias’ </strong> todos los días.
            Un newsletter a nuestro estilo.
          </li>
        </ul>
      </div>
    ) : (
      <>
        <div
          className="sign-auth_benefits-title-container"
          style={{ fontFamily: primaryFont }}>
          {getTitle(typeMessage, nameMPP, arcSite)}
        </div>

        <div className="item">
          <div className="icon">
            <BeneOne />
          </div>

          <div className="info">
            <h3
              className="sign-auth_benefits-item-title"
              style={{ color: mainColorTitle }}>
              Acceder a más de {arcSite === 'elcomercio' ? '400' : '100'}{' '}
              noticias nuevas al día
            </h3>
            <p className="item-text">e informes especiales</p>
          </div>
        </div>

        {(arcSite === 'elcomercio' || arcSite === 'elcomerciomag') && (
          <div className="item">
            <div className="icon">
              <BeneFive />
            </div>

            <div className="info">
              <h3
                className="sign-auth_benefits-item-title"
                style={{ color: mainColorTitle }}>
                Escuchar podcasts con las primeras noticias del día
              </h3>
              <p className="item-text">desde la App</p>
            </div>
          </div>
        )}

        <div className="item">
          <div className="icon">
            <BeneThree />
          </div>

          <div>
            <h3
              className="sign-auth_benefits-item-title"
              style={{ color: mainColorTitle }}>
              Guardar tus notas favoritas
            </h3>
            <p className="item-text">en la App</p>
          </div>
        </div>

        {(arcSite === 'gestion' || arcSite === 'elcomercio') && (
          <div className="item">
            <div className="icon">
              <BeneFour />
            </div>

            <div>
              <h3
                className="sign-auth_benefits-item-title"
                style={{ color: mainColorTitle }}>
                Personalizar
              </h3>
              <p className="item-text">tus Newsletters</p>
            </div>
          </div>
        )}
      </>
    )}
  </div>
)

export default Benefits
