import { useContent } from 'fusion:content'
import { useAppContext, useFusionContext } from 'fusion:context'
import React from 'react'

import Pagination from '../../../global-components/pagination'
import { SITE_TROME } from '../../../utilities/constants/sitenames'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'authors-list p-25 w-full',
  body: 'authors-list__body',
  list: 'pb-25',
  title: 'authors-list__title',
  author: 'authors-list__author block pt-15 pb-15 pr-25 pl-25 mb-25 rounded-sm',
  authorLink: 'authors-list__link flex justify-between items-center',
  authorName: 'title-xs',
  authorDesc: 'pt-10 secondary-font text-md text-gray-200',
}

const AuthorsList = (props) => {
  const { arcSite } = useFusionContext()
  const {
    customFields: { size: customSize, title },
  } = props

  const { requestUri } = useAppContext()
  const uri = requestUri.split('?')[0]
  const uriMatch = uri.match(/\/(?!0)(\d+)\/$/)
  const page = uriMatch ? parseInt(uriMatch[1], 10) : 1
  const offset = (page - 1) * customSize

  const response =
    useContent({
      source: 'authors-by-website-v1',
      query: {
        size: customSize || 25,
        offset,
      },
    }) || {}

  const { authors, total_count: totalCount } = response

  return (
    <div className={classes.container}>
      <div className={classes.body}>
        {title && <h2 className={classes.title}>{title}</h2>}
        <ul className={classes.list}>
          {authors &&
            authors.map((author) => (
              <li className={classes.author} key={author._id}>
                <a href={author.bio_page || '#'} className={classes.authorLink}>
                  <div>
                    <h2 className={classes.authorName}>{`${
                      author.firstName || ''
                    } ${author.lastName || ''}`}</h2>
                    {author.role && (
                      <p className={classes.authorDesc}>
                        <strong>{author.role}</strong>
                      </p>
                    )}
                    {author.email && arcSite !== SITE_TROME && (
                      <p className={classes.authorDesc}>{author.email}</p>
                    )}
                  </div>
                  {arcSite !== SITE_TROME ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24">
                      <path
                        fill="#000"
                        d="M13.6 11.9 6.3 19.1 7.9 20.8l9.1-8.9L7.9 3 6.3 4.6Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="18"
                      viewBox="0 0 256 512">
                      <path
                        fill="#000"
                        d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                      />
                    </svg>
                  )}
                </a>
              </li>
            ))}
        </ul>
        <Pagination
          totalElements={totalCount}
          storiesQty={customSize}
          currentPage={page}
          requestUri={requestUri}
        />
      </div>
    </div>
  )
}

AuthorsList.propTypes = {
  customFields,
}

AuthorsList.label = 'Lista de Autores'
AuthorsList.static = true

export default AuthorsList
