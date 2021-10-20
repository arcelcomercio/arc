import React from 'react'

const classes = {
  container: 'author-description__container pr-20 pl-20 mt-20',
  textBox: 'author-description__text-box',
  title:
    'author-description__title custom-title text-left uppercase medium w-full',
  box: 'author-description__box inline-block ml-10',
  boxImg: 'author-description__content-img mt-20',
  subtitle: 'author-description__subtitle custom-title role',
  image: 'author-description__image',
  social: 'author-description__social custom-title twitter icon-twitter',
  link: 'author-description__link',
  content: 'author-description__content line-h-sm',
  svgContainer: 'author-description__svg-container',
  bio: 'author-description__bio',
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
  arcSite,
  // resized_urls: { image_xs: imageXS = '' } = {},
  resized_urls: { image_lg: imageLG = '', image_xs: imageXS = '' } = {},
}) => {
  const twitterData = twitter && twitter.split(',')
  const expertiseData = expertise && expertise.replace(/{[^}]+}/g, '')
  const urlTwitter = (account) => {
    const user = account.replace(/@/, '')
    return `https://twitter.com/${user}`
  }
  return (
    <>
      {arcSite === 'trome' ? (
        <div className={classes.container}>
          {/* <div className={classes.svgContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 171 192">
              {' '}
              <defs />{' '}
              <g fill="#F15A22" clipPath="url(#clip0)">
                {' '}
                <path d="M163.296 192c2.584 0 5.152-.081 7.704-.194v-34.598c-2.503.146-5.038.243-7.574.243-71.4 0-129.278-57.57-129.278-128.593 0-9.926 1.17-19.578 3.316-28.858H2.747C.975 9.587 0 19.465 0 29.57 0 119.28 73.107 192 163.296 192z" />{' '}
                <path d="M170.301 97.73c-40.259 0-72.896-32.464-72.896-72.51 0-8.875 1.69-17.363 4.633-25.22h-33.92c-1.626 7.291-2.553 14.825-2.553 22.602 0 57.538 46.891 104.18 104.736 104.18.228 0 .471-.032.699-.032V97.698c-.228 0-.455.032-.699.032z" />{' '}
                <path d="M138.445 0c-4.844 6.58-7.737 14.68-7.737 23.458 0 22.004 17.928 39.836 40.048 39.836.081 0 .163-.016.244-.016V0h-32.555z" />{' '}
              </g>{' '}
              <defs>
                {' '}
                <clipPath id="clip0">
                  {' '}
                  <path fill="#fff" d="M0 0h171v192H0z" />{' '}
                </clipPath>{' '}
              </defs>{' '}
            </svg>
          </div> */}
          <img className={classes.image} src={imageLG} alt={byline} />

          <div className={classes.textBox}>
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
              <p className={`${classes.content} ${classes.bio}`}>{bio}</p>
            )}
            {(location || languages) && (
              <p className={`${classes.content} mb-0`}>
                {location && (
                  <>
                    Escribe desde: &nbsp;
                    <strong>{location}</strong>
                  </>
                )}
                {location && languages && ' | '}
                {languages && (
                  <>
                    Habla&nbsp;
                    <strong>{languages}</strong>
                  </>
                )}
              </p>
            )}
            {email && (
              <p className={`${classes.content}`}>
                Contacto:&nbsp;
                <strong>
                  <a className={classes.link} href={`mailto:${email}`}>
                    {email}
                  </a>
                </strong>
              </p>
            )}
            {expertise && (
              <p className={`${classes.content}`}>
                Especialidad y competencias demográficas:&nbsp;
                <strong>{expertiseData}</strong>
              </p>
            )}
            {awards && awards.length > 0 && (
              <p className={classes.content}>
                Premios:
                <ul>
                  {awards.map((award) => (
                    <li className={classes.content} key={award.name}>
                      <strong>{award.name}</strong>
                    </li>
                  ))}
                </ul>
              </p>
            )}
          </div>
        </div>
      ) : (
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
                {awards.map((award) => (
                  <li className={classes.content}>{award.name}</li>
                ))}
              </ul>
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default AuthorBiography
