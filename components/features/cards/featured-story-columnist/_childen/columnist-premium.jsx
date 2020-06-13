import React from 'react'

const classes = {
  columnistPremium:
    'columnist-premium flex flex-col items-center justify-center row-1 bg-base-200 pt-30 pb-30 pl-30 pr-30 md:pt-10 md:pb-10',
  profile: 'columnist-premium__profile rounded',
  name: 'columnist-premium__name text-center mt-10 title-sm font-bold',
  section:
    'columnist-premium__section mt-10 position-relative uppercase text-md',
  description:
    'columnist-premium__description text-center mt-20 line-h-sm text-md overflow-hidden',
  logo: 'columnist-premium__logo mt-20',
  link: 'underline ml-5',
}

const ColumnistPremium = ({
  lazyImage,
  authorImage,
  author,
  authorLink,
  primarySection,
  primarySectionLink,
  subTitle,
  isPremium,
  websiteLink,
  isAdmin,
  logo,
}) => {
  return (
    <article className={classes.columnistPremium}>
      <a itemProp="url" href={authorLink}>
        <img
          alt={`Foto de perfil de ${author}`}
          className={`${isAdmin ? '' : 'lazy'} ${classes.profile}`}
          src={isAdmin ? authorImage : lazyImage}
          data-src={authorImage}
        />
      </a>

      <h4 itemProp="name" className={classes.name}>
        <a itemProp="url" href={authorLink}>
          {author}
        </a>
      </h4>
      <a itemProp="url" href={primarySectionLink} className={classes.section}>
        {primarySection}
      </a>
      <p itemProp="description" className={classes.description}>
        {subTitle}

        <a itemProp="url" className={classes.link} href={websiteLink}>
          Leer
        </a>
      </p>

      {isPremium && <img alt="" className={classes.logo} src={logo} />}
    </article>
  )
}

export default ColumnistPremium
