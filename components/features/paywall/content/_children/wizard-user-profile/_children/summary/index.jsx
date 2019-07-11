import React from 'react'
import Panel from '../../../../../_children/panel'
import Bullet from '../../../bullet-point'
import Icon from '../../../../../_children/icon'
import * as S from './styled'

const Summary = () => {
  return (
    <Panel type="summary">
      <S.Summary>
        <Footer />
        <Content />
      </S.Summary>
    </Panel>
  )
}

const offers = [
  {
    name: 'Precio del plan',
    price: 'S/ 10.00',
    discount: false,
  },
  {
    name: 'Descuento de suscriptor',
    price: '- S/ 15.00',
    discount: true,
  },
]

const Content = () => {
  return (
    <div>
      <S.Content>
        {offers.map(({ name, price, discount }) => (
          <S.Expand key={name} discount={discount}>
            <span>{name}</span>
            <strong>
              <span>{price}</span>
            </strong>
          </S.Expand>
        ))}
        <S.Expand size={18}>
          <strong>
            <span>TOTAL</span>
          </strong>
          <strong>
            <span>
              <span style={{ fontSize: '14px' }}>S/.</span> 29.00
            </span>
          </strong>
        </S.Expand>
      </S.Content>
    </div>
  )
}

const Footer = () => {
  return (
    <S.Footer>
      <S.WrapTitle>
        <S.SummaryTitle>DETALLE DE COMPRA</S.SummaryTitle>
        <S.NamePlan>Plan Digital</S.NamePlan>
      </S.WrapTitle>
      <Bullet icon={<Icon type="check" fill="#FFF" />}>
        Lee ilimitadamente en gestion.pe, desde todos tus dispositivos.
      </Bullet>
      <Bullet icon={<Icon type="check" fill="#FFF" />}>
        Accede a contenido exclusivo en la web (disponible únicamente para
        suscriptores digitales).
      </Bullet>
    </S.Footer>
  )
}

export default Summary
