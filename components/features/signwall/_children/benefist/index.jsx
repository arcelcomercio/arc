import React from 'react'
import { BeneOne, BeneThree, BeneFive, BeneFour } from '../iconos'
import { Cont, ItemTitle, TitleContainer } from './styles'

const Title = ({ content, subTitle, subTitleExtra, subTitleMore, arcSite }) => {
  return (
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
}

const getTitle = (typeMessage, nameMPP, arcSite) => {
  let title = ''
  if (typeMessage === 'relogemail') {
    title = (
      <Title
        content={`¡Hola ${nameMPP ||
          'Lector'}! Para mejorar tu experiencia de navegación, inicia sesión nuevamente.`}
        subTitleExtra="Recuerda que con tu cuenta podrás:"
        arcSite={arcSite}
      />
    )
  } else if (typeMessage === 'reloghash') {
    title = (
      <Title
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
          <Title
            content="Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes."
            subTitleMore
            arcSite={arcSite}
          />
        )
        break
      case 'gestion':
        title = (
          <Title
            content="Regístrate y continúa informándote con lo más completo en economía, negocios y finanzas."
            subTitleMore
            arcSite={arcSite}
          />
        )
        break
      default:
        title = (
          <Title
            content="Regístrate y continúa informándote."
            subTitleMore
            arcSite={arcSite}
          />
        )
    }
  } else if (typeMessage === 'hard') {
    if (arcSite === 'elcomercio') {
      title = (
        <Title
          content="Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes."
          arcSite={arcSite}
        />
      )
    } else {
      title = (
        <Title
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
}) => {
  return (
    <Cont>
      <TitleContainer primaryFont={primaryFont}>
        {getTitle(typeMessage, nameMPP, arcSite)}
      </TitleContainer>

      <div className="item">
        <div className="icon">
          <BeneOne />
        </div>

        <div className="info">
          <ItemTitle mainColorTitle={mainColorTitle}>
            Acceder a más de {arcSite === 'elcomercio' ? '400' : '100'} noticias
            nuevas al día
          </ItemTitle>
          <p className="item-text">e informes especiales</p>
        </div>
      </div>

      {arcSite === 'elcomercio' || arcSite === 'elcomerciomag' ? (
        <div className="item">
          <div className="icon">
            <BeneFive />
          </div>

          <div className="info">
            <ItemTitle mainColorTitle={mainColorTitle}>
              Escuchar podcasts con las primeras noticias del día
            </ItemTitle>
            <p className="item-text">desde la App</p>
          </div>
        </div>
      ) : null}

      <div className="item">
        <div className="icon">
          <BeneThree />
        </div>

        <div>
          <ItemTitle mainColorTitle={mainColorTitle}>
            Guardar tus notas favoritas
          </ItemTitle>
          <p className="item-text">en la App</p>
        </div>
      </div>

      {arcSite === 'gestion' ? (
        <div className="item">
          <div className="icon">
            <BeneFour />
          </div>

          <div>
            <ItemTitle mainColorTitle={mainColorTitle}>Personalizar</ItemTitle>
            <p className="item-text">tus Newsletters</p>
          </div>
        </div>
      ) : null}
    </Cont>
  )
}

export { Benefits }
