import React from 'react'

import SectionColumn from './SectionColumn'
import SocialColumnSection from './SocialColumn'

const classes = {
  footer: 'footer-secction flex-row mb-25',
}
const arcSiteDepor = 'depor'
const DeporFooter = ({
  sections = [],
  socialNetworks,
  arcSite,
  isBook,
  bookUrl,
  bookLogo,
  isAdmin,
}) => (
  <div className={classes.footer}>
    {sections.map((section, i) => {
      const keyString = `id${i}`
      const sectionProps = {
        section,
        keyString,
        isBook,
        bookUrl,
        bookLogo,
        isAdmin,
        isLastElement: i === sections.length - 1,
        isTrome: arcSite !== arcSiteDepor,
      }
      return <SectionColumn {...sectionProps} />
    })}

    {arcSite === arcSiteDepor && (
      <SocialColumnSection
        key={0}
        socialNetworks={socialNetworks}
        isBook={isBook}
        bookUrl={bookUrl}
        bookLogo={bookLogo}
        isAdmin={isAdmin}
      />
    )}
  </div>
)

export default React.memo(DeporFooter)
