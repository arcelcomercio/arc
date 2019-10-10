import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'

import * as S from './styled'
import addScriptAsync from '../../../utilities/script-async'
import { interpolateUrl } from '../_dependencies/domains'
import Card from './_children/card'
import ClickToCall from '../_children/click-to-call'
// import FillHeight from '../_children/fill-height'

const Portal = () => {
  const {
    arcSite,
    globalContent: items,
    customFields: { substractFeaturesHeights = '' },
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const clickToCallUrl = interpolateUrl(urls.clickToCall)
  const corporateUrl = interpolateUrl(urls.corporateSuscription)
  const originSalesSdkUrl = interpolateUrl(urls.originSalesSdk)

  React.useEffect(() => {
    addScriptAsync({
      name: 'sdkSalesARC',
      url: originSalesSdkUrl,
    })
    document.getElementById('footer').style.position = 'relative'
  }, [])

  const substractFeaturesIds = substractFeaturesHeights
    .split(',')
    .map(id => id.trim())

  return (
    // <FillHeight substractElements={substractFeaturesIds}>
    <S.Portal backgroundColor={arcSite === 'elcomercio'}>
      <S.PortalContent>
        {items.map(item => (
          <Card item={item} key={item.title} />
        ))}
      </S.PortalContent>
      <S.Footer>
        <S.FooterContent>
          <S.LinkCorporate href={corporateUrl}>
            SUSCRIPCIONES CORPORATIVAS
          </S.LinkCorporate>
          <S.ClickToCallWrapper>
            <ClickToCall href={clickToCallUrl} />
          </S.ClickToCallWrapper>
        </S.FooterContent>
      </S.Footer>
    </S.Portal>
    // </FillHeight>
  )
}

const ThemedPortal = withTheme(Portal)
ThemedPortal.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string,
    substractFeaturesHeights: PropTypes.string,
  }),
}

export default ThemedPortal
