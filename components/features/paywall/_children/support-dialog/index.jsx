import React from 'react'
import { useFusionContext } from 'fusion:context'

import { devices } from '../../_dependencies/devices'
import Modal from '../modal'
import {
  DialogContent,
  ContentWrapper,
  Title,
  Subtitle,
  Paragraph,
  LongMail,
} from './styled'

const SupportDialog = props => {
  const { contextPath, deployment, siteProperties } = useFusionContext()
  const { assets } = siteProperties
  const supportImageUrl = deployment(
    `${contextPath}${assets.path}${assets.paywall.support}`
  )

  return (
    <Modal {...props}>
      <DialogContent>
        <picture>
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <img src={supportImageUrl} alt="support" />
        </picture>
        <ContentWrapper>
          <Title>Soporte</Title>
          <br />
          <Subtitle>
            Si tienes dudas o consultas, llámanos o envíanos un correo
          </Subtitle>
          <br />
          <Paragraph>
            <b>Central Telefónica:</b>
            <br />
            (+51) 311 5100
          </Paragraph>
          <br />
          <Paragraph>
            <b>Horario de atención:</b>
            <br />
            De lunes a viernes: 7 am - 2 pm <br />
            Sábados, domingos y feriados: de 7am - 1pm
          </Paragraph>
          <br />
          <Paragraph paragraph>
            <b>Correos:</b>
            <br />
            <span>
              - Servicio al cliente y Ventas: suscriptores@diariogestión.com.pe
            </span>
            <br />
            <span>- Pagos pendientes y Facturación: </span>
            <LongMail>cobranzas@suscripcionesintegrales.com.pe</LongMail>
            <br />
          </Paragraph>
        </ContentWrapper>
      </DialogContent>
    </Modal>
  )
}

export default SupportDialog
