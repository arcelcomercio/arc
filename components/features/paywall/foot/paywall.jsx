import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { withTheme } from 'styled-components'

import Icon from '../_children/icon'
import SupportDialog from '../_children/support-dialog'
import { interpolateUrl } from '../_dependencies/domains'
import { useStrings } from '../_children/contexts'
import * as S from './styled'

const Foot = ({ theme }) => {
  const msgs = useStrings()
  const {
    arcSite,
    siteProperties,
    customFields: { id },
  } = useFusionContext()
  const {
    siteName,
    paywall: { urls },
  } = siteProperties
  const [supportOpen, setSupportOpen] = React.useState(false)

  return (
    <S.Foot id={id}>
      <SupportDialog
        showClose
        site={arcSite}
        open={supportOpen}
        onClose={e => setSupportOpen(false)}
      />
      <S.Content>
        <div>
          <div>
            <S.Icon alt={siteName} type={theme.icon.logo} />
          </div>
          <S.Text>
            {`${msgs.contactUs} `}
            <a href={interpolateUrl(urls.contactPhoneRef)}>
              {msgs.contactPhoneNumber}
            </a>{' '}
            o{' '}
            <a href={interpolateUrl(urls.contactEmailRef)}>
              {msgs.contactEmail}
            </a>
          </S.Text>
          <S.Text>{msgs.footerAd}</S.Text>
        </div>
        <div>
          <S.List>
            <li id={msgs.supportLink}>
              <S.Link
                href="/"
                onClick={e => {
                  e.preventDefault()
                  setSupportOpen(true)
                }}>
                {msgs.supportLink}
              </S.Link>
            </li>
            <li id={msgs.privacyPolicyLink}>
              <S.Link
                href={interpolateUrl(urls.privacyPolicy)}
                target="_blank"
                rel="noopener noreferrer"
                className="list_link">
                {msgs.privacyPolicyLink}
              </S.Link>
            </li>
            <li id={msgs.faqsLink}>
              <S.Link
                href={interpolateUrl(urls.faqs)}
                rel="noopener noreferrer"
                target="_blank"
                className="list_link">
                {msgs.faqsLink}
              </S.Link>
            </li>

            <li id={msgs.disclaimerLink}>
              <S.Link
                href={interpolateUrl(urls.disclaimer)}
                target="_blank"
                rel="noopener noreferrer"
                className="list_link">
                {msgs.disclaimerLink}
              </S.Link>
            </li>
            <li id={msgs.termsLink}>
              <S.Link
                href={interpolateUrl(urls.terms)}
                target="_blank"
                rel="noopener noreferrer"
                className="list_link">
                {msgs.termsLink}
              </S.Link>
            </li>
          </S.List>
        </div>
        <div>
          <S.SubTitle>{msgs.appDownloads}</S.SubTitle>
          <S.CenterContent>
            <S.ImageLink
              href={urls.iosAppDownload}
              target="_blank"
              rel="noopener noreferrer">
              <Icon type="appStore" />
            </S.ImageLink>
            <S.ImageLink
              href={urls.androidAppDownload}
              target="_blank"
              rel="noopener noreferrer">
              <Icon type="googlePlay" />
            </S.ImageLink>
          </S.CenterContent>
        </div>
        <S.SocialContent>
          <S.Link href={urls.twitter} target="_blank" rel="noopener noreferrer">
            <i>
              <Icon type="twitter" />
            </i>
          </S.Link>
          <S.Link
            href={urls.facebook}
            target="_blank"
            rel="noopener noreferrer">
            <i>
              <Icon type="facebook" />
            </i>
          </S.Link>
          <S.Link
            href={urls.instagram}
            target="_blank"
            rel="noopener noreferrer">
            <Icon type="instagram" />
          </S.Link>
        </S.SocialContent>
      </S.Content>
    </S.Foot>
  )
}

const ThemedFoot = withTheme(Foot)

ThemedFoot.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string.isRequired.tag({
      name: 'ID',
      description: 'ID único del componente (Ej. footer_[nombre])',
    }),
  }),
}

export default ThemedFoot
