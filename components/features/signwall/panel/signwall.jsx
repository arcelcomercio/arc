import React, { PureComponent, useEffect, useRef } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../_children/context'

import { ResumeProfile } from './_children/resume'
import MiPerfil from './_children/profile'
import Subscription from './_children/subscriptions'
import { NewsLetter } from './_children/newsletters'
import SubDetail from './_children/subscriptions/_children/detail'

const renderTemplate = (template, id) => {
  const templates = {
    home: <ResumeProfile />,
    news: <NewsLetter />,
    subs: <Subscription />,
    prof: <MiPerfil />,
    detail: <SubDetail IdSubscription={id} />,
  }
  return templates[template] || templates.home
}

const Panel = ({ siteProperties, addEventListener, removeEventListener }) => {
  if (
    typeof window !== 'undefined' &&
    window.Identity &&
    (!window.Identity.userProfile || !window.Identity.userIdentity.uuid)
  ) {
    window.location.href = '/'
  }

  const openHandler = useRef(item => {
    document.getElementById(item).click()
  }).current

  useEffect(() => {
    addEventListener('openMenu', openHandler)
    return () => {
      removeEventListener('openMenu', openHandler)
    }
  }, [])

  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <>
            <button
              type="button"
              id="home"
              style={{ display: 'none' }}
              onClick={() => value.changeTemplate('home')}></button>
            <button
              type="button"
              id="prof"
              style={{ display: 'none' }}
              onClick={() => value.changeTemplate('prof')}></button>
            <button
              type="button"
              id="news"
              style={{ display: 'none' }}
              onClick={() => value.changeTemplate('news')}></button>
            <button
              type="button"
              id="subs"
              style={{ display: 'none' }}
              onClick={() => value.changeTemplate('subs')}></button>

            {siteProperties.activePaywall ? (
              renderTemplate(value.selectedTemplate, value.idTemplate)
            ) : (
              <MiPerfil />
            )}
          </>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
}

@Consumer
class PanelSignwall extends PureComponent {
  render() {
    return (
      <Panel
        {...this.props}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

export default PanelSignwall
