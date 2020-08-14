import React from 'react'

const classes = {
  subtitle: 'custom-title role',
  social: 'custom-title twitter icon-twitter',
  content: 'line-h-sm',
}

const AuthorBiography = ({
  role,
  twitter,
  bio,
  location,
  languages,
  email,
  expertise,
  awards,
}) => {
  const twitterData = twitter.split(',')
  const expertiseData = expertise.replace(/{[^}]+}/g, '')
  return (
    <>
      {role && <h3 className={classes.subtitle}>{role}</h3>}
      {twitterData[0] && <h4 className={classes.social}>{twitterData[0]}</h4>}
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
      {awards && awards.length && (
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
