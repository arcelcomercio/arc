import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../../utilities/assets'
import { SITE_GESTION } from '../../../../../../utilities/constants/sitenames'
import { ModalProvider } from '../../../../../subscriptions/_context/modal'

export const PremiumPayment = ({ name = '', feature = [] }) => {
  const {
    arcSite,
    contextPath,
    siteProperties: {
      signwall: { primaryFont },
    },
  } = useAppContext() || {}

  return (
    <div
      className="signwall-inside_body-left premium"
      style={{
        background: `${arcSite === 'gestion' ? '#8f071f' : '#232323'}`,
      }}>
      <img
        src={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/paywall_bg.jpg?d=1`}
        alt={`Ejemplo de usuario suscriptor de ${arcSite}`}
        className="signwall-inside_body-left__bg"
      />
      <div
        className="signwall-inside_body-cont premium"
        style={{
          padding: arcSite === SITE_GESTION ? '15px 10px' : '12px 20px',
        }}>
        <p>
          Para acceder a este contenido
          <br />
          exclusivo, adquiere tu
        </p>
        <h3
          className="signwall-inside_body-title premium"
          style={{
            fontFamily: primaryFont,
          }}>
          {name}
        </h3>
        <center>
          <img
            alt="Logo"
            className={`logo ${arcSite}`}
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/logo_${arcSite}.png?d=1`}
          />
        </center>
        <ul className="list-benefits mb-20">
          {feature.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const PremiumPaymentInt = (props) => (
  <ModalProvider>
    <PremiumPayment properties={props} />
  </ModalProvider>
)

export { PremiumPaymentInt }
