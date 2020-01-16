/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import * as S from './styles'
import { ModalConsumer } from '../../../_children/context'
import Loading from '../../../_children/loading'
import Domains from '../../../_dependencies/domains'
import Taggeo from '../../../_dependencies/taggeo'

export const FormIntro = ({
  getContent,
  arcSite,
  typeDialog,
  removeBefore = i => i,
}) => {
  const [showLoading, setShowLoading] = useState(true)
  const [showPaywallBtn, setShowPaywallBtn] = useState(false)
  const [resCampaing, setResCampaing] = useState({})

  useEffect(() => {
    const { fetched } = getContent('paywall-campaing')
    fetched.then(resCam => {
      setResCampaing({
        paywallPrice: resCam.plans[0].amount || '-',
        paywallFrecuency: resCam.plans[0].billingFrequency || '-',
        paywallTitle: resCam.plans[0].description.title || '-',
        paywallDescripcion: resCam.plans[0].description.description || '-',
        featuresDescription: resCam.summary.feature || [],
      })
      setShowLoading(false)
    })
  }, [])

  useEffect(() => {
    if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
      setShowPaywallBtn(true)
    }
  }, [])

  const frecuency = {
    Month: 'al mes',
    Year: 'al año',
  }

  const handleSuscription = () => {
    switch (typeDialog) {
      case 'premium':
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.location.pathname ? window.location.pathname : ''
        )
        break
      case 'paywall':
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.document.referrer
            ? window.document.referrer.split(window.location.origin)[1]
            : ''
        )
        break
      default:
        window.sessionStorage.setItem('paywall_last_url', '/')
    }

    removeBefore() // dismount before
    window.sessionStorage.setItem('paywall_type_modal', typeDialog)
    window.location.href = Domains.getUrlPaywall(arcSite)
  }

  return (
    <ModalConsumer>
      {value => (
        <S.Form>
          {showLoading ? (
            <Loading arcSite={arcSite} />
          ) : (
            <>
              <S.ContPaywall>
                <div className="cont-price-detail">
                  <div className="price">
                    <i>s/</i>
                    {resCampaing.paywallPrice}
                  </div>
                  <div className="detail-price">
                    <p>
                      <strong>{frecuency[resCampaing.paywallFrecuency]}</strong>
                    </p>
                    <p>
                      <strong>{resCampaing.paywallTitle}</strong>
                    </p>
                    <p>{resCampaing.paywallDescripcion}</p>
                  </div>
                </div>

                <h3 className="title-line line-gestion uppercase text-center mt-30 mb-20">
                  <span>Beneficios</span>
                </h3>

                <ul className="list-benefits mb-20">
                  {resCampaing.featuresDescription.map(item => {
                    return <li key={item}>{item}</li>
                  })}
                </ul>
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
                    value.changeTemplate('login')
                  }}>
                  CONTINUAR
                </S.Button>
              )}

              <S.Text c="gray" s="15" lh="26" className="mt-20 mb-10 center">
                ¿ESTÁS SUSCRITO AL DIARIO IMPRESO?
                <br />
                Disfruta
                <strong>
                  {arcSite === 'elcomercio' ? ' 6 ' : ' 3 '} meses GRATIS{' '}
                </strong>
                y luego S/{arcSite === 'elcomercio' ? ' 10 ' : ' 19 '} al mes.
              </S.Text>
            </>
          )}
        </S.Form>
      )}
    </ModalConsumer>
  )
}
