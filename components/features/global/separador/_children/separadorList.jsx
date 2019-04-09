import React from 'react'
import SeparatorItem from './separadorItem'

const classes = {
  separator: 'separator margin-top',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle text-uppercase',
  body: 'separator__body',
}

const createMarkup = html => {
  return { __html: html }
}

export default ({
  data: {
    titleSeparator = '',
    titleLink = '/',
    htmlCode = '',
    items = [],
  } = {},
}) => {
  return (
    <div className={classes.separator}>
      {titleSeparator ? (
        <h1 className={classes.title}>
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
        {items.map(
          ({
            promo_items: promoItems = {},
            website_url: websiteUrl = '/',
            headlines = {},
          }) => {
            return (
              <SeparatorItem
                key={websiteUrl}
                headlines={headlines.basic || ''}
                promoItems={promoItems||{}}
                website_url={websiteUrl}
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
