/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useFusionContext } from 'fusion:context'

import URL from 'url-parse'
import * as S from './styled'
import addScriptAsync from '../../../utilities/script-async'
import { interpolateUrl } from '../_dependencies/domains'
import { sendAction, PixelActions } from '../_dependencies/analitycs'
import Card from './_children/card'
import ClickToCall from '../_children/click-to-call'
import Icon from '../_children/icon'
// import FillHeight from '../_children/fill-height'
import { useStrings } from '../_children/contexts'

const Portal = ({ theme }) => {
  const msgs = useStrings()
  const {
    arcSite,
    globalContent: items,
    customFields: { substractFeaturesHeights = '' },
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()

  const clickToCallUrl = interpolateUrl(urls.clickToCall)
  const digitalSubscriptionsHome = interpolateUrl(urls.digitalSubscriptionsHome)
  const corporateUrl = interpolateUrl(urls.corporateSuscription)
  const originSalesSdkUrl = interpolateUrl(urls.originSalesSdk)
  const originSubsOnline = interpolateUrl(urls.originSubsOnline)

  React.useEffect(() => {
    // Accion de datalayer "productImpressions"
    sendAction(PixelActions.PRODUCT_IMPRESSION, {
      ecommerce: {
        currencyCode: items[0].price.currencyCode,
        impressions: items.map(item => ({
          name: item.title,
          id: item.sku,
          price: item.price.amount,
          brand: arcSite,
          category: 'Suscripcion',
        })),
      },
    })
    addScriptAsync({
      name: 'sdkSalesARC',
      url: originSalesSdkUrl,
    })
    document.getElementById('footer').style.position = 'relative'
  }, [])

  const onSubscribeHandler = React.useRef(item => {
    sendAction(PixelActions.PRODUCT_CLICK, {
      ecommerce: {
        currencyCode: item.price.currencyCode,
        click: {
          products: [
            {
              name: item.title,
              id: item.sku,
              price: item.price.amount,
              brand: arcSite,
              category: 'Suscripcion',
            },
          ],
        },
      },
    })
  }).current

  const onHandlerCookie = React.useRef(()=>{
    const { pathname } = new URL(digitalSubscriptionsHome)
    window.sessionStorage.setItem('paywall_last_url', pathname)
    window.sessionStorage.setItem('paywall_type_modal', 'landing')
  }).current

  const substractFeaturesIds = substractFeaturesHeights
    .split(',')
    .map(id => id.trim())

  return (
    // <FillHeight substractElements={substractFeaturesIds}>
    <S.Portal backgroundColor={arcSite === 'elcomercio'}>
      <S.PortalContent>
        {items.map(item => (
          <Card item={item} key={item.title} onSubscribe={onSubscribeHandler} onSetCookie={onHandlerCookie}/>
        ))}
      </S.PortalContent>
      <S.Footer>
        <S.FooterContent>
          <S.LinkCorporate
            linkStyle
            href={arcSite === 'elcomercio' ? `${originSubsOnline}?ref=Boton_suscrip_imp` : corporateUrl}>
            <S.SubscribedText>
              <div>
                <span>{`${msgs.businessSubscriptionsBanner1}`}</span>
                <strong>{`${msgs.businessSubscriptionsBanner2}`}</strong>
              </div>
              <Icon type={theme.icon.arrowRight} />
            </S.SubscribedText>
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
