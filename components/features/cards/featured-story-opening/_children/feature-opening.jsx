import React from 'react'

const classes = {
  opening: 'featured-opening col-2 row-1 flex justify-between',
  body: 'featured-opening__body p-20',
  sectionEdit: 'featured-opening__section-edit mb-5 title-sm md:title-md',
  title: 'featured-opening__title title-md block',
  subtitle: 'featured-opening__subtitle mt-10',
  more: 'featured-opening__more',
  author: 'featured-opening__author block',
  list: 'featured-opening__list mt-10',
  item: 'featured-opening__item pl-10 mb-5 position-relative',
  link: 'featured-opening__link font-bold',
  footer: 'featured-opening__footer flex justify-between items-center',
  section: 'featured-opening__section uppercase text-md',
  image: 'featured-opening__image',
}

export default ({
  isPremium,
  websiteLink,
  title,
  subTitle,
  author,
  authorLink,
  primarySectionLink,
  primarySection,
  customTitle,
  note1Title,
  note1Link,
  note2Title,
  note2Link,
  logo,
}) => {
  return (
    <div className={classes.opening}>
      <div className={classes.body}>
        <h2 className={classes.sectionEdit}>{customTitle || primarySection}</h2>
        <h1>
          <a className={classes.title} href={websiteLink}>
            {title}
          </a>
        </h1>
        <p className={classes.subtitle}>
          {subTitle}{' '}
          <a className={classes.more} href={websiteLink}>
            Leer
          </a>
        </p>
        <a href={authorLink} className={classes.author}>
          {author}
        </a>
        <ul className={classes.list}>
          {note1Title && (
            <li className={classes.item}>
              <a href={note1Link} className={classes.link}>
                {note1Title}
              </a>
            </li>
          )}
          {note2Title && (
            <li className={classes.item}>
              <a href={note2Link} className={classes.link}>
                {note2Title}
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className={classes.footer}>
        <a href={primarySectionLink} className={classes.section}>
          {primarySection}
        </a>
        {isPremium && (
          <img
            src={logo}
            alt="premium"            
            className={classes.image}
          />
        )}
      </div>
    </div>
  )
}
