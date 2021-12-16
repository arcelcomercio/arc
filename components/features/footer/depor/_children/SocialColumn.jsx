import React from 'react'

import ItemTop from './ComponentStyles'

const classes = {
  socialColumn: 'footer-secction__content-column  flex flex-col',
  item: 'footer-secction__item',
}

const ItemLink = ({ url, name }) => (
  <li>
    <a itemProp="url" href={url} rel="noopener noreferrer" target="_blank">
      {name}
    </a>
  </li>
)

const SocialColumnSection = ({
  socialNetworks,
  isBook,
  bookUrl,
  bookLogo,
  isAdmin,
}) => (
  <>
    <ul className={classes.socialColumn}>
      <li className={classes.item} style={ItemTop}>
        Síguenos
      </li>
      {socialNetworks &&
        socialNetworks.map(({ name, url }, index) => {
          const keyString = `id${index}`
          return <ItemLink key={keyString} name={name} url={url} />
        })}
      {isBook && (
        <div className="foot-book__column">
          <a className={classes.book} href={bookUrl}>
            <img
              className={`${isAdmin ? '' : 'lazy'} `}
              src={isAdmin ? bookLogo : ''}
              data-src={bookLogo}
              alt="Libro de reclamaciones"
              style={{ width: 145 }}
            />
          </a>
        </div>
      )}
    </ul>
  </>
)

export default React.memo(SocialColumnSection)
