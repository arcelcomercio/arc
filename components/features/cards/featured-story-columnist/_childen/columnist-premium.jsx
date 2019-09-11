import React from 'react'

const classes = {
  columnistPremium:
    'columnist-premium flex flex-col items-center justify-center row-1 bg-base-200 pt-10 pb-10 pl-30 pr-30',
  profile: 'columnist-premium__profile rounded',
  name: 'columnist-premium__name text-center mt-15',
  section: 'columnist-premium__section mt-10 position-relative text-uppercase',
  description: 'columnist-premium__description text-center mt-20',
  logo: 'columnist-premium__logo mt-20',
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
    <div className={classes.columnistPremium}>
      <img
        alt={`Foto de perfil de ${author}`}
        className={`${isAdmin ? '' : 'lazy'} ${classes.profile}`}
        src={isAdmin ? authorImage : lazyImage}
        data-src={authorImage}
      />
      <h4 className={classes.name}>
        <a href={authorLink}>{author}</a>
      </h4>
      <a href={primarySectionLink} className={classes.section}>
        {primarySection}
      </a>
      <p className={classes.description}>
        {subTitle} <a href={websiteLink}>Leer Más.</a>
      </p>
      {isPremium && <img alt="" className={classes.logo} src={logo} />}
    </div>
  )
}

export default ColumnistPremium
