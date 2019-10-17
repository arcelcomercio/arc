import React from 'react'

import SocialColumnSection from './SocialColumn'
import SectionColumn from './SectionColumn'

const classes = {
  footer: 'footer-secction flex flex-row bg-white',
}
const DeporFooter = ({sections=[]}) => {
  
  return (
    <footer className={classes.footer}>
      {
        sections.map((section)=>{
          const sectionProps ={section}
          return <SectionColumn {...sectionProps} />
        })
      }

      <SocialColumnSection />
    </footer>
  )
}

export default DeporFooter
