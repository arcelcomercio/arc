import React from 'react'
import Context from 'fusion:context'
import { Back, Close, Gestion, Comercio}  from './iconos'

const Header = props => {
  const { type, closePopup, refirectHome } = props

  const typeHeader = (siteProperties, contextPath, deployment, arcSite) => (
    <>
      {{ elcomercio: <Comercio color="black" width="159" height="24" size="1" />, gestion: <Gestion color="white"  width="138" height="30" size="1"/> }[arcSite] || (
        <img
          className="modal-header__img"
          alt=""
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/images/${siteProperties.assets.header.logo}`
          )}
        />
      )}

      {type === 'large' ? (
        <button
          type="button"
          className="modal-header__back"
          onClick={closePopup}>
          <Back color={arcSite === 'elcomercio' ? 'black' : 'white'} />
          <span className="modal-header__text">Volver a la Portada</span>
        </button>
      ) : (
        <button
          type="button"
          className="modal-header__close"
          onClick={
            refirectHome === true
              ? () => {
                  window.location.href = '/'
                }
              : closePopup
          }>
          <Close color={arcSite === 'elcomercio' ? 'black' : 'white'} />
        </button>
      )}
    </>
  )

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
