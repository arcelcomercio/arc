import React from 'react'
import Context from 'fusion:context'
import { Back, Close, Gestion } from './iconos'

const Brand = 'gestion'

const Header = props => {
  const { type, closePopup, refirectHome } = props
  let typeHeader
  if (type === 'large') {
    typeHeader = (siteProperties, contextPath, deployment, arcSite) => (
      <>
        {arcSite === 'gestion' ? <Gestion /> : <img
          className="modal-header__img"
          alt=""
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/images/${
            siteProperties.assets.header.logo
            }`
          )}
        />}
       
        <button
          type="button"
          className="modal-header__back"
          onClick={closePopup}>
          <Back color={Brand === 'elcomercio' ? 'black' : 'white'} />
          <span className="modal-header__text">Volver a la Portada</span>
        </button>
      </>
    )
  } else if (refirectHome === true) {
    typeHeader = (siteProperties, contextPath, deployment, arcSite) => (
      <>
        {arcSite === 'gestion' ? <Gestion /> : <img
          className="modal-header__img"
          alt=""
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/images/${
            siteProperties.assets.header.logo
            }`
          )}
        />}

        <button
          type="button"
          className="modal-header__close"
          onClick={() => {
            window.location.href = '/'
          }}>
          <Close color={Brand === 'elcomercio' ? 'black' : 'white'} />
        </button>
      </>
    )
  } else {
    typeHeader = (siteProperties, contextPath, deployment, arcSite) => (
      <>
        {arcSite === 'gestion' ? <Gestion /> : <img
          className="modal-header__img"
          alt=""
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/images/${
            siteProperties.assets.header.logo
            }`
          )}
        />}

        <button
          type="button"
          className="modal-header__close"
          onClick={closePopup}>
          <Close color={Brand === 'elcomercio' ? 'black' : 'white'} />
        </button>
      </>
    )
  }

  return (
    <Context>
      {({ siteProperties, contextPath, deployment, arcSite }) => (
        <div className="modal-header">
          {typeHeader(siteProperties, contextPath, deployment, arcSite)}
        </div>
      )}
    </Context>
  )
}

export default Header
