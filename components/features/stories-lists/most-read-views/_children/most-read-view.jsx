import React from 'react'

const classes = {
  mrFree: 'mr-free',
  mrWrapper: 'mr-free__wrapper',
  mrHeader: 'mr-free__header',
  mrTitle: 'mr-free__title block font-bold',
  mrBody: 'mr-free__body',
  mrItem: 'mr-free__item flex',
  mrItemLeft: 'mr-free__left flex flex-col justify-center items-center',
  mrItemRight: 'mr-free__right',
  mrLink: 'mr-free__link text-sm',
  mrHTML: 'mr-free__html',
}

export default ({ title, urlTitle, showMore, urlShowMore }) => {
  return (
    <div className={classes.mrFree}>
      <div className={classes.mrWrapper}>
        <div className={classes.mrHeader}>
          {urlTitle ? (
            <a className={classes.mrTitle} href={urlTitle}>
              {title}
            </a>
          ) : (
            <p className={classes.mrTitle}>{title}</p>
          )}
        </div>
        <div className={classes.mrBody}>
          <div className={classes.mrItem}>
            <div className={classes.mrItemLeft}>
              <p>64k</p>
              <p>Vistas</p>
            </div>
            <div className={classes.mrItemRight}>
              <a href="/" classNam={classes.mrLink}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                reprehenderit voluptate incidunt repellendus ipsum vel ut
                ratione voluptates, voluptatum totam.
              </a>
            </div>
          </div>
        </div>
        {showMore && (
          <div className={classes.footer}>
            <a href={urlShowMore} className={classes.btn}>
              Ver Mas
            </a>
          </div>
        )}
      </div>
      <div className={classes.mrHTML} />
    </div>
  )
}
