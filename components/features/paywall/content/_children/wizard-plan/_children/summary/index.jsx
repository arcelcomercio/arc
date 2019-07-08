import React from 'react'
import * as S from './styled'
import Icon from '../../../../../_children/icon'
import Panel from '../../../../../_children/panel'

function Feature({ icon, children }) {
  return (
    <S.Feature>
      <S.WrapIcon>{icon}</S.WrapIcon>
      <div>{children}</div>
    </S.Feature>
  )
}

function Summary() {
  return (
    <Panel type="summary">
      <S.Wrap>
        <S.Head>
          <S.WrapTitle>
            <S.SummaryTitle>Plan</S.SummaryTitle>
            <S.NamePlan>Digital</S.NamePlan>
          </S.WrapTitle>
          <Icon type="devices" width="66" height="54" />
        </S.Head>

        <S.Separate />

        <S.WrapFeature>
          <Feature icon={<Icon type="check" />}>
            Lee ilimitadamente en gestion.pe, desde todos tus dispositivos.
          </Feature>
          <Feature icon={<Icon type="check" />}>
            Accede a contenido exclusivo en la web (disponible únicamente para
            suscriptores digitales).
          </Feature>
        </S.WrapFeature>
      </S.Wrap>
    </Panel>
  )
}

export default Summary
