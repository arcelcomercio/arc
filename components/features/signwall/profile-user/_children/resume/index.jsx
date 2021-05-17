import * as React from 'react'

import { ModalConsumer } from '../../../_children/context'
import { Wrapper } from '../../styled'
import News from './_children/news'
import Prof from './_children/prof'
import Subs from './_children/subs'

export const ResumeProfile = () => (
  <ModalConsumer>
    {(value) => (
      <Wrapper>
        <Prof
          className="block-resume"
          prof={() => value.changeTemplate('prof')}
        />
        <Subs
          className="block-resume"
          detail={(id) => {
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
