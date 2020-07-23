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
      <h2>{role}</h2>
      <h3>{twitter}</h3>
      <p>{bio}</p>
      <p>
        <strong>Escribe desde </strong>
        {location} |<strong>Habla </strong>
        {languages}
      </p>
      <p>
        <strong>Contacto: </strong>
        {email}
      </p>
      <p>
        <strong>Especialidad y competencias demográficas: </strong>
        {expertise}
      </p>
      {awards && (
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
