import * as React from 'react'

import customFields from './_dependencies/custom-fields'

const classes = {
  header: 'amp-header-provecho',
  wrap: 'amp-header-provecho__wrap',
  logo: 'amp-header-provecho__logo',
  linkContainer: 'amp-header-provecho__link-container',
  link: 'amp-header-provecho__link',
  ampImg: 'amp-header-provecho__amp-img',
  img:
    'i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
}

const ProvechoAmpHeader: React.FC = (props) => {
  const {
    customFields: { customLogoLink, customLogo },
  } = props
  return (
    <>
      <header className={classes.header}>
        <section className={classes.wrap}>
          <div className={classes.logo}>
            <a href={customLogoLink}>
              <amp-img
                src={customLogo}
                alt="Provecho"
                width="106"
                height="58"
                tabIndex="0"
              />
            </a>
          </div>
        </section>
      </header>
    </>
  )
}

ProvechoAmpHeader.label = 'Header - Provecho'
ProvechoAmpHeader.propTypes = {
  customFields,
}

export default ProvechoAmpHeader
