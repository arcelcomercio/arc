/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../signwall/context'

// eslint-disable-next-line import/prefer-default-export
export const FormIntro = () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalConsumer>
      {value => (
        <S.Form>
          <S.ContPaywall>
            <div className="cont-price-detail">
              <div className="price">
                <i>s/</i>29
              </div>
              <div className="detail-price">
                <p>
                  <strong>al mes</strong>
                </p>
                <p>
                  <strong>durante 6 meses</strong>
                </p>
                <p>Luego S/ 39 al mes</p>
              </div>
            </div>

            <h3 className="title-line line-gestion uppercase text-center mt-30 mb-20">
              <span>Beneficios</span>
            </h3>

            <ul className="list-benefits mb-20">
              <li>
                Contenido premium: análisis e informes exclusivamente
                desarrollados para gestion.pe. Navegación ilimitada desde todos
                tus dispositivos.
              </li>
              <li>
                La mejor selección de artículos e informes elaborados por el
                diario Gestión, The Economist y la agencia Bloomberg.
              </li>
            </ul>
          </S.ContPaywall>

          <S.Button type="button" onClick={() => value.changeTemplate('login')}>
            CONTINUAR
          </S.Button>

          <S.Text c="gray" s="15" lh="26" className="mt-20 mb-10 center">
            ¿ESTÁS SUSCRITO AL DIARIO IMPRESO?
            <br />
            Disfruta <strong>3 meses GRATIS </strong> y luego S/ 19 al mes.
          </S.Text>
        </S.Form>
      )}
    </ModalConsumer>
  )
}
