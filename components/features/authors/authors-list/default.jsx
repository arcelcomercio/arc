import React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import Pagination from '../../../global-components/pagination'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'p-25 w-full',
  list: 'pb-25',
  author: 'authors-list__author block pt-15 pb-15 pr-25 pl-25 mb-25 rounded-sm',
  authorLink: 'authors-list__link flex justify-between items-center',
  authorName: 'title-xs',
  authorDesc: 'pt-10 secondary-font text-md text-gray-200',
}

const AuthorsList = props => {
  const {
    customFields: { size: customSize },
  } = props

  const { requestUri } = useAppContext()
  const uri = requestUri.split('?')[0]
  const uriMatch = uri.match(/\/(?!0)(\d+)\/$/)
  const page = uriMatch ? parseInt(uriMatch[1], 10) : 1
  const offset = page * customSize

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
      <ul className={classes.list}>
        {authors &&
          authors.map(author => (
            <li className={classes.author} key={author._id}>
              <a href={author.bio_page || '#'} className={classes.authorLink}>
                <div>
                  <h2 className={classes.authorName}>{`${author.firstName ||
                    ''} ${author.lastName || ''}`}</h2>
                  {author.role && (
                    <p className={classes.authorDesc}>
                      <strong>{author.role}</strong>
                    </p>
                  )}
                  {author.email && (
                    <p className={classes.authorDesc}>{author.email}</p>
                  )}
                </div>
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
  )
}

AuthorsList.propTypes = {
  customFields,
}

AuthorsList.label = 'Lista de Autores'
AuthorsList.static = true

export default AuthorsList
