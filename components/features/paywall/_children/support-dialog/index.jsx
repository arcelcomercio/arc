import React from 'react'
import { withTheme } from 'styled-components'

import Modal from '../modal'
import * as S from './styled'

const SupportDialog = props => {
  const { theme } = props
  return (
    <Modal scrollable {...props}>
      <S.DialogContent>
        <picture>
          <source
            media={theme.breakpoints.down('xs')}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <source srcSet={theme.images.support_webp} type="image/webp" />
          <img src={theme.images.support} alt="support" />
        </picture>
        <S.ContentWrapper>
          <S.Title>Soporte</S.Title>
          <br />
          <S.Subtitle>
            Si tienes dudas o consultas, llámanos o envíanos un correo
          </S.Subtitle>
          <br />
          <S.Paragraph>
            <b>Central Telefónica:</b>
            <br />
            (+51) 311 5100
          </S.Paragraph>
          <br />
          <S.Paragraph>
            <b>Horario de atención:</b>
            <br />
            De lunes a viernes: 7 am - 2 pm <br />
            Sábados, domingos y feriados: de 7am - 1pm
          </S.Paragraph>
          <br />
          <S.Paragraph paragraph>
            <b>Correos:</b>
            <br />
            <span>
              - Servicio al cliente y Ventas: suscriptores@diariogestión.com.pe
            </span>
            <br />
            <span>- Pagos pendientes y Facturación: </span>
            <S.LongMail>cobranzas@suscripcionesintegrales.com.pe</S.LongMail>
            <br />
          </S.Paragraph>
        </S.ContentWrapper>
      </S.DialogContent>
    </Modal>
  )
}

const ThemedSupportDialog = withTheme(SupportDialog)
export default ThemedSupportDialog
