/* eslint-disable no-nested-ternary */
import React from 'react'
import Context from 'fusion:context'
import { Back, Close, Gestion, Comercio } from './iconos'
import Taggeo from '../utils/taggeo'

const Header = props => {
  const { type, closePopup, typePopUp } = props
  const typeHeader = (siteProperties, contextPath, deployment, arcSite) => (
    <>
      {{
        elcomercio: <Comercio color="black" width="159" height="24" size="1" />,
        elcomerciomag: (
          <Comercio color="black" width="159" height="24" size="1" />
        ),
        gestion: <Gestion color="white" width="138" height="30" size="1" />,
        depor: (
          <div className="modal-header__cont">
            <img
              className="modal-header__imgdepor"
              alt={`Logo ${arcSite}`}
              src={deployment(
                `${contextPath}/resources/dist/${arcSite}/images/alternate-logo.png`
              )}
            />
          </div>
        ),
      }[arcSite] || (
        <img
          className="modal-header__img"
          alt={`Logo ${arcSite}`}
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/images/${siteProperties.assets.header.logo}`
          )}
        />
      )}

      {type === 'large' ? (
        <button
          type="button"
          id="close-modal-link"
          className="modal-header__back"
          onClick={closePopup}>
          <Back
            color={
              arcSite === 'elcomercio' || arcSite === 'elcomerciomag'
                ? 'black'
                : 'white'
            }
          />
          <span
            className="modal-header__text"
            style={{
              color: arcSite === 'elcomerciomag' ? 'black' : '',
            }}>
            Volver
          </span>
        </button>
      ) : type === 'noclose' ? (
        ''
      ) : (
        <button
          type="button"
          id="close-modal"
          className="modal-header__close"
          onClick={() => {
            Taggeo(
              `Web_Sign_Wall_${typePopUp}`,
              `web_sw${typePopUp[0]}_boton_cerrar`
            )
            closePopup()
          }}>
          <Close
            color={
              arcSite === 'elcomercio' || arcSite === 'elcomerciomag'
                ? 'black'
                : 'white'
            }
          />
        </button>
      )}
    </>
  )

  return (
    <Context>
      {({ siteProperties, contextPath, deployment, arcSite }) => (
        <div
          className="modal-header"
          style={{
            background:
              arcSite === 'elcomerciomag'
                ? '#f7c600'
                : arcSite === 'elbocon'
                ? '#333333'
                : '',
          }}>
          {typeHeader(siteProperties, contextPath, deployment, arcSite)}
        </div>
      )}
    </Context>
  )
}

export default Header
