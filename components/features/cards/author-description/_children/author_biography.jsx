import React from 'react'

const classes = {
  title: 'custom-title text-left uppercase medium w-full mt-20',
  box: 'inline-block ml-10',
  subtitle: 'custom-title role',
  image: 'author-description__image',
  social: 'author-description__social custom-title twitter icon-twitter',
  content: 'line-h-sm',
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
  return (
    <>
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
          <h4 className={classes.social}> {twitterData[0]}</h4>
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
            {email}
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
    </>
  )
}

export default AuthorBiography
