import React from 'react'

import SocialColumnSection from './SocialColumn'
import SectionColumn from './SectionColumn'

const classes = {
  footer: 'footer-secction flex-row mb-25',
}
const arcSiteDepor = 'depor'
const DeporFooter = ({ sections = [], socialNetworks, arcSite }) => {
  return (
    <div className={classes.footer}>
      {sections.map((section, i) => {
        const keyString = `id${i}`
        const sectionProps = { section, keyString }
        return <SectionColumn {...sectionProps} />
      })}
      {arcSite === arcSiteDepor && (
        <SocialColumnSection key={0} socialNetworks={socialNetworks} />
      )}
    </div>
  )
}

export default DeporFooter
