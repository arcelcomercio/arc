import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'

const classes = {
  story: 'sht ',
  description: 'sht__summary',
  listClasses: 'sht__list',
  title: 'sht__title',
  premiumWrapper: `premium__wrapper bg-primary flex justify-center items-center mb-10 ml-20`,
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
}

const StoryTitleLite = () => {
  const { contextPath, globalContent: data, arcSite } = useFusionContext()

  const {
    title,
    subTitle,
    isPremium,
    primarySectionLink,
    contentElementsListOne: { items = [], type = '' } = {},
  } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      <div
        className={`${classes.story} ${primarySectionLink.replace(/\//g, '')}`}>
        <h1 className={classes.title}> {title}</h1>
        {items && type === 'list' ? (
          <ul className={classes.listClasses}>
            {items.map(({ content }) => {
              return (
                <>
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                </>
              )
            })}
          </ul>
        ) : (
          <>
            <h2 className={classes.description}>{subTitle}</h2>
            {isPremium && SITE_ELCOMERCIO === arcSite && (
              <div className={classes.premiumWrapper}>
                <p className={classes.premiumText}>Suscriptor Digital</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

StoryTitleLite.label = 'Artículo - Título'
StoryTitleLite.static = true

export default StoryTitleLite
