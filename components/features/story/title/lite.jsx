import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'

const classes = {
  story: 'sht ',
  description: 'sht__summary',
  listClasses: 'sht__list',
  title: 'sht__title',
  premiumWrapper: `premium__wrapper f`,
  premiumText: 'premium__text icon-padlock',
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
        <h1 itemProp="name" className={classes.title}> {title}</h1>
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
            <h2 itemProp="name" className={classes.description}>{subTitle}</h2>
            {isPremium && SITE_ELCOMERCIO === arcSite && (
              <div className={classes.premiumWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="10"
                  viewBox="0 0 120 160"
                  version="1">
                  <path d="M60 160L21 160C21 160 20 160 20 160 11 160 3 154 1 146L0 146C0 144 0 143 0 141 0 141 0 141 0 141L0 141C0 124 0 107 0 90 0 82 5 76 11 73L11 73C12 73 12 73 12 73 12 72 12 72 12 72L12 72C12 63 12 53 12 43 12 43 12 43 12 43 12 36 14 30 17 24L16 24C19 19 23 15 27 11L27 11C33 7 40 3 48 1L48 1C52 0 56 0 60 0 66 0 71 1 77 3L76 3C83 5 89 8 94 12L93 12C101 18 106 26 108 36L108 36C108 38 108 40 108 43 108 43 108 43 108 43L108 43C108 51 108 59 108 66 108 68 108 70 108 72 108 72 108 72 108 72 108 73 108 73 109 73L109 73C114 76 118 80 120 86L120 86C120 87 120 88 120 89 120 89 120 89 120 89L120 89C120 104 120 118 120 132 120 135 120 139 120 142 120 147 118 151 114 154L114 154C110 158 105 160 99 160 99 160 98 160 98 160L98 160C85 160 73 160 60 160ZM89 71L89 70C89 61 89 52 89 43 89 43 89 42 89 42 89 41 89 39 88 37L88 38C86 27 78 20 68 18L68 18C65 17 63 17 60 17 54 17 48 19 44 21L44 21C36 26 31 33 31 42L31 42C31 45 31 48 31 51 31 57 31 64 31 70 31 71 31 71 31 71ZM54 138L66 138 66 137C66 130 66 122 66 115 66 115 66 115 66 115 66 115 66 115 67 114L67 114C68 114 68 113 69 113L69 113C71 111 73 108 73 105 73 103 72 102 72 100L72 100C69 96 65 94 60 94 60 94 60 94 60 94L60 94C60 94 59 94 59 94 53 94 48 98 47 104L47 105C47 105 47 105 47 105 47 109 50 113 53 114L53 114C54 115 54 115 54 115L54 115C54 121 54 126 54 132 54 134 54 136 54 138ZM54 138"></path>
                </svg>
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
