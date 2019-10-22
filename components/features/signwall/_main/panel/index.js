import React from 'react'
import { PanelWrapper, PanelContent } from './styles'
import { MenuProfile } from './menu-profile'
import { ResumeProfile } from './resume-profile'
import { NewsLetter } from './newsletters'
import MiPerfil from './profile'
import Subscription from './subcription'
import { ModalProvider, ModalConsumer } from '../signwall/context'
import Modal from '../common/modal'
import Header from '../common/header'
import GetProfile from '../utils/get-profile'
import SubDetail from './subcription/detail'

const getNameProfile = name => {
  window.console.log(name)
}

const renderTemplate = (template, id) => {
  const templates = {
    // eslint-disable-next-line react/jsx-filename-extension
    home: <ResumeProfile />,
    news: <NewsLetter />,
    subs: <Subscription />,
    prof: <MiPerfil getNameProfile={getNameProfile} />,
    detail: <SubDetail IdSubscription={id} />,
  }
  return templates[template] || templates.home
}

// eslint-disable-next-line import/prefer-default-export
export const Panel = props => {
  const { closePopup, closeDispatchEvent, arcSite } = props

  // React.useEffect(() => {
  const { publicProfile } = new GetProfile()
  const { identities = [] } = publicProfile
  const [identitie = { type: 'Password' }] = identities || []
  const [usernameid = { userName: '' }] = identities || []
  const nameInit = publicProfile.firstName || 'Usuario'

  const typeLogin = identitie.type.toLowerCase()
  const userName =
    nameInit.length >= 20 ? `${nameInit.slice(0, 16)}...` : nameInit
  const emailUser = publicProfile.email || 'admin@elcomercio.pe'
  const userNameFB = usernameid.userName

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <Modal
            size="full"
            position="fit"
            color="#f4f4f4"
            name="arc-popup-profile"
            id="arc-popup-profile">
            <Header closePopup={closePopup} type="large" />
            <PanelWrapper>
              <PanelContent>
                <div className="panel-left">
                  <MenuProfile
                    arcSite={arcSite}
                    emailUser={emailUser}
                    userNameFB={userNameFB}
                    userName={userName}
                    typeLogin={typeLogin}
                    closePopup={closePopup}
                    userNameRefresh={getNameProfile}
                    closeDispatchEvent={closeDispatchEvent}
                    home={() => value.changeTemplate('home')}
                    news={() => value.changeTemplate('news')}
                    subs={() => value.changeTemplate('subs')}
                    prof={() => value.changeTemplate('prof')}
                  />
                </div>
                <div className="panel-right">
                  {arcSite === 'gestion' || arcSite === 'elcomercio' ? (
                    <>{renderTemplate(value.selectedTemplate, value.idTemplate)}</>
                  ) : (
                    <MiPerfil />
                  )}
                </div>
              </PanelContent>
            </PanelWrapper>
          </Modal>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
  // })
}
