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
import { ResumeDates, Title, Wrapper } from '../../styled'
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
    <Wrapper>
      {!showLoading ? (
        <>
          {showSubs ? (
            <Subs detail={(id) => changeTemplate('detail', id)} />
          ) : (
            <ResumeDates>
              <div className="cont-plan">
                <div className="first-plan">
                  <p>Accede ilimitadamente a nuestro contenido, adquiere el:</p>
                  <Title s="40" f={primaryFont}>
                    Plan Digital
                  </Title>
                </div>
                <div className="last-plan">
                  <FormIntro arcSite={arcSite} typeDialog="organico" />
                </div>
              </div>
            </ResumeDates>
          )}
        </>
      ) : (
        <Loading arcSite={arcSite} typeBg="wait" />
      )}
    </Wrapper>
  )
}

export default Subscription
