import React from 'react'

const classes = {
  container: 'author-description__container pr-20 pl-20 mt-20',
  title:
    'author-description__title custom-title text-left uppercase medium w-full',
  box: 'author-description__box inline-block ml-10',
  boxImg: 'author-description__content-img mt-20',
  subtitle: 'author-description__subtitle custom-title role',
  image: 'author-description__image',
  social: 'author-description__social custom-title twitter icon-twitter',
  link: 'author-description__link',
  content: 'author-description__content line-h-sm',
}

const AuthorBiography = ({
  byline,
  role,
  twitter,
  bio,
  location,
  languages,
  email,
  expertise,
  awards,
  resized_urls: { image_xs: imageXS = '' } = {},
}) => {
  const twitterData = twitter && twitter.split(',')
  const expertiseData = expertise && expertise.replace(/{[^}]+}/g, '')
  const urlTwitter = account => {
    const user = account.replace(/@/, '')
    return `https://twitter.com/${user}`
  }
  return (
    <div className={classes.container}>
      <img className={classes.image} src={imageXS} alt={byline} />
      <div className={classes.box}>
        <h1
          itemProp="name"
          suppressContentEditableWarning
          className={classes.title}>
          {byline}
        </h1>
        {role && <h3 className={classes.subtitle}>{role}</h3>}
        {twitterData && twitterData[0] && (
          <a className={classes.link} href={urlTwitter(twitterData[0])}>
            <h4 className={classes.social}> {twitterData[0]}</h4>
          </a>
        )}
      </div>
      {bio && (
        <>
          <br />
          <p className={classes.content}>{bio}</p>
        </>
      )}
      {(location || languages) && (
        <>
          <br />
          <br />
          <p className={classes.content}>
            {location && (
              <>
                <strong>Escribe desde </strong>
                {location}
              </>
            )}
            {location && languages && ' | '}
            {languages && (
              <>
                <strong>Habla </strong>
                {languages}
              </>
            )}
          </p>
        </>
      )}
      {email && (
        <>
          <br />
          <br />
          <p className={classes.content}>
            <strong>Contacto: </strong>
            <a className={classes.link} href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </>
      )}
      {expertise && (
        <>
          <br />
          <br />
          <p className={classes.content}>
            <strong>Especialidad y competencias demográficas: </strong>
            {expertiseData}
          </p>
        </>
      )}
      {awards && awards.length > 0 && (
        <p className={classes.content}>
          <strong>Premios: </strong>
          <ul>
            {awards.map(award => (
              <li className={classes.content}>{award.name}</li>
            ))}
          </ul>
        </p>
      )}
    </div>
  )
}

export default AuthorBiography
