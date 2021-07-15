import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'
import { DialogType, SubsArcSite } from 'types/subscriptions'

import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import PWA from '../_dependencies/Pwa'
import customFields from './_dependencies/custom-fields'

type SubscriptionsFooterProps = {
  customFields?: {
    type?: DialogType
  }
}

const SubscriptionsFooter: FC<SubscriptionsFooterProps> = (props) => {
  const { customFields: { type = 'landing' } = {} } = props

  const { arcSite } = useAppContext() || {}
  const { urls, texts } = PropertiesSite[arcSite as SubsArcSite]
  const { links } = PropertiesCommon

  return (
    <footer className="footer" id="footer">
      <div
        className={type === 'payment' ? 'wrapper-buy step__footer' : 'wrapper'}>
        <div className="footer__content">
          <div className="footer__grid">
            <div className="footer__item grid-four-one">
              <div className="footer__content-mail">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={urls.homeUrl}
                  aria-label={arcSite}>
                  <div className="footer__content-logo" />
                </a>
                <p>
                  Llámanos al
                  <br />
                  <a href={links.callCenter} className="footer__content-link">
                    Call Center: 311-5100
                  </a>
                </p>
              </div>
            </div>
            <div className="footer__item grid-four-two">
              <div className="footer__content-ayuda footer__content-accordion">
                <input type="checkbox" defaultChecked />
                <i />
                <h4 className="footer__content-title">Ayuda</h4>
                <div className="cont">
                  <p>
                    <a
                      href={links.preguntas}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__content-link">
                      Preguntas Frecuentes
                    </a>
                  </p>
                  <p>
                    Servicio al cliente y Ventas:
                    <br />
                    <a href={links.callCenter} className="footer__content-link">
                      Call Center: 311-5100
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="footer__item grid-four-three">
              <div className="footer__content-legal footer__content-accordion">
                <input type="checkbox" defaultChecked />
                <i />
                <h4 className="footer__content-title">Legal</h4>
                <div className="cont">
                  <p>
                    <a
                      href={urls.terminos}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__content-link">
                      Términos y Condiciones
                    </a>
                  </p>
                  <p>
                    <a
                      href={urls.politicas}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__content-link">
                      Política de Privacidad
                    </a>
                  </p>
                  <p>
                    <a
                      href={urls.reclamos}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__content-link">
                      Libro de Reclamaciones
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="footer__item grid-four-four">
              <div className="footer__content-encuentranos">
                <h4 className="footer__content-title">Encuéntranos</h4>
                <div className="footer__content-encuentranos-social">
                  <a
                    href={urls.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter">
                    <i className="icon-twitter" />
                  </a>
                  <a
                    href={urls.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook">
                    <i className="icon-facebook" />
                  </a>
                  <a
                    href={urls.instangram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram">
                    <i className="icon-instangram" />
                  </a>
                </div>

                {!PWA.isPWA() && (
                  <div className="footer__content-encuentranos-apps">
                    <a
                      href={urls.appStore}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="AppStore">
                      <i className="icon-appstore" />
                    </a>
                    <a
                      href={urls.googlePlay}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GooglePlay">
                      <i className="icon-googleplay" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footer__end">
          <p>{texts.footerEnd}</p>
        </div>
      </div>
    </footer>
  )
}

SubscriptionsFooter.propTypes = {
  customFields,
}

export default SubscriptionsFooter
