import React from 'react'

import SocialColumnSection from './SocialColumn'
import SectionColumn from './SectionColumn'

const classes = {
  footer: 'footer-secction flex flex-row bg-white',
}
const DeporFooter = ({ sections = [], socialNetworks }) => {
  return (
    <div className={classes.footer}>
      {sections.map((section, i) => {
        const keyString = `id${i}`
        const sectionProps = { section }
        return <SectionColumn key={keyString} {...sectionProps} />
      })}

      <SocialColumnSection key={0} socialNetworks={socialNetworks} />
    </div>
  )
}

export default DeporFooter
