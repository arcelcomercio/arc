import React from 'react'
import SeparatorItem from './item'

const classes = {
  separator: 'separator margin-top',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle text-uppercase',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body',
}

const SeparatorsBasicChildSeparator = props => {
  const {
    data: {
      titleSeparator = '',
      arcSite,
      titleLink = '/',
      htmlCode = '',
      items,
    } = {},
  } = props
  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.twoline
      break
  }
  return (
    <div className={classes.separator}>
      {titleSeparator ? (
        <h1 className={`${classes.title}`}>
          <a href={titleLink}>{titleSeparator}</a>
        </h1>
      ) : (
        <div
          className={classes.title}
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />
      )}
      <div className={classes.body}>
        {items &&
          items.map(
            ({
              promo_items: promoItems,
              website_url: websiteUrl,
              headlines,
            }) => {
              const { basic: headlinesBasic } = headlines || {}
              return (
                <SeparatorItem
                  key={websiteUrl || '/'}
                  headlines={headlinesBasic || ''}
                  promoItems={promoItems || {}}
                  website_url={websiteUrl || '/'}
                  numLine={numline}
                />
              )
            }
          )}
      </div>
    </div>
  )
}

export default SeparatorsBasicChildSeparator
