import React from 'react'

interface FeatureProps {
  url?: string
  content?: string
  isAmp?: boolean
}

const interstitialLink: React.FC<FeatureProps> = ({ url, content, isAmp }) => {
  const classes = {
    link: `${
      isAmp
        ? 'amp-story-content__interstitial-link'
        : 'story-content__interstitial-link'
    } block font-bold underline line-h-md secondary-font mb-10 mt-20 pr-20`,
  }

  return (
    <a itemProp="url" className={classes.link} href={url}>
      {content}
    </a>
  )
}

export default interstitialLink
