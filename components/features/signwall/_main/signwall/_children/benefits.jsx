import React from 'react'

import { BeneOne, BeneThree, BeneFive } from '../../common/iconos'

const Title = props => {
  const { content, subTitle } = props
  return (
    <>
      <h1 className="benefits__title">
        {content}
        {!subTitle && (
          <>
            <br /> Además, con tu cuenta podrás:
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

const getTitle = (typeMessage, nameMPP, brandCurrent) => {
  let title = ''
  if (typeMessage === 'relogin') {
    title = (
      <Title
        content={`¡Hola ${nameMPP}! Para mejorar tu experiencia de navegación, inicia sesión nuevamente. Recuerda que con tu cuenta podrás:`}
      />
    )
  } else if (typeMessage === 'organic') {
    switch(brandCurrent){
      case 'elcomercio':
          title = (
            <Title content="Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes." />
          )
        break
      case 'gestion':
          title = (
            <Title content="Regístrate y continúa informándote con lo más completo en economía, negocios y finanzas." />
          )
        break
      default:
        title = (
          <Title content="Regístrate y continúa informándote." />
        )
    }
  } else if (typeMessage === 'hard') {
    if (brandCurrent === 'elcomercio') {
      title = (
        <Title content="Regístrate gratis para continuar leyendo y estar siempre informado con las noticias más relevantes." />
      )
    } else {
      title = (
        <Title
          content="¿TE GUSTA LO QUE ESTÁS LEYENDO?"
          subTitle="Regístrate y continúa informándote con lo más completo en economía, negocios y finanzas."
        />
      )
    }
  }
  return title
}

const Benefits = props => {
  const { typeMessage, nameMPP, brandCurrent } = props

  return (
    <div className="benefits">
      <div
        className={`benefits__title-container ${
          typeMessage === 'organic' ? 'organic' : ''
        }`}>
        {getTitle(typeMessage, nameMPP, brandCurrent)}
      </div>

      <div className="benefits__item">
        <div className="benefits__icon">
        <BeneOne />
        </div>

        <div>
          <h3 className="benefits__item-title">
            Acceder a más de {brandCurrent === 'elcomercio' ? '400' : '100'} noticias
            nuevas al día
          </h3>
          <p className="benefits__item-text">e informes especiales</p>
        </div>
      </div>

      {brandCurrent === 'elcomercio' && (
        <div className="benefits__item">
          <div className="benefits__icon">
            <BeneFive />
          </div>

          <div>
            <h3 className="benefits__item-title">
              Escuchar podcasts con las primeras noticias del día
            </h3>
            <p className="benefits__item-text">desde la App</p>
          </div>
        </div>
      )}

      <div className="benefits__item">
        <div className="benefits__icon">
          <BeneThree />
        </div>

        <div>
          <h3 className="benefits__item-title">Guardar tus notas favoritas</h3>
          <p className="benefits__item-text">en la App</p>
        </div>
      </div>
    </div>
  )
}

export default Benefits
