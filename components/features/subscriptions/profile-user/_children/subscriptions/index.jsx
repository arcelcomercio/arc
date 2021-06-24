import { useAppContext } from 'fusion:context'
import * as React from 'react'

import addScriptAsync from '../../../../../utilities/script-async'
import FormIntro from '../../../../signwall/_children/forms/form_intro'
import Loading from '../../../../signwall/_children/loading'
import { ModalConsumer } from '../../../_context/modal'
import {
  PropertiesCommon,
  PropertiesSite,
} from '../../../_dependencies/Properties'
import Subs from '../resume/_children/subs'

const Subscription = () => {
  const {
    arcSite,
    siteProperties: {
      signwall: { primaryFont },
    },
  } = useAppContext() || {}

  const { urls } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showLoading, setShowLoading] = React.useState(true)
  const [showSubs, setShowSubs] = React.useState()

  const getListSubs = () => {
    if (typeof window !== 'undefined') {
      window.Identity.extendSession().then(() => {
        window.Sales.getAllActiveSubscriptions()
          .then((res) => {
            if (res.length > 0) setShowSubs(true)
            setShowLoading(false)
          })
          .catch((err) => window.console.error(err))
      })
    }
  }

  React.useEffect(() => {
    addScriptAsync({
      name: 'SalesSDK',
      url: links.sales,
      includeNoScript: false,
    }).then(() => {
      window.Sales.options({ apiOrigin: urls.arcOrigin })
      getListSubs()
    })
  }, [])

  return (
    <div className="sign-profile_general-wrapper">
      {!showLoading ? (
        <>
          {showSubs ? (
            <Subs detail={(id) => changeTemplate('detail', id)} />
          ) : (
            <div className="sign-profile_general-resume-dates">
              <div className="cont-plan">
                <div className="first-plan">
                  <p>Accede ilimitadamente a nuestro contenido, adquiere el:</p>
                  <h3
                    className="sign-profile_general-title"
                    style={{
                      fontFamily: primaryFont,
                      fontSize: '40px',
                    }}>
                    Plan Digital
                  </h3>
                </div>
                <div className="last-plan">
                  <FormIntro arcSite={arcSite} typeDialog="organico" />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading arcSite={arcSite} typeBg="wait" />
      )}
    </div>
  )
}

export default Subscription
