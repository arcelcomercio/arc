import React from 'react'
import SeparatorItem from './separadorItem'

const classes = {
  separator: 'separator margin-top',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle text-uppercase',
  oneline: 'separator__oneline',
  twoline: 'separator__twoline',
  threeline: 'separator__threeline',
  body: 'separator__body',
}

const createMarkup = html => {
  return { __html: html }
}

export default ({
  data: {
    titleSeparator = '',
    numLineTitle,
    titleLink = '/',
    htmlCode = '',
    items,
  } = {},
}) => {
  let numLine = ''
  switch (numLineTitle) {
    case 2:
      numLine = classes.twoline
      break
    case 3:
      numLine = classes.threeline
      break
    default:
      numLine = classes.oneline
      break
  }
  return (
    <div className={classes.separator}>
      {titleSeparator ? (
        <h1 className={`${classes.title} ${numLine}`}>
          <a href={titleLink}>{titleSeparator}</a>
        </h1>
      ) : (
        <div
          className={classes.title}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
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
                />
              )
            }
          )}
      </div>
    </div>
  )
}

/* Separador.propTypes = {
  customFields: customFieldsImport,
} */
