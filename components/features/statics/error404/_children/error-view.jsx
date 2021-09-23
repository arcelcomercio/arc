import { useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import React from 'react'

import SearchInput from '../../../../global-components/search-input'

const classes = {
  container:
    'error bg-gray-100 text-center w-full position-relative secondary-font pt-40 pb-40 pr-20 pl-40',
  title:
    'error__title text-xl mb-10 primary-font font-bold line-h-md lg:p-0 lg:pl-20 lg:pr-20',
  content: 'error__content text-sm pt-15 pb-15 inline-block line-h-md',
  link:
    'error__link inline-block text-sm pt-15 pb-15 font-bold text-gray-300 line-h-md',
  searchBox: 'pt-10 pb-20 m-0 mx-auto',
}

const ErrorView = ({ customFields }) => {
  const { arcSite } = useFusionContext()
  const { messages: { errorTitle, errorDescription } = {} } = getProperties(
    arcSite
  )
  const { title, description } = customFields
  const { editableField } = useEditableContent()

  return (
    <div role="group" className={classes.container}>
      <h3
        itemProp="name"
        className={classes.title}
        {...editableField('title')}
        suppressContentEditableWarning>
        {title || errorTitle}
      </h3>
      <p
        itemProp="description"
        className={classes.content}
        {...editableField('description')}
        suppressContentEditableWarning>
        {description || errorDescription}
      </p>
      <div role="search" className={classes.searchBox}>
        <SearchInput />
      </div>
      <a itemProp="url" href="/" className={classes.link}>
        Volver a la página principal
      </a>
    </div>
  )
}

export default ErrorView
