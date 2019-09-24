import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'

import * as S from './styled'
import addScriptAsync from '../../../utilities/script-async'
import getDomain from '../_dependencies/domains'
import Card from './_children/card'
import ClickToCall from '../_children/click-to-call'
import FillHeight from '../_children/fill-height'

const Portal = () => {
  const context = useFusionContext()
  const {
    globalContent: items,
    customFields: { substractFeaturesHeights = '' },
    siteProperties: {
      paywall: { clickToCall },
    },
  } = context
  React.useEffect(() => {
    addScriptAsync({
      name: 'sdkSalesARC',
      url: getDomain('ORIGIN_SALES_SDK'),
    })
    document.getElementsByClassName('foot')[0].style.position = 'relative'
  }, [])

  const substractFeaturesIds = substractFeaturesHeights
    .split(',')
    .map(id => id.trim())

  return (
    <FillHeight substractElements={substractFeaturesIds}>
      <S.Portal>
        <S.PortalContent>
          {items.map(item => (
            <Card item={item} key={item.title} />
          ))}
        </S.PortalContent>
        <S.Footer>
          <S.FooterContent>
            <S.LinkCorporate href={getDomain('URL_CORPORATE')}>
              SUSCRIPCIONES CORPORATIVAS
            </S.LinkCorporate>
            <S.ClickToCallWrapper>
              <ClickToCall href={clickToCall} />
            </S.ClickToCallWrapper>
          </S.FooterContent>
        </S.Footer>
      </S.Portal>
    </FillHeight>
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
