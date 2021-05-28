import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import Markdown from 'react-markdown/with-html'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import { getUrlPaywall } from '../../_dependencies/domains'
import Loading from '../loading'
import * as S from './styles'

const FormIntro = ({
  typeDialog,
  removeBefore = (i) => i,
  checkModal = (i) => i,
}) => {
  const { arcSite } = useAppContext() || {}
  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showLoading, setShowLoading] = React.useState(true)
  const [showPaywallBtn, setShowPaywallBtn] = React.useState(false)

  const { summary: { feature = [] } = {}, plans = [], printAttributes = [] } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  const frecuency = {
    Month: 'al mes',
    Year: 'al año',
  }

  const getPLanSelected = plans.reduce(
    (prev, plan) => (plan.description.checked ? plan : prev),
    null
  )

  const {
    amount = '',
    billingFrequency = '',
    description: { title = '', description = '' } = {},
  } = getPLanSelected || {}

  React.useEffect(() => {
    setShowLoading(false)
    if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
      setShowPaywallBtn(true)
    }
  }, [])

  const handleSuscription = () => {
    switch (typeDialog) {
      case 'premium':
      case 'paywall':
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.location.pathname ? window.location.pathname : ''
        )
        break
      default:
        window.sessionStorage.setItem('paywall_last_url', '/')
    }

    removeBefore()
    window.sessionStorage.setItem('paywall_type_modal', typeDialog)
    window.location.href = getUrlPaywall(arcSite)
  }

  return (
    <S.Form typeDialog={typeDialog}>
      {showLoading ? (
        <Loading arcSite={arcSite} typeBg="wait" typeDialog={typeDialog} />
      ) : (
        <>
          <S.ContPaywall>
            <div className="cont-price-detail">
              {amount === 0 ? (
                <div className="price-middle">
                  <h3>Gratis</h3>
                </div>
              ) : (
                <div className="price">
                  <i>s/</i>
                  {amount}
                </div>
              )}
              <div
                className={
                  amount === 0 ? 'detail-price-middle' : 'detail-price'
                }>
                {amount !== 0 && (
                  <p>
                    <strong>{frecuency[billingFrequency]}</strong>
                  </p>
                )}
                <p>
                  <strong>{title}</strong>
                </p>
                <p>{description}</p>
              </div>
            </div>

            {typeDialog !== 'premium' ? (
              <>
                <h3 className="title-line line-gestion uppercase text-center mt-30 mb-20">
                  <span>Beneficios</span>
                </h3>

                <ul className="list-benefits mb-20">
                  {feature.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="mt-20 block" />
            )}
          </S.ContPaywall>

          {showPaywallBtn ? (
            <S.Button
              type="button"
              onClick={() => {
                Taggeo(
                  `Web_${typeDialog}_Hard`,
                  `web_${typeDialog}_boton_ver_planes`
                )
                handleSuscription()
              }}>
              VER PLANES
            </S.Button>
          ) : (
            <S.Button
              type="button"
              onClick={() => {
                Taggeo(
                  `Web_${typeDialog}_Hard`,
                  `web_${typeDialog}_boton_iniciar_continuar`
                )

                if (typeDialog === 'premium') {
                  window.sessionStorage.setItem(
                    'paywall_last_url',
                    window.location.pathname ? window.location.pathname : ''
                  )
                } else {
                  window.sessionStorage.setItem(
                    'paywall_last_url',
                    window.document.referrer
                      ? window.document.referrer.split(
                          window.location.origin
                        )[1]
                      : ''
                  )
                }
                changeTemplate('login')
                checkModal()
              }}>
              CONTINUAR
            </S.Button>
          )}

          <S.Text
            c="gray"
            s={typeDialog === 'premium' ? '12' : '15'}
            className="mt-20 mb-10 center">
            {printAttributes.map((item) => (
              <React.Fragment key={item.name}>
                {item.name === 'subscriber_title_popup' && item.value}
              </React.Fragment>
            ))}
          </S.Text>

          <S.Text
            c="gray"
            s={typeDialog === 'premium' ? '12' : '15'}
            className={`center note-premium ${
              arcSite === 'elcomercio' ? 'mb-10' : ''
            }`}>
            {printAttributes.map(
              (item) =>
                item.name === 'subscriber_detail_popup' && (
                  <React.Fragment key={item.name}>
                    <Markdown
                      source={item.value}
                      escapeHtml={false}
                      unwrapDisallowed
                      disallowedTypes={['paragraph']}
                    />
                  </React.Fragment>
                )
            )}
          </S.Text>
        </>
      )}
    </S.Form>
  )
}

export default FormIntro
