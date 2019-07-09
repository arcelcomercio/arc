import React from 'react'
import * as S from './styled'
import Icon from '../../../../../_children/icon'
import Panel from '../../../../../_children/panel'
import Bullet from '../../../bullet-point'

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
          <Bullet icon={<Icon type="check" />}>
            Lee ilimitadamente en gestion.pe, desde todos tus dispositivos.
          </Bullet>
          <Bullet icon={<Icon type="check" />}>
            Accede a contenido exclusivo en la web (disponible únicamente para
            suscriptores digitales).
          </Bullet>
        </S.WrapFeature>
      </S.Wrap>
    </Panel>
  )
}

export default Summary
