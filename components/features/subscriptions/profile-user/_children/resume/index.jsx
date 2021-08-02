import * as React from 'react'

import { useModalContext } from '../../../_context/modal'
import News from './_children/news'
import Prof from './_children/prof'
import Subs from './_children/subs'

const ResumeProfile = () => {
  const { changeTemplate } = useModalContext()

  return (
    <div className="sign-profile_general-wrapper">
      <Prof className="block-resume" prof={() => changeTemplate('prof')} />
      <Subs
        className="block-resume"
        detail={(id) => {
          changeTemplate('detail', id)
        }}
      />
      <News className="block-resume" news={() => changeTemplate('news')} />
    </div>
  )
}

export default ResumeProfile
