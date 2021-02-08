import * as React from 'react'

import Image from '../../../../global-components/image'


const SeparatorFeaturedStory = ({
  title,
  websiteLink,
  primarySection,
  primarySectionLink,
  multimediaCaption,
  imageUrl,
  sectionField,
  isLazyLoadActivate,
  index
}) => {
  return (
    <div className="featured-separator__story flex flex-1 border-l-1 border-dashed pl-10 pr-10 justify-between">
      <div className="featured-separator__story-content pr-5">
        <h3
          itemProp="name"
          className="featured-separator__story-section font-bold text-lg mb-5 line-h-xs tertiary-font overflow-hidden">
          <a
            itemProp="url"
            className="featured-separator__section-link"
            href={primarySectionLink}>
            {sectionField || primarySection}
          </a>
        </h3>
        <h2
          itemProp="name"
          className="featured-separator__story-title text-md line-h-xs tertiary-font overflow-hidden">
          <a
            itemProp="url"
            className="featured-separator__story-link"
            href={websiteLink}>
            {title}
          </a>
        </h2>
      </div>
      <a
        itemProp="url"
        className="featured-separator__img-link block"
        href={websiteLink}>
        <Image 
          src={imageUrl}
          width={161}
          height={220}
          alt={multimediaCaption || title}
          className="featured-separator__img w-full object-cover"
          loading={!isLazyLoadActivate && index === 0 ? "auto" : "lazy"}
          />
      </a>
    </div>
  )
}

export default React.memo(SeparatorFeaturedStory)