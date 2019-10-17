import React from 'react'

import SocialColumnSection from './SocialColumn'
import SectionColumn from './SectionColumn'

const classes = {
  footer: 'footer-secction flex flex-row bg-white',
}
const DeporFooter = () => {
  return (
    <footer className={classes.footer}>
      <SectionColumn />
      <SectionColumn />
      <SectionColumn />
      <SectionColumn />
      <SectionColumn />
      <SocialColumnSection />
    </footer>
  )
}

export default DeporFooter
