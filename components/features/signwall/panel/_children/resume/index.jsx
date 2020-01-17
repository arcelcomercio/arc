import React from 'react'
import Prof from './_children/prof'
import Subs from './_children/subs'
import { News } from './_children/news'
import { Wrapper } from '../../styled'
import { ModalConsumer } from '../../../_children/context'

// eslint-disable-next-line import/prefer-default-export
export const ResumeProfile = () => {
  return (
    <ModalConsumer>
      {value => (
        <Wrapper>
          <Prof
            className="block-resume"
            prof={() => value.changeTemplate('prof')}
          />
          <Subs
            className="block-resume"
            detail={id => {
              value.changeTemplate('detail', id)
            }}
          />
          <News
            className="block-resume"
            news={() => value.changeTemplate('news')}
          />
        </Wrapper>
      )}
    </ModalConsumer>
  )
}
