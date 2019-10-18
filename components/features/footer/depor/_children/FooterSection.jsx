import React from 'react'

import SocialColumnSection from './SocialColumn'
import SectionColumn from './SectionColumn'

const classes = {
  footer: 'footer-secction flex flex-row bg-white',
}
const DeporFooter = ({ sections = [], socialNetworks }) => {
  
  return (
    <div className={classes.footer}>
      {sections.map((section,i) => {
        const sectionProps = { section }
        return <SectionColumn key={`id${i}`} {...sectionProps} />
      })}

      <SocialColumnSection socialNetworks={socialNetworks} />
    </div>
  )
}

export default DeporFooter
