import React from 'react'
import { useFusionContext } from 'fusion:context'
import AuthorBiography from './_children/author_biography'

const classes = {
  title: 'w-full mt-20 custom-title',
  button:
    'custom-title__button position-absolute right-0 text-sm font-normal border-1 border-gray border-solid p-10 text-gray-200',
  darkButton:
    'custom-title__button position-absolute right-0 text-sm font-normal border-1 border-white border-solid p-10 text-white',
}

const AuthorDescription = () => {
  const { globalContent } = useFusionContext()

  const { author } = globalContent || {}

  return (
    <>
      <h1
        itemProp="name"
        suppressContentEditableWarning
        className={`${classes.title} text-left uppercase medium`}>
        {author.byline}
      </h1>
      <AuthorBiography {...author} />
    </>
  )
}

AuthorDescription.label = 'Autor - Descripción'
AuthorDescription.static = true

export default AuthorDescription
