import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { withTheme } from 'styled-components'

import './paywall.css'
import Icon from '../_children/icon'
import SupportDialog from '../_children/support-dialog'
import Link from '../_children/link'
import getDomain from '../_dependencies/domains'

const Foot = ({ theme }) => {
  const {
    siteProperties,
    customFields: { id },
  } = useFusionContext()
  const { social, apps } = siteProperties
  const [supportOpen, setSupportOpen] = React.useState(false)

  return (
    <div id={id} className="foot">
      <SupportDialog
        showClose
        open={supportOpen}
        onClose={e => setSupportOpen(false)}
      />
      <div className="footer-content">
        <div>
          <div>
            <Icon className="img logo" alt="Gestión" type={theme.icon.logo} />
          </div>
          <p className="text">
            Contáctanos al <a href="tel:+5113115100">01 311-5100</a> o{' '}
            <a href="mailto:suscriptores@diariogestion.com.pe">
              suscriptores@diariogestion.com.pe
            </a>
          </p>
          <p className="text">
            Paquetes que incluyen diario impreso, disponibles sólo para Lima y
            Callao
          </p>
        </div>
        <div>
          <ul className="list">
            <li>
              <Link
                id="soporte"
                href="/"
                className="list_link"
                onClick={e => setSupportOpen(true)}>
                Soporte
              </Link>
            </li>
            <li>
              <a
                href="https://gestion.pe/politica-de-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="list_link">
                Políticas de privacidad
              </a>
            </li>
            <li>
              <a
                href={getDomain('URL_FAQ')}
                rel="noopener noreferrer"
                target="_blank"
                className="list_link">
                Preguntas frecuentes
              </a>
            </li>

            <li>
              <a
                href="http://ecomedia.pe/libro/registrar/elcomercio/"
                target="_blank"
                rel="noopener noreferrer"
                className="list_link">
                Libro de reclamaciones
              </a>
            </li>
            <li>
              <a
                href="https://suscripciones.gestion.pe/terminos/"
                target="_blank"
                rel="noopener noreferrer"
                className="list_link">
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="sub-title">Descarga nuestra app</h3>
          <div className="center-content">
            <a
              href={apps.ios.url}
              target="_blank"
              rel="noopener noreferrer"
              className="image-content">
              <Icon type="appStore" />
            </a>
            <a
              href={apps.android.url}
              target="_blank"
              rel="noopener noreferrer"
              className="image-content">
              <Icon type="googlePlay" />
            </a>
          </div>
        </div>
        <div className="social-content">
          <a
            href={social.twitter.url}
            target="_blank"
            rel="noopener noreferrer">
            <i>
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 880 1024">
                <title>Twitter</title>
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z" />
              </svg>
            </i>
          </a>
          <a
            href={social.facebook.url}
            target="_blank"
            rel="noopener noreferrer">
            <i>
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 675 1024">
                <title>Facebook</title>
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z" />
              </svg>
            </i>
          </a>
          <a
            href={social.linkedin.url}
            target="_blank"
            rel="noopener noreferrer">
            <Icon type="linkedin" />
          </a>
        </div>
      </div>
    </div>
  )
}

Foot.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string,
  }),
}

export default Foot
