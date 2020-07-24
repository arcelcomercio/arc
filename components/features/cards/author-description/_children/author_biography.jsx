import React from 'react'

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
      { role && <h2>{role}</h2> }
      { twitter && <h3>{twitter}</h3>}
      { bio && <p>{bio}</p> }
      { ( location || languages ) && ( 
      <p>
        { location && <><strong>Escribe desde </strong>{location}</> } 
        { (location && languages) && ' | ' }
        { languages && <><strong>Habla </strong>{languages}</> }
      </p>
      )}
      { email && (
      <p>
        <strong>Contacto: </strong>
        {email}
      </p>
      )}
      { expertise && (
      <p>
        <strong>Especialidad y competencias demográficas: </strong>
        {expertise}
      </p>
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
