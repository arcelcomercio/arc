import React from 'react'
import * as S from './styled'
import Icon from '../../../../../_children/icon'
import Panel from '../../../../../_children/panel'
import Bullet from '../../../../../_children/bullet-point'

function Summary({ title, backgroundColor, feature = [] }) {
  return (
    <Panel type="summary">
      <S.Wrap>
        <S.Head>
          <S.WrapTitle>
            <S.NamePlan>{title}</S.NamePlan>
          </S.WrapTitle>
          <Icon type="devices" width="66" height="54" />
        </S.Head>

        <S.Separate style={{ backgroundColor }}/>

        <S.WrapFeature>
          {feature.map((text, index) => {
            const key = `${text}-${index}`
            return (
              <Bullet key={key} icon={<Icon type="check" />}>
                {text}
              </Bullet>
            )
          })}
        </S.WrapFeature>
      </S.Wrap>
    </Panel>
  )
}

export default Summary
