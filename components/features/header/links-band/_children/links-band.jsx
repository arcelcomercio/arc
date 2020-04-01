import React from 'react'

const classes = {
  band: 'links-band w-full',
  text: 'links-band__txt',
  link: 'links-band__link',
}

const HeaderLinksBandChild = ({ links = [], tags = 'Hoy interesa:' }) => {
  return (
    links &&
    links.length > 0 && (
      <>
        <nav className={classes.band}>
          {tags && <h4 className={classes.text}>{tags}</h4>}
          {links.map(({ url, name }) => (
            <a className={classes.link} href={url} key={`band-${url}`}>
              {name}
            </a>
          ))}
        </nav>
      </>
    )
  )
}

/* 
  EN CASO DE QUE SE PUEDA USAR React.memo LUEGO

  const compare = (prevProps, nextProps) => {
  const { links = [], tags = '' } = prevProps
  const { links: nextLinks = [], tags: nextTags = '' } = nextProps
  let memo = true

  if (tags !== nextTags) return false
  links.forEach((link, i) => {
    const { _id: id, url } = link
    const { _id: nextId, url: nextUrl} = nextLinks[i]
    if(id !== nextId || url !== nextUrl) memo = false
  })
  return memo
}
 */

export default HeaderLinksBandChild
