/* eslint-disable no-nested-ternary */
import React from 'react'
import Context from 'fusion:context'
import { Back, Close } from './iconos'
import Taggeo from '../_dependencies/taggeo'
import { getAssetsPath } from '../../../utilities/constants'

const Header = ({ type, closePopup, typePopUp }) => {
  const typeHeader = (siteProperties, contextPath, deployment, arcSite) => (
    <>
      <div className={`modal-header__cont-${arcSite}`}>
        {{
          elcomerciomag: (
            <img
              className="modal-header__img"
              alt={`Logo ${arcSite}`}
              src={deployment(
                `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/elcomercio/images/logo.png`
              )}
            />
          ),
          gestion: (
            <img
              className="modal-header__img"
              alt={`Logo ${arcSite}`}
              src={deployment(
                `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/white-logo.png`
              )}
            />
          ),
          depor: (
            <img
              className={`modal-header__img-${arcSite}`}
              alt={`Logo ${arcSite}`}
              src={deployment(
                `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/alternate-logo.png`
              )}
            />
          ),
        }[arcSite] || (
          <img
            className={`modal-header__img modal-header__img-${arcSite}`}
            alt={`Logo ${arcSite}`}
            src={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/${
                siteProperties.assets.header.logo
              }`
            )}
          />
        )}
      </div>

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
        <div className={`modal-header color-${arcSite}`}>
          {typeHeader(siteProperties, contextPath, deployment, arcSite)}
        </div>
      )}
    </Context>
  )
}

export default Header
