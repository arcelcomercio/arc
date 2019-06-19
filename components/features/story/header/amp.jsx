import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import { formatDayMonthYear } from '../../../utilities/helpers'
import StoryHeaderChildAmpSocial from './_children/amp-social'

const classes = {
  stories: 'amp-story-header bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-story-header__title font-bold primary-font title-md text-gray-300 line-h-xs',
  datetime:
    'amp-story-header__datetime mt-15 mb-15 block secondary-font text-lg',
  description: 'amp-story-header__description mt-0 text-md text-gray-300',
  gallery: 'amp-story-header bg-white w-full',
}
@Consumer
class StoryHeaderAmp extends PureComponent {
  render() {
    const {
      globalContent: {
        subheadlines: { basic: subtitle = '' } = {},
        headlines: { basic: titleElements = '' } = {},
        publish_date: date,
        promo_items: {
          basic_gallery: { content_elements: galleryItems } = {},
        } = {},
      } = {},
    } = this.props

    return (
      <>
        <div className={galleryItems ? classes.gallery : classes.stories}>
          <header>
            {titleElements && (
              <h1 className={classes.titleAmp}> {titleElements}</h1>
            )}
            <time dateTime={date} className={classes.datetime}>
              {formatDayMonthYear(date)}
            </time>
          </header>

          {subtitle && <div className={classes.description}> {subtitle}</div>}
          <StoryHeaderChildAmpSocial />
          {galleryItems && (
            <AMPCarousel data={galleryItems} width="500" height="300" />
          )}
        </div>
      </>
    )
  }
}

export default StoryHeaderAmp
