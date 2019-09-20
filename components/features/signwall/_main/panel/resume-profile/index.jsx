import React from 'react'
import Prof from './prof'
import Subs from './subs'
import { News } from './news'
import { ModalConsumer } from '../../signwall/context'
import { Wrapper } from '../../../_styles/common'

// eslint-disable-next-line import/prefer-default-export
export const ResumeProfile = () => {
  return (
    <ModalConsumer>
      {value => (
        <Wrapper>
          <Prof prof={() => value.changeTemplate('prof')}  />
          <div className="space-40" />
          <Subs />
          <div className="space-40" />
          <News news={() => value.changeTemplate('news')} />
        </Wrapper>
      )}
    </ModalConsumer>
  )
}
