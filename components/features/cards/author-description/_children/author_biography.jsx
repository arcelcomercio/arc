import React from 'react'

const classes = {
  subtitle: 'custom-title role',
  social: 'custom-title twitter',
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
  return (
    <>
      { role && <h3 className={classes.subtitle}>{role}</h3> }
      { twitter && <h4 className={classes.social}><strong>{twitter}</strong></h4>}
      { bio && <><br /><p>{bio}</p></> }
      { ( location || languages ) && ( 
      <>
      <br /><br />
      <p>
        { location && <><strong>Escribe desde </strong>{location}</> } 
        { (location && languages) && ' | ' }
        { languages && <><strong>Habla </strong>{languages}</> }
      </p>
      </>
      )}
      { email && (
      <>
      <br /><br />
      <p>
        <strong>Contacto: </strong>
        {email}
      </p>
      </>
      )}
      { expertise && (
      <>
      <br /><br />
      <p>
        <strong>Especialidad y competencias demográficas: </strong>
        {expertise}
      </p>
      </>
      )}
      { (awards && awards.length) && (
        <p>
          <strong>Premios: </strong>
          <ul>
            {awards.map(award => (
              <li>{award.name}</li>
            ))}
          </ul>
        </p>
      )}
    </>
  )
}

export default AuthorBiography
